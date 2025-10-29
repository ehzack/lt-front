import React from 'react';
import { Box, Card, CardContent, Button, Typography, Modal } from '@mui/material';
import { useStyles } from '../Style/regulateurUnitStyle';
import regIcon from '../../../../assets/images/Icon_Reg.png';
import UnitAlarmes from '../../UnitAlarmes';



export default function RegulateurUnit(props) {

    // component variables


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const classes = useStyles();
    const heureMarche = props?.equipement?.heur_Value < 10 ? `0${props?.equipement?.heur_Value}` : props?.equipement?.heur_Value;
    const minuteMarche = props?.equipement?.min_Value < 10 ? `0${props?.equipement?.min_Value}` : props?.equipement?.min_Value;
    
    props?.equipement?.items?.sort((item1, item2) => {
        if (item1.Designation > item2.Designation) return 1;
        if (item2.Designation > item1.Designation) return -1;
        return 0;
    })
    let analogs = null;
    let ccrFaults = null;
    
    
    // assigning values when the equipement is communicant
    if (props?.equipement?.communicating) {
        analogs = {
            outputCurrent: props?.equipement?.extra_data?.find(extra => extra?.Label === "Output_Current")?.Value,
            outputVoltage: props?.equipement?.extra_data?.find(extra => extra?.Label === "Output_Voltage")?.Value,
            inputVoltage: props?.equipement?.extra_data?.find(extra => extra?.Label === "Input_Voltage")?.Value,
            outputPower: props?.equipement?.extra_data?.find(extra => extra?.Label === "Output_Power")?.Value,
            insulation: props?.equipement?.extra_data?.find(extra => extra?.Label === "Insultation")?.Value,
            time: `${heureMarche ? heureMarche : "00"} : ${minuteMarche ? minuteMarche : "00"}`,
            LFDStatus: props?.equipement?.extra_data?.find(extra => extra.Label === "LFD_Status")?.Value,
        }
        ccrFaults = {
            commIp1: props?.equipement?.IpStatus?.[0]?.status,
            commIp2: props?.equipement?.IpStatus?.[1]?.status,
            regulationFault: props?.equipement?.items?.find(item => item?.Label === "REGULATION_FAULT")?.ValeurRealTime,
            powerSupply: props?.equipement?.items?.find(item => item?.Label === "POWER_SUPPLY")?.ValeurRealTime,
            modeTel: props?.equipement?.items?.find(item => item?.Label === "MODE_LOCAL")?.ValeurRealTime,
            earthFault: props?.equipement?.items?.find(item => item?.Label === "DEF_ISO")?.ValeurRealTime,
            openCircuit: props?.equipement?.items?.find(item => item?.Label === "DEF_CIR_OUV")?.ValeurRealTime,
            overCurrent: props?.equipement?.items?.find(item => item?.Label === "OVER_CURRENT")?.ValeurRealTime,
            currentFault: props?.equipement?.items?.find(item => item?.Label === "DEF_I")?.ValeurRealTime,
            phaseFault: props?.equipement?.items?.find(item => item?.Label === "DEF_PHASE")?.ValeurRealTime,
            lampFlt: {
                lvl1: props?.equipement?.items?.find(item => item?.Label === "DEF_FEUX_GRI")?.ValeurRealTime,
                lvl2: props?.equipement?.items?.find(item => item?.Label === "LAMP_FLT_LVL2")?.ValeurRealTime
            }
        }
    }
    const manualCheck = props?.equipement?.ModeTel_Value;
    const defautCheck = !ccrFaults?.commIp1 || manualCheck || props?.equipement?.items?.find(item => item.ValeurRealTime);
    
    return (
        <Card className={classes.regulateur}>
            <CardContent
                className={
                    defautCheck ? classes.CardContentError
                    : props?.equipement?.LevelRealTime ? classes.CardContentOn
                    : classes.CardContentOff}
                    >
                <Box className={classes.label}> {props?.equipement?.name}</Box>
                <Box className={classes.communiquantB}> {props?.equipement?.communicating ? <Button className={classes.communiquantButton} onClick={handleOpen}>+</Button> : null} </Box>
            </CardContent>

            <CardContent className={classes.allDefauts}>
                <UnitAlarmes alarmes={props?.equipement?.items} type="Alarme" iconsSize={15} />
            </CardContent>
            <Box className={classes.time}>
                {heureMarche ? heureMarche : "00"} : {minuteMarche ? minuteMarche : "00"} min
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={classes.communiquant}>
                    <Box className={classes.header}>
                        <img
                            width="120"
                            height="120"

                            className={classes.Reg}
                            src={regIcon}
                            alt="reg"
                        />
                        <Typography className={classes.regulateurName}>{props?.equipement?.name}</Typography>
                    </Box>
                    <Box className={classes.extraData}>
                        <Box className={classes.extraDataStates}>
                            <Box className={classes.Analogs}>
                                <Box><Typography className={classes.AnalogTitle}>Valeurs analogiques</Typography></Box>
                                <Box className={classes.Analog}><Typography className={classes.Text}> Courant de sortie:</Typography>
                                    <Typography className={classes.Values}>{(analogs?.outputCurrent / 100).toString().replace('.', ',') || "0"} A</Typography></Box>

                                <Box className={classes.Analog}><Typography className={classes.Text}> Tension de sortie:</Typography>
                                    <Typography className={classes.Values}>{analogs?.outputVoltage || "0"} V</Typography></Box>

                                <Box className={classes.Analog}><Typography className={classes.Text}> Tension d'entrée:</Typography>
                                    <Typography className={classes.Values}>{analogs?.inputVoltage || "0"} V </Typography></Box>

                                <Box className={classes.Analog}><Typography className={classes.Text}> Puissance de sortie:</Typography>
                                    <Typography className={classes.Values}>{analogs?.outputPower || "0"} VA</Typography></Box>

                                <Box className={classes.Analog}><Typography className={classes.Text}> Isolement:</Typography>
                                    <Typography className={classes.Values}> {analogs?.insulation || "0"} KO</Typography></Box>

                                <Box className={classes.Analog}><Typography className={classes.Text}> Temps de marche:</Typography>
                                    <Typography className={classes.Values}> {analogs?.time}</Typography>
                                </Box>
                                <Box className={classes.Analog}><Typography className={classes.Text}> Lampes Brulés:</Typography>
                                    <Typography className={analogs?.LFDStatus === 0 ? classes.Values : classes.ValuesRED}> {analogs?.LFDStatus === 65535 ? 'Non calibré' : analogs?.LFDStatus}</Typography>
                                </Box>
                            </Box>
                            <Box className={classes.CCRStates}>
                                <Typography className={classes.CCRStatesTitle}>États du régulateur</Typography>
                                {
                                    props?.equipement?.LevelRealTime ? <Typography className={classes.EquipOn}>ON</Typography> : <Typography className={classes.EquipOff}>OFF</Typography>
                                }

                                <Typography className={manualCheck ? classes.LocalOn : classes.LocalOff}>Local</Typography>
                                <Typography className={manualCheck ? classes.RemoteOff : classes.RemoteOn}>Distance</Typography>
                            </Box>
                        </Box>




                        <Box className={classes.extraDataFaults}>
                            <Typography className={classes.CCRFaults}>Défauts du régulateur</Typography>
                            <Box className={classes.comm}>
                                <Typography className={ccrFaults?.commIp1 ? classes.commIPOn : classes.commIPOff}>COMM IP1</Typography>
                                <Typography className={classes.commBlank}></Typography>
                            </Box>
                            <Typography className={ccrFaults?.modeTel ? classes.faultsOn : classes.faultsOff}>Mode local</Typography>
                            <Typography className={ccrFaults?.earthFault ? classes.faultsOn : classes.faultsOff}>Défaut de terre</Typography>
                            <Typography className={ccrFaults?.regulationFault ? classes.faultsOn : classes.faultsOff}>Défaut de régulation</Typography>
                            <Typography className={ccrFaults?.openCircuit ? classes.faultsOn : classes.faultsOff}>Circuit ouvert</Typography>
                            <Typography className={ccrFaults?.overCurrent ? classes.faultsOn : classes.faultsOff}>Surintensité</Typography>
                            <Typography className={ccrFaults?.currentFault ? classes.faultsOn : classes.faultsOff}>Défaut de courant</Typography>
                            <Typography className={ccrFaults?.phaseFault ? classes.faultsOn : classes.faultsOff}>Défaut de phase</Typography>
                            <Box className={classes.flt}>
                                DEF LAMPES
                                <Typography className={ccrFaults?.lampFlt?.lvl1 ? classes.fltLVLOn : classes.fltLVLOff}>NIV1</Typography>
                                <Typography className={ccrFaults?.lampFlt?.lvl2 ? classes.fltLVLOn : classes.fltLVLOff}>NIV2</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </Card>
    )
}
