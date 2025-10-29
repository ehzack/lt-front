import React from 'react'
import { Box, Divider, Typography } from '@mui/material'
import { useStyles } from "../Style/NormaleStyle"
import UnitAlarmes from '../../../common/components/UnitAlarmes'
import { useSelector } from "react-redux";
import SNIcon2D from "../../../assets/images/electriciteFrames/SN Icon 2D.png"



function Normale() {
  const classes = useStyles();
  const normaleSourceState = useSelector(state => state?.Electricity?.normaleSource);
  const sortedNormales = normaleSourceState?.sort((normale1, normale2) => {
    if (normale1.label > normale2.label) return 1;
    if (normale2.label > normale1.label) return -1;
    return 0;
  });
  return (
    <Box className={classes.normale} >
      <Box className={classes.title}>
        <Typography className={classes.font}>Transformateur BT/MT</Typography>
        <img src={SNIcon2D} alt="ELECIcon" height={70} />
      </Box>
      <Box className={classes.divider}>
        <Divider orientation="vertical" style={{ borderRightWidth: 4, borderColor: "black" }} />
        <Box className={classes.alarmes}>
          <UnitAlarmes alarmes={sortedNormales} type="Alarme" iconsSize={25} />
        </Box>
      </Box>
    </Box>
  )
}

export default Normale