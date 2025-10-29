import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Telecommande from "../../../common/components/Telecommande/ui/Telecommande";
import { AUTOMATE, MAT, REGULATEUR } from "../../../common/Constants"
import { Box, Snackbar, Alert } from '@mui/material';
import { useStyles } from "../Style/eclairageStyle";
import { socket } from "../../../common/utils/webSockets/websockets"
import Alarmes from "../components/Alarmes";

const Eclairage = () => {

    // component variables


    const zones = useSelector(state => state?.Zone);
    const automateState = useSelector(state => state?.Communicator?.communicators)?.find(
        (communicator) =>
            communicator?.label === AUTOMATE
    )?.ipAdress?.[0]?.status;

    // Initialize local state with Redux data
    const [localZones, setLocalZones] = useState(zones);
    setTimeout(() => {
        setLocalZones(zones);
    }, 100);

    localZones?.zones?.sort((zone1, zone2) => {
        if (zone1.LabelZone > zone2.LabelZone) return 1;
        if (zone1.LabelZone < zone2.LabelZone) return -1;
        return 0;
    })
    const classes = useStyles();
    const [stateSnackBar, setStateSnackBar] = useState({
        openSnackBar: false,
        vertical: "bottom",
        horizontal: "left",
        severity: "success",
        duration: 3000,
        message: "",
    });
    const [connected, setConnected] = useState(true);
    const { openSnackBar, vertical, horizontal, severity, duration, message } = stateSnackBar;


    // loading zones and updating it through web socket response
    useEffect(() => {



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
            setLocalZones((prevZonesState) => ({
                ...prevZonesState,
                zones: prevZonesState?.zones?.map((zone) =>
                    zone.id === message.id
                        ? {
                            ...zone,
                            ValeurRealTime: message.ValeurRealTime,
                            equipements: zone.equipements.map((equipement) => ({
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
        socket.on('modeTel', (message) => {
            setLocalZones((prevZonesState) => ({
                ...prevZonesState,
                zones: prevZonesState?.zones?.map((zone) =>
                    zone.id === message.id ?
                        {
                            ...zone,
                            equipements: zone.equipements.map(
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
            setLocalZones((prevZonesState) => ({
                ...prevZonesState,
                zones: prevZonesState?.zones?.map((zone) =>
                    zone.id === message.id ?
                        {
                            ...zone,
                            equipements: zone.equipements.map(
                                (equipement) =>
                                    equipement.id === message.equipements.id ?
                                        {
                                            ...equipement,
                                            items: equipement.items.map(
                                                (item) =>
                                                    item.id === message?.equipements?.items?.id ? { ...item, ValeurRealTime: message.equipements.items.ValeurRealTime }
                                                        : item
                                            )
                                        }
                                        : equipement
                            )
                        }
                        : zone
                ),
            }));
        });
        socket.on('disco', (message) => {
            // dispatch(actionsZones.getZoneUpdate(message));
        });

        socket.on('connexion', (message) => {
            setConnected(message.connected);
        });


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    // error pop up closing function
    const handleSnackClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setStateSnackBar({ ...stateSnackBar, openSnackBar: false });
    };

    const blinkingAnimation = `
        @keyframes blinking {
            0% { opacity: 1; }
            50% { opacity: 0; }
            100% { opacity: 1; }
        }
    `;



    return (
        <Box className={classes.map}>
            {
                localZones?.zones?.map((zone) => {
                    return zone.equipements?.map((equipement) => {
                        return equipement.components?.map((component, id) => {
                            return <img
                                key={id}
                                src={(equipement?.type === REGULATEUR && !equipement?.IpStatus?.some(ip => ip?.status)) || equipement?.ModeTel_Value || equipement?.items?.some(items => items?.type === "Alarme" && items?.ValeurRealTime) ? component.DefPath : equipement.LevelRealTime !== 0 ? component.imgOnPath : component.imgOffPath}
                                style={{
                                    position: "absolute", left: component.PositionX, top: component.PositionY,
                                    animation: (equipement?.type === REGULATEUR && !equipement?.IpStatus?.some(ip => ip?.status)) || equipement?.ModeTel_Value || equipement?.items?.some(items => items?.type === "Alarme" && items?.ValeurRealTime) ? "blinking 1.7s infinite" : null,
                                }}
                                alt="component"
                            />
                        })
                    })
                })
            }
            <style>{blinkingAnimation}</style>
            <Box className={classes.zoneCards}>
                {
                    localZones?.zones?.map((zone, id) => {
                        if (zone.equipements[0]?.type === MAT && zone.equipements.length > 1) return <Telecommande key={id} object={zone} connected={connected && automateState} />
                        return null;
                    })
                }
            </Box>
            <Box className={classes.alarmeCards}>
                <Box className={classes.matCards}>
                    {
                        localZones?.zones?.map((zone, zoneId) => {
                            if (zone.equipements[0]?.type === MAT && zone.equipements.length === 1) {
                                return <Telecommande key={zoneId} object={zone} connected={connected && automateState} />
                            }
                            return null;
                        })
                    }
                </Box>
                <Box style={{ width: "100%" }}>
                    <Alarmes />
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
        </Box>
    )
}

export default Eclairage;