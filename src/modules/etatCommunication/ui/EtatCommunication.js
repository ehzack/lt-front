import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Snackbar, Alert } from '@mui/material';
import { useStyles } from "../Style/EtatCommunicationStyle";
import Unit from "../../../common/components/Unit/ui/Unit";


const EtatCommunication = () => {

    // component variables
    const dispatch = useDispatch();
    const communicatorsState = useSelector(state => state?.Communicator?.communicators);
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

    // loading zones and updating it through web socket response
    useEffect(() => {

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])


    // error pop up closing function
    const handleSnackClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setStateSnackBar({ ...stateSnackBar, openSnackBar: false });
    };





    return (
        <Box
            className={classes.map}>
            {
                communicatorsState?.map((communicator, communicatorId) => {
                    return <Unit key={communicatorId} PositionX={communicator?.PositionX + "px"} PositionY={communicator?.PositionY + "px"} name={communicator.label} address1={communicator?.ipAdress[0]?.ipAdress} address2={communicator?.ipAdress[1]?.ipAdress} connected1={communicator?.ipAdress[0]?.status} connected2={communicator?.ipAdress[1]?.status} />;
                })
            }
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

export default EtatCommunication;