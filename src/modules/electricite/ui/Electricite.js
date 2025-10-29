import React from 'react'
import { Box } from '@mui/material'
import { useStyles } from "../Style/ElectriciteStyle"
import Normale from "../components/Normale.js"
import Electrogene from "../components/Electrogene.js"
import Synoptique from "../components/Synoptique.js"

function Electricite() {


    const classes = useStyles();





    return (
        <Box className={classes.backGround}>
            <Box className={classes.electricitePage}>
                <Synoptique />
                <Box className={classes.elecrogeneNormale}>
                    <Electrogene />
                    <Normale />
                </Box>
            </Box>
        </Box>
    )
}

export default Electricite