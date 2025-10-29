import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    normale: {
        height: "48%",
        borderRadius: "20px",
        width: "100%",
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
    divider: {
        display: "flex",
        flexWrap: 'wrap',
        height: "60%",
        flexDirection: "column",
        width: "50%",
        marginLeft:"5%",
        justifyContent: "flex-start",
        alignContent: "flex-start"
    },
    alarmes: {
        display: "flex",
        flexWrap: 'wrap',
        height: "60%",
        flexDirection: "column",
        width: "70%",
        paddingLeft:"20px",
        justifyContent: "flex-start",
        alignContent: "flex-start"
    },
});
