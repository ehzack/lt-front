import { Redirect, Route, Switch } from "react-router-dom";
import React, { useEffect, useState, lazy, useCallback, useMemo } from "react";
import "./App.css";
import Layout from "./common/components/Layout";
import Dashboard from "./common/components/dashboard/ui/Dashboard";
import Eclairage from "./modules/eclairage/ui/Eclairage";
// import Balisage from './modules/balisage/ui/Balisage';
import Historique from "./modules/historique/ui/Historique";
import Regulateur from "./modules/regulateurs/ui/Regulateur";
import Alarme from "./modules/alarme/ui/Alarme";
import Macro from "./modules/macros/ui/Macro";
import EtatCommunication from "./modules/etatCommunication/ui/EtatCommunication";
import ProtectedRoute from "./routing/ProtectedRoute";
import _ from "lodash";
import NotFound from "./common/components/NotFound";
import Spinner from "./common/components/SpinnerCustomized";
import { useSelector, useDispatch } from "react-redux";
import * as roles from "./routing/roles";
import * as alarmeActions from "./modules/alarme/state/AlarmeActions";
import * as communicationActions from "./modules/etatCommunication/state/communicationActions";
import * as actionsZones from "./common/components/Telecommande/state/ZoneActions";
import * as electricityActions from "./modules/electricite/state/electricityActions";
import { socket } from "./common/utils/webSockets/websockets";
import { updateToken } from "./modules/balisage/state/authorizationActions";
import { Box, Snackbar, Alert } from "@mui/material";
import Forbidden from "./routing/Forbidden";
import Electricite from "./modules/electricite/ui/Electricite";
import axios from "axios";
import config from "./common/Config";
import ForbiddenComponent from "./routing/ForbiddenComponent";

const protectedRoutes = {
  EtatCommunication: {
    path: "/Etat-de-communication",
    requiredRoles: [roles.ROLE_MAINTENANCE, roles.ROLE_ADMIN],
    component: EtatCommunication,
  },
  Regulateur: {
    path: "/Régulateur",
    requiredRoles: [roles.ROLE_MAINTENANCE, roles.ROLE_ADMIN],
    component: Regulateur,
  },
  Historique: {
    path: "/Historique",
    requiredRoles: [roles.ROLE_MAINTENANCE, roles.ROLE_ADMIN],
    component: Historique,
  },
  Alarme: {
    path: "/Alarmes",
    requiredRoles: [roles.ROLE_MAINTENANCE, roles.ROLE_ADMIN],
    component: Alarme,
  },
  Electricite: {
    path: "/Electricite",
    requiredRoles: [roles.ROLE_MAINTENANCE, roles.ROLE_ADMIN],
    component: Electricite,
  },
  Macro: {
    path: "/Macros",
    requiredRoles: [roles.ROLE_ADMIN],
    component: Macro,
  },
};

let isAuthenticated = sessionStorage.getItem("token"); // state managed with authentication module

const Balisage = lazy(() => import("./modules/balisage/ui/Balisage"));

function App() {
  const state = useSelector((state) => state);

  const [stateSnackBar, setStateSnackBar] = useState({
    openSnackBar: false,
    vertical: "top",
    horizontal: "center",
    severity: "success",
    duration: 3000,
    message: "",
  });

  const { openSnackBar, vertical, horizontal, severity, duration, message } =
    stateSnackBar;

  const dispatch = useDispatch();
  const [isAllowed, setIsAllowed] = useState(null);

  const [errormessag, setErrormessag] = useState("");

  // Separate useEffect for initial data fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(config.url + "/tst/p");
        if (response.status === 200) {
          setIsAllowed(true);
        } else {
          setIsAllowed(false);
        }
      } catch (error) {
        if (error.response && error.response.status === 403) {
          setIsAllowed(false);
        } else {
          console.error("Error fetching data:", error);
          setErrormessag(error.code);
          setIsAllowed(false);
        }
      }
    };
    fetchData();
  }, []);

  // Separate useEffect for socket listeners
  useEffect(() => {
    socket.on("ElectricityStatus", (message) => {
      dispatch(electricityActions.getElecUpdate(message));
    });

    socket.on("ElecAlarme", (message) => {
      dispatch(electricityActions.getAlarmesUpdate(message));
    });

    socket.on("Gasoline", (message) => {
      dispatch(electricityActions.getGasolineUpdate(message));
    });

    socket.on("Normal_source", (message) => {
      dispatch(electricityActions.getNormaleSourceUpdate(message));
    });

    socket.on("ipStatus", (message) => {
      dispatch(communicationActions.getIpStatusUpdate(message));
    });

    socket.on("AlarmeMSG", (message) => {
      dispatch(actionsZones.getAlarmeUpdate(message));
    });

    socket.on("EquipStatus", (message) => {
      dispatch(actionsZones.getIpStatusUpdate(message));
    });

    socket.on("H_M", (message) => {
      dispatch(actionsZones.getMarcheUpdate(message));
    });

    socket.on("recMessage", (message) => {
      dispatch(actionsZones.getZoneUpdate(message));
    });
    socket.on("modeTel", (message) => {
      dispatch(actionsZones.getModeTeleUpdate(message));
    });

    const requestCommunicators = {
      successCallBack: (response) => {},
      failCallBack: (error) => {},
    };

    const requestZone = {
      successCallBack: (response) => {},
      failCallBack: (error) => {
        setStateSnackBar({
          ...stateSnackBar,
          severity: "error",
          message: error.response?.data?.message || error.message,
          openSnackBar: true,
        });
      },
    };

    socket.on("connect", () => {
      dispatch(actionsZones.ZoneStart(requestZone));
      setStateSnackBar((prevState) => ({
        ...prevState,
        severity: "success",
        message: "Le serveur est connecté",
        openSnackBar: true,
      }));
    });

    socket.on("reconnect", () => {
      dispatch(actionsZones.ZoneStart(requestZone));
    });

    socket.on("disconnect", () => {
      setStateSnackBar((prevState) => ({
        ...prevState,
        severity: "error",
        message: "Le serveur est hors ligne",
        openSnackBar: true,
      }));
    });
    socket.on("connect_error", () => {
      setStateSnackBar((prevState) => ({
        ...prevState,
        severity: "error",
        message: "La connexion au serveur n'a pas pu être établie",
        openSnackBar: true,
      }));
    });

    socket.on("connexion", (message) => {
      if (message.connected) {
        setStateSnackBar((prevState) => ({
          ...prevState,
          severity: "success",
          message: "Le serveur est connecté",
          openSnackBar: true,
        }));
      } else if (!message.connected) {
        setStateSnackBar((prevState) => ({
          ...prevState,
          severity: "error",
          message: "Le serveur est inaccessible",
          openSnackBar: true,
        }));
      }
    });

    socket.on("automateStatus", (message) => {
      const isConnected =
        message.status === true || message.status === "connected";

      setStateSnackBar((prevState) => ({
        ...prevState,
        severity: isConnected ? "success" : "error",
        message:
          message.message ||
          (isConnected
            ? "L'automate est reconnecté"
            : "L'automate est hors ligne"),
        openSnackBar: true,
      }));
    });

    socket.on("disco", (message) => {
      dispatch(actionsZones.getDiscoUpdate(message));
    });

    socket.on("H_alarme", (message) => {
      if (message?.solved) dispatch(alarmeActions.getAlarmesRemoved(message));
      else dispatch(alarmeActions.getAlarmesUpdate(message));
    });

    socket.on("payload", (message) => {
      dispatch(updateToken(message));
    });

    // Cleanup function to remove socket listeners
    return () => {
      socket.off("ElectricityStatus");
      socket.off("ElecAlarme");
      socket.off("Gasoline");
      socket.off("Normal_source");
      socket.off("ipStatus");
      socket.off("AlarmeMSG");
      socket.off("connect_error");
      socket.off("connexion");
      socket.off("automateStatus");
      socket.off("disco");
      socket.off("H_alarme");
      socket.off("payload");
    };
  }, [dispatch]);

  // Separate useEffect for initial data dispatch
  useEffect(() => {
    const alarmeGeneratorRequest = {
      successCallBack: (response) => {},
      failCallBack: (error) => {
        console.log(error);
      },
    };

    const gasolineRequest = {
      successCallBack: (response) => {},
      failCallBack: (error) => {
        console.log(error);
      },
    };

    const normaleSourceRequest = {
      successCallBack: (response) => {},
      failCallBack: (error) => {
        console.log(error);
      },
    };

    const electricityRequest = {
      successCallBack: (response) => {},
      failCallBack: (error) => {
        console.log(error);
      },
    };

    const requestZone = {
      successCallBack: (response) => {},
      failCallBack: (error) => {
        console.log(error);
      },
    };

    dispatch(
      communicationActions.communicationStart({
        successCallBack: (response) => {},
        failCallBack: (error) => {
          console.log(error);
        },
      })
    );
    dispatch(electricityActions.alarmeGeneratorStart(alarmeGeneratorRequest));
    dispatch(electricityActions.gasolineStart(gasolineRequest));
    dispatch(electricityActions.normaleSourceStart(normaleSourceRequest));
    dispatch(electricityActions.electricityStart(electricityRequest));
    dispatch(actionsZones.ZoneStart(requestZone));
  }, [dispatch]);
  const handleSnackClose = useCallback((event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setStateSnackBar((prevState) => ({ ...prevState, openSnackBar: false }));
  }, []);

  const loadingProps = useMemo(() => {
    const reducerHasLoading = _.pickBy(state, { isLoading: true });
    if (reducerHasLoading) {
      const target = _.keys(reducerHasLoading)[0];
      const nextProps = reducerHasLoading[target];
      if (target) {
        return { ...nextProps };
      }
    }
    return null;
  }, [state]);
  // les  route  de hors Authentication
  let routes = (
    <Layout>
      <Switch>
        <Route exact path="/eclairage" component={Eclairage} />
        <Route exact path="/balisage" component={Balisage} />
        <Route
          exact
          path="/Etat-de-communication"
          component={ForbiddenComponent}
        />
        <Route exact path="/Régulateur" component={ForbiddenComponent} />
        <Route exact path="/Alarmes" component={ForbiddenComponent} />
        <Route
          exact
          path="/"
          render={() => {
            return <Redirect to="/Balisage" />;
          }}
        />
        <Route path="*" component={NotFound} />
      </Switch>
    </Layout>
  );

  let content = (
    <Switch>
      <Route exact path="/eclairage" component={Eclairage} />
      <Route exact path="/balisage" component={Balisage} />
      {protectedRoutes &&
        Object.entries(protectedRoutes).map(([routeKey, routeProps]) => (
          <ProtectedRoute
            key={routeKey}
            roles={routeProps.requiredRoles}
            path={routeProps.path}
            component={routeProps.component}
          />
        ))}
      <Route
        exact
        path="/"
        render={() => {
          return <Redirect to="/balisage" />;
        }}
      />
      <Route path="*" component={NotFound} />
    </Switch>
  );

  let content1 = (
    <Switch>
      <Route exact path="/NotFound" component={NotFound} />
      <Route
        exact
        path="/"
        render={() => {
          return <Redirect to="/NotFound" />;
        }}
      />
      <Route path="*" component={NotFound} />
    </Switch>
  );

  if (isAuthenticated) {
    routes = (
      <Layout>
        <Dashboard roles={protectedRoutes} content={content} />
      </Layout>
    );
  }

  if (isAllowed === false) {
    routes = (
      <Layout>
        <Dashboard content={content1} />
      </Layout>
    );
  }

  return (
    <div>
      {isAllowed === null && <Spinner />}
      {isAllowed === false && <Forbidden />}
      {isAllowed === false && <Forbidden messageError={errormessag} />}
      {isAllowed === true && (
        <div>
          <Box>
            <Snackbar
              open={openSnackBar}
              anchorOrigin={{ vertical, horizontal }}
              autoHideDuration={duration}
              onClose={handleSnackClose}
            >
              <Alert severity={severity} onClose={handleSnackClose}>
                {message}
              </Alert>
            </Snackbar>
          </Box>
          {loadingProps?.isLoading ? <Spinner /> : <></>}
          {routes}
        </div>
      )}
    </div>
  );
}

export default React.memo(App);
