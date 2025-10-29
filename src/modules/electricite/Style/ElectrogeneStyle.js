import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    electrogene: {
        height: "48%",
        width: "100%",
        borderRadius: "20px",
        backgroundColor: "white",
        boxShadow: "0px -5px 15px 10px #759bd4a8"
    },
    title: {
        width: "98%",
        height: "25%",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-end",
        alignContent: "center"
    },
    font: {
        fontSize: "36px",
        fontFamily: "Bahnschrift Condensed",
        fontWeight: "semi bold",
        display: "flex",
        flexWrap: "wrap",
        alignContent: "center"
    },
    img: {
        backgroundColor: "transparent",
    },
    status: {
        width: "100%",
        height: "70%",
        marginLeft:"5%",
        display: "flex",
    },
    fuel: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        height: "100%",
        width: "75%"
    },
    gauge: {
        width: "270.3px",
        height: "206px",
        position: "relative"
    },
    redCircle: {
        width: "20.8px",
        height: "20.8px",
        backgroundColor: "red",
        borderRadius: "50px",
        transform: 'translate(-50%, -50%)',
        position: "absolute",
        left: "25.7%",
        top: "95%"
    },
    greenCircle: {
        width: "20.8px",
        height: "20.8px",
        borderRadius: "50px",
        transform: 'translate(50%, -50%)',
        position: "absolute",
        right: "26.1%",
        top: "95%",
        backgroundColor: "#0D0",
    },
    pie: {
        position: "absolute",
        width: "170px",
        height: "170px",
        borderRadius: "50%",
        left: "50%",
        top: "58.8%",
        transform: 'translate(-50%, -50%)',
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        flexWrap: "wrap"
    },
    angleMarks: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        listStyle: "none",
        paddingInlineStart: "0px",
        "& li:nth-child(1)": {
            transform: "rotate(-140deg)",
        },
        "& li:nth-child(2)": {
            transform: `rotate(calc(28deg - 140deg))`,
        },
        "& li:nth-child(3)": {
            transform: `rotate(calc(2*28deg - 140deg))`,
        },
        "& li:nth-child(4)": {
            transform: `rotate(calc(3*28deg - 140deg))`,
        },
        "& li:nth-child(5)": {
            transform: `rotate(calc(4*28deg - 140deg))`,
        },
        "& li:nth-child(6)": {
            transform: `rotate(calc(5*28deg - 140deg))`,
        },
        "& li:nth-child(7)": {
            transform: `rotate(calc(6*28deg - 140deg))`,
        },
        "& li:nth-child(8)": {
            transform: `rotate(calc(7*28deg - 140deg))`,
        },
        "& li:nth-child(9)": {
            transform: `rotate(calc(8*28deg - 140deg))`,
        },
        "& li:nth-child(10)": {
            transform: `rotate(calc(9*28deg - 140deg))`,
        },
        "& li:nth-child(11)": {
            transform: `rotate(calc(10*28deg - 140deg))`,
        }

    },
    angleLi: {
        position: "absolute",
        height: "100%",
        top: "0px",
    },
    angleMark: {
        backgroundColor: "#9caec4",
        width: "1px",
        height: "6px",
    },
    angleValue: {
        fontSize: "8px",
        position: "absolute"
    },
    arrow: {
        left: "50%",
        top: "50%",
        width: "100px",
        position: "absolute",
        rotate: "0deg",
        transformOrigin: "0px 0px",
        transform: 'translate(-14.5%, -50%)',
    },
    gasTankIcon: {
        position: "absolute",
        bottom: "0px",
        width: "30px",
        height: "30px"
    },
    alarmes: {
        paddingLeft: "20px",
        width: "40%",
        height: "100%",
        display: "flex",
        justifyContent: "flex-start",
        alignContent: "flex-start",
        flexWrap: "wrap"
    }
});
