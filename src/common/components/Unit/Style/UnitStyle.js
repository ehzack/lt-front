import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    unit: {
        fontSize: "14px",
        fontWeight:"500",
        height: "60px",
        width: "100px",
        color: "black",
        overflow: "hidden",
        borderRadius: "10px",
        border: "solid 2px black",
        textAlign: "center",
        boxSizing: "border-box"
    },
    unitName: {
        backgroundColor: "white",
        width: "100%",
        height: "18px",
    },
    unitAddresConnected: {
        backgroundColor: "#30F027",
        width: "100%",
        height: "19px",
    },
    unitAddresDisConnected: {
        backgroundColor: "#FF0000",
        color: "white",
        width: "100%",
        height: "19px",
    },
    unitAddresDisactivated: {
        backgroundColor: "#222",
        width: "100%",
        height: "19px",
    }
});

