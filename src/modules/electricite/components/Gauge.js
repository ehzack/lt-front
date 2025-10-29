import React from "react";
import 'chart.js/auto'
import { Doughnut } from "react-chartjs-2";
import { Box } from "@mui/material";
import { useStyles } from "../Style/ElectrogeneStyle"
import Arrow from "../../../assets/images/electriciteFrames/Arrow.png"
import gasTankIcon from "../../../assets/images/electriciteFrames/GasTankIcon.png"

const Gauge = (props) => {


    const classes = useStyles();


    const fuelToAngle = -231 + props.fuelValue * 280 / 3000;
    var data = {
        datasets: [
            {
                data: [props.lvl1, props.lvl2, props.max - (props.lvl1 + props.lvl2)],
                backgroundColor: ["red", "orange", "#0D0"],
                hoverBackgroundColor: ["red", "orange", "#0D0"],
                display: true,
                circumference: 280,
                rotation: -140
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                enabled: false
            }
        },
        radius: "100%",
        cutout: "80%",
        elements: {
            arc: {
                borderWidth: 1
            }
        }
    };

    return (
        <Box className={classes.gauge} >
            <Doughnut
                width={350} height={225}
                data={data}
                options={options}
            />
            <Box className={classes.redCircle}></Box>

            <Box className={classes.greenCircle}></Box>
            <Box className={classes.pie}>
                <ul className={classes.angleMarks}>
                    {
                        Array.from({ length: 11 }, (_, index) => (
                            <li key={index} className={classes.angleLi}> <Box className={classes.angleMark} /><Box className={classes.angleValue} style={{ transform: `rotate(calc(140deg - ${index} * 28deg))` }}>{props.max / 10 * index}</Box></li>
                        ))
                    }
                </ul>
                <img
                    src={Arrow}
                    alt="arrow"
                    style={{ rotate: `${fuelToAngle}deg` }}
                    className={classes.arrow}
                />
                <img
                    src={gasTankIcon}
                    alt="icon"
                    className={classes.gasTankIcon}
                />
            </Box>
        </Box>
    );
};

export default Gauge;
