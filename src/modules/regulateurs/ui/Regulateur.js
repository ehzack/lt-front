import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import RegulateurUnit from "../../../common/components/Regulateur/ui/RegulateurUnit";
import { REGULATEUR } from "../../../common/Constants"
import { Box, Snackbar, Alert } from '@mui/material';
import { socket } from "../../../common/utils/webSockets/websockets";
import * as actionsZones from '../../../common/components/Telecommande/state/ZoneActions';
import { useStyles } from "../Style/regulateurStyle";

function Regulateur() {

  // component variables
  const zonesState = useSelector(state => state?.Zone.zones);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [stateSnackBar, setStateSnackBar] = useState({
    openSnackBar: false,
    vertical: "bottom",
    horizontal: "left",
    severity: "success",
    duration: 3000,
    message: "",
  });

  const { openSnackBar, vertical, horizontal, severity, duration, message } = stateSnackBar;

  useEffect(() => {


    const requestZone = {
      successCallBack: (response) => {
      },
      failCallBack: (error) => {
        setStateSnackBar({
          ...stateSnackBar,
          severity: "error",
          message: error.response?.data?.message || error.message,
          openSnackBar: true,
        });
      },
    };

    const handleExtraData = (message) => {
      dispatch(actionsZones.getExtraUpdate(message));
    };

    socket.on('ExtraData', handleExtraData);


    dispatch(actionsZones.ZoneStart(requestZone));
    return () => {
      socket.off('ExtraData', handleExtraData);
    };




    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  // error pop up closing function
  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setStateSnackBar({ ...stateSnackBar, openSnackBar: false });
  };

  return (
    <Box className={classes.backGround}>
      <Box className={classes.regulateurs}>
        {
          zonesState.map((zone, id) => {
            if (zone?.equipements[0]?.type === REGULATEUR) return zone.equipements.map((equipement, eqID) => {
              return <RegulateurUnit key={eqID} equipement={equipement} zoneLabel={zone.LabelZone} />
            })
            return null;
          })
        }
      </Box>


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
    </Box>
  )
}

export default Regulateur