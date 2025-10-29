import React from 'react'
import { Box } from '@mui/material'
import { useStyles } from "../Style/SynoptiqueStyle"
import { Typography } from '@mui/material'
import { useSelector } from "react-redux";
import ELECIcon from "../../../assets/images/electriciteFrames/ELECIcon.png"
import ELEC from "../../../assets/images/electriciteFrames/ELEC.png"
import Disj_ON from "../../../assets/images/SynoptiqueIcons/Disj_ON.png"
import Disj_OFF from "../../../assets/images/SynoptiqueIcons/Disj_OFF.png"
import GE_ON from "../../../assets/images/SynoptiqueIcons/GE_ON.png"
import GE_OFF from "../../../assets/images/SynoptiqueIcons/GE_OFF.png"
import Interrupteur_ON from "../../../assets/images/SynoptiqueIcons/Interrupteur_ON.png"
import Interrupteur_OFF from "../../../assets/images/SynoptiqueIcons/Interrupteur_OFF.png"
import SN_ON from "../../../assets/images/SynoptiqueIcons/SN_ON.png"
import SN_OFF from "../../../assets/images/SynoptiqueIcons/SN_OFF.png"





const imageMap = {
  "SN": {
    green: SN_ON,
    red: SN_OFF
  },
  "Disjoncteur": {
    green: Disj_ON,
    red: Disj_OFF
  },
  "GE": {
    green: GE_ON,
    red: GE_OFF
  },
  "Interrupteur": {
    green: Interrupteur_ON,
    red: Interrupteur_OFF
  }
};

function Synoptique() {
    const classes = useStyles();
    const electricityState = useSelector(state => state?.Electricity?.electricity);
    return (
          <Box
            className={classes.backgroundBox}
            style={{ backgroundImage: `url(${ELEC}) `, backgroundSize: '100% 100%', position: "relative" }}
          >
            <Box className={classes.title}>
              <Typography className={classes.font}>Synoptique Éléctrique</Typography>
              <img src={ELECIcon} alt="ELECIcon" height={70} />
            </Box>
            
 
            {
  electricityState?.map((item,index) => {
    const { status, type,label, PositionX, PositionY } = item;
    const { green, red } = imageMap[type];
    const image = status ? green : red;
    return (
      <div key={index}>
        <img
          src={image}
          alt={label}
          style={{
            position: "absolute",
            left: PositionX,
            top: PositionY,
          }}
        />
      </div>
    );
  })
}
          </Box>
      );
}

export default Synoptique