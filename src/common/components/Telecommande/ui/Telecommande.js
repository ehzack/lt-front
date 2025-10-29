import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import * as actionsZones from "../state/ZoneActions";
import { SEUILMIN, SEUILMAX, MAT, SEUILMAXMAT, REGULATEUR } from "../../../../common/Constants"
import {
    Box, Typography, Snackbar, Alert, Card, Button, CardActions,
    CardContent, DialogTitle, DialogActions, Dialog, Slide
} from '@mui/material';
import { useStyles } from '../Style/telecommandeStyle';
import JwtUtils from "../../../../routing/JwtUtils";
import * as roles from "../../../../routing/roles"




const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Telecommande(props) {

    // component variables
    const classes = useStyles();
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [open, setOpen] = useState(false);
    const [stateSnackBar, setStateSnackBar] = useState({
        openSnackBar: false,
        vertical: "top",
        horizontal: "center",
        severity: "success",
        duration: 2000,
        message: "",
    });
    const { openSnackBar, vertical, horizontal, severity, duration, message } = stateSnackBar;


    const controlState = props.object;
    const ipStatus = controlState?.equipements?.some(equipement => equipement?.IpStatus?.some(ip => ip?.status));
    const oneManual = controlState?.equipements?.find(equipement => equipement.ModeTel_Value === 1);
    const allManual = !controlState?.equipements?.find(equipement => equipement.ModeTel_Value === 0);
    const defautCheck = (controlState?.equipements?.[0]?.type === REGULATEUR && !ipStatus) || oneManual || controlState?.equipements?.find(equipement => equipement.items.find(item => item.ValeurRealTime && item.type === "Alarme"));


    const authorized = (props.connected && !allManual && ((controlState?.equipements[0]?.type === MAT && JwtUtils.hasAnyRole([roles.ROLE_MAINTENANCE, roles.ROLE_SUPERVISION, roles.ROLE_ADMIN])) || (controlState?.equipements[0]?.type === REGULATEUR && JwtUtils.authorizedConfirmation([roles.ROLE_MAINTENANCE, roles.ROLE_SUPERVISION, roles.ROLE_ADMIN]))));

    let disabledButtons = null;
    if (authorized) {
        disabledButtons = {
            offButton: !(controlState?.ValeurRealTime === 0),
            onButton: !(controlState?.ValeurRealTime > 0),
            minusButton: (controlState?.ValeurRealTime !== 0) && (controlState?.ValeurRealTime !== SEUILMIN),
            plusButton: (controlState.ValeurRealTime > 0) && ((controlState.ValeurRealTime < SEUILMAXMAT && controlState?.equipements[0]?.type === MAT) || (controlState.ValeurRealTime < SEUILMAX && controlState?.equipements[0]?.type !== MAT))
        }
    }

    useEffect(() => {
        const storedValue = sessionStorage.getItem(`telecommandeValue_${props.object.id}`);

        // If a stored value exists, set it in the state
        if (storedValue) {
            setShow(storedValue === "true");
        }
    }, [props.object.id]);



    // turn off confirmation function
    const handleConfirmation = (confirmationOpened) => {
        setOpen(confirmationOpened);
    }
    // error pop up closing function
    const handleSnackClose = () => {
        setStateSnackBar({ ...stateSnackBar, openSnackBar: false });
    };

    // controller show/hide function
    function hundleControllersPopUp() {
        setShow(pre => {
            sessionStorage.setItem(`telecommandeValue_${props.object.id}`, !pre);
            return !pre
        })
    }


    // OFF/ON for zone function
    const Switch = (command) => {
        if (authorized) {
            let payload = command ? { id: controlState.id, CMD_ON: controlState.CMD_ON } : { id: controlState.id, CMD_OFF: controlState.CMD_OFF }
            const request = {
                payload,
                successCallBack: (response) => {
                },
                failCallBack: (error) => {
                    setStateSnackBar({
                        ...stateSnackBar,
                        severity: "error",
                        message: error.response?.data?.message,
                        openSnackBar: true,
                    });
                },
            };
            dispatch(actionsZones.SwitchStart(request));
        }
        handleConfirmation(false)
    }

    // level Down/UP for zone function
    const updateLuminosity = (levelUpdate) => {
        if (authorized) {
            let payload = levelUpdate ? { id: controlState.id, CMD_PLUS: controlState.CMD_PLUS } : { id: controlState.id, CMD_MOINS: controlState.CMD_MOINS }
            const request = {
                payload,
                successCallBack: (response) => {
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
            dispatch(actionsZones.LuminosityStart(request));
        }
    }

    return (
        <Card className={classes.card}>
            <CardContent
                onClick={hundleControllersPopUp} className={
                    defautCheck ?
                        classes.CardContentError
                        : controlState?.ValeurRealTime ?
                            classes.CardContentOn
                            : classes.CardContentOff}>
                {controlState?.LabelZone || controlState?.name}
                {!show &&
                    <Box>
                        {controlState.ValeurRealTime === -1 ?
                            <Box className={classes.levelDropDownError}>!</Box>
                            : <Box className={classes.levelDropDown}>{controlState?.ValeurRealTime}</Box>
                        }
                    </Box>
                }
            </CardContent>
            <Box>
                {show &&
                    <Box>
                        <CardActions className={classes.luminosityActions}>
                            <Button onClick={() => { handleConfirmation(true) }} className={authorized ? classes.SwitchOffButtonAut : classes.SwitchOffButton} variant="contained" disabled={!disabledButtons?.offButton}>OFF</Button>
                            <Button onClick={() => { Switch(true) }} className={authorized ? classes.SwitchOnButtonAut : classes.SwitchOnButton} variant="contained" disabled={!disabledButtons?.onButton}>ON</Button>
                        </CardActions>
                        <Typography className={classes.Typography}>Niveau:</Typography>
                        <Box className={classes.luminosityControl}>
                            <Button className={classes.Button} onClick={() => { updateLuminosity(false) }} disabled={!disabledButtons?.minusButton} variant="contained">-</Button>
                            {controlState.ValeurRealTime === -1 ?
                                <Box className={classes.levelDropDownError}>!</Box>
                                : <Typography className={classes.luminosity}>{controlState?.ValeurRealTime}</Typography>
                            }
                            <Button className={classes.Button} onClick={() => { updateLuminosity(true) }} disabled={!disabledButtons?.plusButton} variant="contained">+</Button>
                        </Box>
                    </Box>
                }
            </Box>
            <Box>
                <Snackbar
                    sx={{ width: "100%" }}
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
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => { handleConfirmation(false) }}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Voulez-vous vraiment désactiver cette zone ?"}</DialogTitle>
                <DialogActions className={classes.luminosityActions}>
                    <Button variant="contained" onClick={() => { Switch(false) }}>Oui</Button>
                    <Button variant="contained" onClick={() => { handleConfirmation(false) }}>Non</Button>
                </DialogActions>
            </Dialog>
        </Card>
    )
}
