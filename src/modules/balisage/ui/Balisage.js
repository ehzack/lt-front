import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Telecommande from "../../../common/components/Telecommande/ui/Telecommande";
import * as authorizationActions from "../state/authorizationActions";
import * as matrixActions from "../state/matrixActions";
import { AUTOMATE, REGULATEUR } from "../../../common/Constants";
import * as actionsZones from "../../../common/components/Telecommande/state/ZoneActions";
import { Box, Snackbar, Alert, Button, CardActions, CardContent, DialogTitle, DialogActions, Dialog, Slide } from '@mui/material';
import { useStyles } from "../Style/balisageStyle";
import { socket } from "../../../common/utils/webSockets/websockets";
import JwtUtils from "../../../routing/JwtUtils";
import * as roles from "../../../routing/roles";
import axios from 'axios';
import Alarmes from "../../eclairage/components/Alarmes";
import config from "../../../common/Config";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const Balisage = () => {

    // component variables
    const dispatch = useDispatch();

    // Initialize local state with Redux data
    const [zonesState, setZonesState] = useState({ zones: null });
    const automateState = useSelector(state => state?.Communicator?.communicators)?.find(
        (communicator) =>
            communicator?.label === AUTOMATE
    )?.ipAdress?.[0]?.status;
    const [response] = useState(null);

    const matrixState = useSelector(state => state?.Matrix?.matrix);

    matrixState?.map((matrix) => {
        return matrix.macro.sort((item1, item2) => {
            if (item1.name > item2.name) return 1;
            if (item2.name > item1.name) return -1;
            return 0;
        })
    })
    matrixState?.sort((item1, item2) => {
        if (item1.name < item2.name) return -1;
        if (item2.name < item1.name) return 1;

        return 0;
    })
    matrixState?.sort((item1, item2) => {
        if (item1.name === "DEFAULT") return -1;
        if (item2.name === "DEFAULT") return 1;

        return 0;
    })
    const [macroapplied, setMacroApplied] = useState({ id: null, address: null });
    const classes = useStyles();
    const [stateSnackBar, setStateSnackBar] = useState({
        openSnackBar: false,
        vertical: "bottom",
        horizontal: "left",
        severity: "success",
        duration: 3000,
        message: "",
    });
    const [open, setOpen] = useState(false);
    const [connected, setConnected] = useState(true);
    const [authorizedRole, setAuthorizedRole] = useState("Agent_supervision");
    const { openSnackBar, vertical, horizontal, severity, duration, message } = stateSnackBar;
    const [show, setShow] = useState({
        generalCommande: false,
        autorisation: false
    });
    let disabledButtons = null;
    const authorized = (JwtUtils.hasThisRole(roles.ROLE_SUPERVISION) || JwtUtils.hasThisRole(roles.ROLE_ADMIN) || JwtUtils.authorizedConfirmation([roles.ROLE_MAINTENANCE]));
    // depending on the variable authorized the button are activated or desactivated
    if (authorized) {
        disabledButtons = {
            supervisior: (JwtUtils.hasThisRole(roles.ROLE_SUPERVISION) && !JwtUtils.authorizedConfirmation([roles.ROLE_SUPERVISION])) || (JwtUtils.hasThisRole(roles.ROLE_ADMIN) && (authorizedRole === roles.ROLE_MAINTENANCE)) || JwtUtils.authorizedConfirmation([roles.ROLE_MAINTENANCE]),
            maintainer: JwtUtils.authorizedConfirmation([roles.ROLE_SUPERVISION]) || (JwtUtils.hasThisRole(roles.ROLE_ADMIN) && (authorizedRole === roles.ROLE_SUPERVISION))
        }
    }

    const memoizedZonesState = useMemo(() => {
        return { zones: response?.data };
    }, [response]);



    // loading zones and updating it through web socket response
    useEffect(() => {


        setZonesState(memoizedZonesState);

        const fetchData = async () => {
            try {
                const response = await axios.get(config.url + '/AuthRole');
                setAuthorizedRole(response.data.authorized ? "Agent_supervision" : "Agent_maintenance");
            } catch (error) {
                console.log(error);
            }
        };
        if (JwtUtils.hasThisRole(roles.ROLE_ADMIN)) fetchData();


        const showSession = {
            generalCommande: sessionStorage.getItem(`GENERAL`),
            authorization: sessionStorage.getItem(`AUTHORIZATION`)
        }

        if (showSession) {
            setShow({
                generalCommande: showSession?.generalCommande === "true",
                autorisation: showSession?.authorization === "true"
            })
        }



        socket.on('connect', () => {
            setConnected(true);
        });
        socket.on('reconnect', () => {
            setConnected(true);
        });
        socket.on('disconnect', () => {
            setConnected(false);
        });
        socket.on('connect_error', () => {
            setConnected(false);
        });
        socket.on('recMessage', (message) => {
            setZonesState((prevZonesState) => ({
                ...prevZonesState,
                zones: prevZonesState?.zones?.map((zone) =>
                    zone.id === message.id
                        ? {
                            ...zone,
                            ValeurRealTime: message.ValeurRealTime,
                            equipements: zone?.equipements?.map((equipement) => ({
                                ...equipement,
                                LevelRealTime:
                                    message.ValeurRealTime !== -1
                                        ? message.ValeurRealTime
                                        : equipement.LevelRealTime,
                            })),
                        }
                        : zone
                ),
            }));
        });
        socket.on('disco', (message) => {
            setZonesState((prevZonesState) => ({
                ...prevZonesState,
                zones: prevZonesState?.zones?.map(
                    (zone) =>
                        zone.id === message.id ?
                            {
                                ...zone,
                                ValeurRealTime: message.ValeurRealTime,
                                equipements: zone.equipements.map(
                                    (equipement) =>
                                    ({
                                        ...equipement,
                                        LevelRealTime: message.equipements.find(
                                            (msgequipement) =>
                                                msgequipement.id === equipement.id
                                        ).LevelRealTime,
                                    })
                                )
                            }
                            : zone
                ),
            }))
        });
        socket.on('modeTel', (message) => {
            setZonesState((prevZonesState) => ({
                ...prevZonesState,
                zones: prevZonesState?.zones?.map((zone) =>
                    zone.id === message.id ?
                        {
                            ...zone,
                            equipements: zone?.equipements?.map(
                                (equipement) =>
                                    equipement.id === message.equipements.id ?
                                        {
                                            ...equipement,
                                            ModeTel_Value: message.equipements.ModeTel_Value
                                        }
                                        : equipement
                            )
                        }
                        : zone
                ),
            }));
        });
        socket.on('AlarmeMSG', (message) => {
            setZonesState((prevZonesState) => ({
                ...prevZonesState,
                zones: prevZonesState?.zones?.map((zone) =>
                    zone.id === message.id ?
                        {
                            ...zone,
                            equipements: zone?.equipements?.map(
                                (equipement) =>
                                    equipement.id === message.equipements.id ?
                                        {
                                            ...equipement,
                                            items: equipement?.items?.map(
                                                (item) =>
                                                    item.id === message?.equipements?.items?.id ? { ...item, ValeurRealTime: message.equipements.items.ValeurRealTime }
                                                        : item
                                            ),
                                        }
                                        : equipement
                            )
                        }
                        : zone
                ),
            }));
        });

        socket.on('connexion', (message) => {
            setConnected(message.connected);
        });

        socket.on('UserType', (message) => {
            setAuthorizedRole(message.usertype);
        });


        const requestZones = {
            successCallBack: (response) => {

                const sortedZones = response.data.sort((zone1, zone2) => {
                    if (zone1.LabelZone < zone2.LabelZone) return -1;
                    if (zone2.LabelZone < zone1.LabelZone) return 1;
                    return 0;
                });

                setZonesState({ zones: sortedZones });
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


        const requestMatrix = {
            successCallBack: (response) => {
            },
            failCallBack: (error) => {
            },
        };
        dispatch(actionsZones.ZoneStart(requestZones))
        dispatch(matrixActions.matrixStart(requestMatrix))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [memoizedZonesState])

    // turn off confirmation function
    const handleConfirmation = (confirmationOpened, id, address) => {
        setMacroApplied({ id, address });
        setOpen(confirmationOpened);
    }


    // error pop up closing function
    const handleSnackClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setStateSnackBar({ ...stateSnackBar, openSnackBar: false });
    };

    // function responsible for requesting a macro from the backend
    const launchMacro = (macroId, address) => {
        console.log(new Date(), new Date().getMilliseconds());
        if (automateState && connected && JwtUtils.authorizedConfirmation([roles.ROLE_ADMIN, roles.ROLE_MAINTENANCE, roles.ROLE_SUPERVISION])) {
            let payload = {
                id: macroId,
                adress: address
            }
            const request = {
                payload,
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
            dispatch(matrixActions.macroStart(request));
        }
        handleConfirmation(false)
    }

    // function responsible for switching the authorization between the maintenance and supervisor
    const authorization = (authorization) => {
        if (authorized) {
            let payload = { authorized: authorization }
            const request = {
                payload,
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
            dispatch(authorizationActions.authorizationStart(request));
        }
    }


    const blinkingAnimation = `
        @keyframes blinking {
            0% { opacity: 1; }
            50% { opacity: 0; }
            100% { opacity: 1; }
        }
    `;

    if (!zonesState || !zonesState.zones) {
        return <div>Loading...</div>;
    }
    return (
        <Box
            className={classes.map}>
            {
                zonesState?.zones?.map((zone) => {
                    return zone.equipements?.map((equipement) => {
                        return equipement.components?.map((component, id) => {
                            return <img
                                key={id}
                                src={(equipement?.type === REGULATEUR && !equipement?.IpStatus?.some(ip => ip?.status)) || equipement?.ModeTel_Value || equipement?.items?.some(items => items?.type === "Alarme" && items?.ValeurRealTime) ? component.DefPath : equipement.LevelRealTime !== 0 ? component.imgOnPath : component.imgOffPath}
                                style={{
                                    position: "absolute", left: component.PositionX, top: component.PositionY,
                                    animation: (equipement?.type === REGULATEUR && !equipement?.IpStatus?.some(ip => ip?.status)) || equipement?.ModeTel_Value || equipement?.items?.some(items => items?.type === "Alarme" && items?.ValeurRealTime) ? "blinking 1.7s infinite" : null,
                                }}
                                alt="lamp"
                            />
                        })
                    })
                })
            }
            <style>{blinkingAnimation}</style>
            <Box className={classes.alarmeCards}>
                <Box className={classes.cards}>
                    {
                        zonesState?.zones?.map((zone, id) => {
                            if (zone.equipements[0]?.type === REGULATEUR) return <Telecommande key={id} object={zone} connected={connected && automateState} />
                            return null;
                        })
                    }
                </Box>
                <Box style={{ width: "100%" }}>
                    <Alarmes />
                </Box>
            </Box>
            <Box className={classes.balisageCards}>
                <Box className={classes.commande}>
                    <CardContent
                        onClick={() => {
                            sessionStorage.setItem(`GENERAL`, !show.generalCommande)
                            setShow({
                                ...show, generalCommande: !show.generalCommande
                            })
                        }}
                        className={classes.CardCommandeSlide}>
                        COMMANDE GENERALE
                    </CardContent>
                    {show?.generalCommande &&
                        <CardActions className={classes.commandeCardActions}>
                            {
                                matrixState?.map((matrix, id) => {
                                    return <Box key={id} id={id} className={classes.STD}>
                                        <Box className={classes.macroBox}>
                                            {
                                                matrix.macro[0]?.active ? <Button onClick={() => { handleConfirmation(true, matrix?.macro[0]?.id, matrix?.macro[0]?.CMD_Adress) }} disabled={!(connected && automateState) || !JwtUtils.authorizedConfirmation([roles.ROLE_ADMIN, roles.ROLE_MAINTENANCE, roles.ROLE_SUPERVISION])} className={matrix?.macro[0]?.name === "OFF" ? classes.macroButtonOff : classes.macroButton} variant="contained" >{matrix?.macro[0]?.name}</Button>
                                                    : null
                                            }
                                        </Box>
                                        <Box className={classes.macroBox}>
                                            {
                                                matrix?.macro[1]?.active ? <Button onClick={() => { handleConfirmation(true, matrix?.macro[1]?.id, matrix?.macro[1]?.CMD_Adress) }} disabled={!(connected && automateState) || !JwtUtils.authorizedConfirmation([roles.ROLE_ADMIN, roles.ROLE_MAINTENANCE, roles.ROLE_SUPERVISION])} className={matrix?.macro[1]?.name === "ON" ? classes.macroButtonOn : classes.macroButton} variant="contained" >{matrix?.macro[1]?.name}</Button>
                                                    : null
                                            }
                                        </Box>
                                    </Box>
                                })
                            }
                        </CardActions>
                    }
                </Box>
                <Box className={classes.authorization}>
                    <CardContent onClick={() => {
                        sessionStorage.setItem(`AUTHORIZATION`, !show.autorisation)
                        setShow({
                            ...show, autorisation: !show.autorisation
                        })
                    }} className={classes.CardContentSlide}>
                        AUTORISATION
                    </CardContent>
                    {show?.autorisation &&
                        <CardActions className={classes.secondCardActions}>
                            <Button onClick={() => { authorization(true) }} className={authorized ? classes.ButtonMain : null} variant="contained" disabled={!disabledButtons?.maintainer}>maint</Button>
                            <Button onClick={() => { authorization(false) }} className={authorized ? classes.ButtonSuper : null} variant="contained" disabled={!disabledButtons?.supervisior}>super</Button>
                        </CardActions>
                    }
                </Box>
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
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => { handleConfirmation(false) }}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Voulez-vous vraiment lancer cette macro ?"}</DialogTitle>
                <DialogActions className={classes.confirmationActions}>
                    <Button variant="contained" onClick={() => { launchMacro(macroapplied.id, macroapplied.address) }}>Oui</Button>
                    <Button variant="contained" onClick={() => { handleConfirmation(false) }}>Non</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default Balisage;