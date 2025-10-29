import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { Grid, Button, Box, Snackbar, Alert } from "@mui/material";
import { useStyles } from "../../alarme/Style/AlarmeStyle";
import moment from "moment";
import * as alarmeActions from "../state/AlarmeActions";
import { socket } from "../../../common/utils/webSockets/websockets";

const columns = [
  {
    field: "Date/D",
    headerName: "Date/D Heure/D",
    width: 180,
    align: "center",
    headerAlign: "center",
    type: "dateTime",
    valueGetter: (params) =>
      params.row.Created_at
        ? moment(params.row.Created_at).format("MMM DD, YYYY HH:mm")
        : null,
    sortComparator: (v1, v2) => {
      const date1 = moment(v1, "MMM DD, YYYY HH:mm", true);
      const date2 = moment(v2, "MMM DD, YYYY HH:mm", true);
      return date1 - date2;
    },
  },
  {
    field: "Date/F",
    headerName: "Date/F Heure/F",
    width: 180,
    align: "center",
    headerAlign: "center",
    type: "dateTime",
    valueGetter: (params) =>
      params.row.solved_date && params.row.solved
        ? moment(params.row.solved_date).format("MMM DD, YYYY HH:mm")
        : null,
    sortComparator: (v1, v2) => {
      const date1 = moment(v1, "MMM DD, YYYY HH:mm", true);
      const date2 = moment(v2, "MMM DD, YYYY HH:mm", true);
      return date1 - date2;
    },
  },
  {
    field: "designation",
    headerName: "Designation",
    width: 450,
    align: "center",
    headerAlign: "center",
    valueGetter: (params) => `${params.row.Designation || ""}`,
  },
];

const Alarme = () => {
  const alarmeState = useSelector((state) => state.Alarmes?.alarmes);
  const activeAlarmes = alarmeState.filter(
    (alarme) => !alarme.solved || (alarme.solved && !alarme.acquittement)
  ).map((alarme, index) => ({ ...alarme, id: alarme.id || index })
  );

  const [stateSnackBar, setStateSnackBar] = useState({
    openSnackBar: false,
    vertical: "top",
    horizontal: "center",
    severity: "success",
    duration: 2000,
    message: "",
  });

  const { openSnackBar, vertical, horizontal, severity, duration, message } =
    stateSnackBar;

  const dispatch = useDispatch();

  const classes = useStyles();

  const handleSubmit = (e) => {
    let payload = { acquittement: true };

    const request = {
      payload,
      successCallBack: (response) => {
        setStateSnackBar({
          ...stateSnackBar,
          severity: "success",
          message: "acquité avec succées",
          openSnackBar: true,
        });
      },
      failCallBack: (error) => {
        setStateSnackBar({
          ...stateSnackBar,
          severity: "error",
          message: error.response.data.message,
          openSnackBar: true,
        });
      },
    };

    dispatch(alarmeActions.AcquittementStart(request));
  };

  useEffect(() => {

    const requestAlarmes = {
      successCallBack: (response) => {
      },
      failCallBack: (error) => {
      },
    };


    socket.on("Acquittement", (message) => {
      dispatch(alarmeActions.getAcquittementUpdate(message));
    })


    dispatch(alarmeActions.AlarmeStart(requestAlarmes));




    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setStateSnackBar({ ...stateSnackBar, openSnackBar: false });
  };

  return (
    <Grid container direction="column" className={classes.map}>
      {/* Define the main grid container */}
      <Grid item container>
        <Grid
          item
          xs={12}
          sm={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div style={{ height: "80vh", width: "90vw" }}>
            {/* Define the DataGrid component */}
            <DataGrid
              className={classes.DataGrid}
              headerHeight={25}
              rowHeight={25}
              rows={activeAlarmes}
              autoPageSize
              rowsPerPageOptions={[100]}
              columns={columns}
              initialState={{
                sorting: {
                  sortModel: [
                    {
                      field: "Date/D",
                      sort: "desc",
                    },
                  ],
                },
              }}
              getRowClassName={(params) => {
                /* Define the function to return a class name based on row data */
                if (params.row.acquittement) return `super-app-theme--acquitté`;
                else if (params.row.solved && !params.row.acquittement)
                  return `super-app-theme--solved-non-acquitté`;
                else return "super-app-theme--false";
              }}
            />
          </div>
        </Grid>
        {/* Add an empty grid item to the right */}
        <Grid item xs={0} sm={1} />
        {/* Define a Box component to hold the button */}
        <Box textAlign="center" style={{ width: "100%" }}>
          {/* Define the button */}
          <Button variant="contained" onClick={handleSubmit}>
            Acquitement{" "}
          </Button>
        </Box>
      </Grid>
      {/* Define a Snackbar component to display messages */}
      <Box>
        <Snackbar
          open={openSnackBar}
          anchorOrigin={{ vertical, horizontal }}
          autoHideDuration={duration}
          onClose={handleSnackClose}
        >
          {/* Define the Alert component */}
          <Alert severity={severity} onClose={handleSnackClose}>
            {message}
          </Alert>
        </Snackbar>
      </Box>
    </Grid>
  );
};

export default Alarme;
