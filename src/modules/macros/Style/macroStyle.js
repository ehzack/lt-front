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
        flexDirection: "column"
    },
    standards: {
        '&::-webkit-scrollbar': {
            width: '0.4em',
            backgroundColor: 'transparent'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'white',
            borderRadius: "5px",
        },
        width: "1200px",
        overflowY: "auto",
        maxHeight: "84%",
        margin: "70px 0px 0px 0px",
        display: "flex",
        alignContent: "flex-start",
        justifyContent: "space-between",
        flexWrap: "wrap"
    },
    standard: {
        width: "500px",
        height: "600px",
        margin: "5px 45px",
        backgroundColor: "white",
        borderRadius: 5,
    },
    title: {
        fontFamily: "Baskerville",
        height: "10%",
        width: "100%",
        borderRadius: 5,
        backgroundColor: "#BABABA",
        color: "#404F78",
        fontSize: "30px",
        fontWeight: 600,
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        alignContent: "center"
    },
    container: {
        width: "500px",
        height: "90%",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        alignContent: "space-around"
    },
    Button: {
        '&:hover': {
            backgroundColor: '#BABABA',
        },
        backgroundColor: "#404F78",
        color: "#FFF",
        fontWeight: "600",
        height: "30px",
        width: "120px",
        margin: "0px 4px 0px 4px"
    },
    macros: {
        height: "90%",
        width: "90%",
        borderRadius: 5,
        display: "flex",
        justifyContent: "center"
    },
    macro: {
        width: "50%",
        height: "100%",
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "#BABABA"
    },
    macroTitle: {
        fontFamily: "Baskerville",
        height: "10%",
        width: "100%",
        backgroundColor: "#BABABA",
        color: "#404F78",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        alignContent: "center",
        fontSize: "27px",
        fontWeight: 600,
    },
    zone: {
        display: "flex",
        height: "7%",
    },
    fonction: {
        color: "#BABABA",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        alignContent: "center",
        width: "60%",
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "#BABABA"
    },
    brillance: {
        color: "#BABABA",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        alignContent: "center",
        width: "40%",
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "#BABABA"
    },
    buttonBox: {
        marginTop: "5px",
        height: "30px",
        display: "flex",
        flexWrap: "wrap",
        alignContent: "center"
    },
    ButtonAjouter: {
        '&:hover': {
            backgroundColor: '#999',
        },
        backgroundColor: "#404F78",
        color: "#FFF",
        fontWeight: "600",
        height: "30px",
        width: "120px",
        margin: "0px 4px 0px 4px"
    },
    standardForm: {
        width: "500px",
        height: "590px",
        margin: "5px 45px",
        backgroundColor: "white",
        borderRadius: 10,
        border: "solid",
        borderColor: "#BABABA"
    },
    addButtons: {
        display: "flex",
        justifyContent: "center"
    },
    confirmationActions: {
        position: "relative",
        justifyContent: "space-around"
    },
});
