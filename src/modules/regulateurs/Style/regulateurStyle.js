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
        alignContent: "flex-end"
    },
    regulateurs: {
        '&::-webkit-scrollbar': {
            width: '0.4em',
            backgroundColor: 'transparent'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'white',
            borderRadius: "5px",
        },
        position: "absolute",
        display: "flex",
        alignItems: "center",
        width: "80%",
        flexWrap: "wrap",
        justifyContent: "center",
        overflowY: "auto",
        maxHeight: "80%",
        margin: "10px 0px 0px 40px"
    }
});
