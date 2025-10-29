import { makeStyles } from "@mui/styles";
import { Erreur0_Acquitté0, Erreur1_Acquitté0, Erreur1_Acquitté1 } from "../../../ParamametrageDuCouleur";

export const useStyles = makeStyles({
    table: {
        width: "100%",
        "& th, & .header-cell": {
            backgroundColor: "#262726",
            color: "white",
            height: "20px",
            textAlign: "center",
        },
        "& td, & .data-cell": {
            backgroundColor: "#000d20",
            height: "15",
            textAlign: "center",
        },
        "& .super-app-theme--acquitté": {
            color: Erreur1_Acquitté1,
            fontWeight: "bold",
        },
        "& .super-app-theme--solved-non-acquitté": {
            color: Erreur0_Acquitté0,
        },
        "& .super-app-theme--false": {
            color: Erreur1_Acquitté0,
            fontWeight: "bold",
        },
        "& .MuiTableCell-root": {
            paddingTop: 0,
            paddingBottom: 0,
        },
    },
});
