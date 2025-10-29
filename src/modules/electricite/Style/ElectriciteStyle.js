import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
    backGround: {
        backgroundRepeat: " no-repeat",
        backgroundColor: "#000d20",
        backgroundSize: "100% 100%",
        width: "100%",
        height: "100%",
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        alignContent: "flex-end",
        paddingTop: "38px"
    },
    electricitePage: {
        height: "85%",
        width: "98%",
        display: "flex",
        justifyContent: "space-around"
    },
    elecrogeneNormale: {
        width: "44%",
        height: "100%",
        display: "flex",
        alignContent: "space-between",
        flexWrap: "wrap",
    }
});
