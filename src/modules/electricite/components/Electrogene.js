import React from 'react'
import { useSelector } from "react-redux";
import { Box, Divider, Typography } from '@mui/material'
import { useStyles } from "../Style/ElectrogeneStyle"
import electrogenFrame from "../../../assets/images/electriciteFrames/GE Icon 2D.png"
import Gauge from './Gauge'
import UnitAlarmes from '../../../common/components/UnitAlarmes'

function Electrogene() {

    const gasolineState = useSelector(state => state?.Electricity?.gasoline);
    const alarmesState = useSelector(state => state?.Electricity?.alarmes);
    const sortedAlarmes = alarmesState?.sort((alarme1, alarme2) => {
        if (alarme1.label > alarme2.label) return 1;
        if (alarme2.label > alarme1.label) return -1;
        return 0;
    });
    const classes = useStyles();

    return (
        <Box className={classes.electrogene}>
            <Box className={classes.title}>
                <Typography className={classes.font}>Groupe Électrogène</Typography>
                <img className={classes.img} src={electrogenFrame} alt="electrogene" height={70} />
            </Box>
            <Box className={classes.status}>
                <Divider orientation="vertical" style={{ borderRightWidth: 4, borderColor: "black" }} />
                <Box className={classes.alarmes}>
                    <UnitAlarmes alarmes={sortedAlarmes} type="AlarmeGenerated" iconsSize={25} />
                </Box>
                <Box className={classes.fuel}>{
                    gasolineState && <Gauge max={gasolineState[0]?.Level_3} fuelValue={gasolineState[0]?.ValeurRealTime} lvl1={gasolineState[0]?.Level_1} lvl2={gasolineState[0]?.Level_2 - gasolineState[0]?.Level_1} />
                }</Box>

            </Box>
        </Box>
    )
}

export default Electrogene