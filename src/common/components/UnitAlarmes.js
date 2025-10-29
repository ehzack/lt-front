import { Box } from '@mui/material'
import React from 'react'
import { makeStyles } from '@mui/styles';
import defautIcon from '../../assets/images/red_light.png';
import workingIcon from '../../assets/images/green_light.png';




const useStyles = makeStyles({
    defauts: {
        fontWeight: '400',
        fontFamily: 'Sans-serif',
        flexDirection: 'columns',
        paddingBottom: '7px',
        display: "flex",
        alignItems: "center"
    },
    defautIcons: {
        paddingRight: '10px'
    },
});

function UnitAlarmes(props) {


    const classes = useStyles();


    return (
        <Box>

            {
                props?.alarmes?.map((item, id) => {
                    if (item.type === "CCRFault" || item?.Label === "DEF_GENERAL") return null;
                    if (item.type === props.type) return <Box className={classes.defauts} key={id}>
                        <img
                            width={props.iconsSize}
                            height={props.iconsSize}
                            className={classes.defautIcons}
                            src={item.ValeurRealTime ? defautIcon : workingIcon}
                            alt="defaut"
                        />
                        {item.Designation}
                    </Box>
                    return <Box className={classes.defauts} key={id}>
                        <img
                            width={props.iconsSize}
                            height={props.iconsSize}
                            className={classes.defautIcons}
                            src={item.status ? defautIcon : workingIcon}
                            alt="defaut"
                        />
                        {item.label}
                    </Box>
                })
            }
        </Box>
    )
}

export default UnitAlarmes
