import { Box, Divider } from '@mui/material'
import React from 'react'
import { useStyles } from '../Style/UnitStyle';

function Unit(props) {




    const classes = useStyles();

    return (
        <Box sx={{ position: "absolute", left: props.PositionX, top: props.PositionY }} className={classes.unit}>
            <Box className={classes.unitName}>
                {props.name}
            </Box>
            <Divider sx={{ backgroundColor: 'black', height: ".5px" }} />
            <Box className={props.connected1 ? classes.unitAddresConnected : classes.unitAddresDisConnected}>
                {props.address1}
            </Box>
            <Divider sx={{ backgroundColor: 'black', height: ".5px" }} />
            <Box className={props.connected2 === undefined ? classes.unitAddresDisactivated : props.connected2 ? classes.unitAddresConnected : classes.unitAddresDisConnected}>
                {props.address2}
            </Box>
        </Box>
    )
}

export default Unit