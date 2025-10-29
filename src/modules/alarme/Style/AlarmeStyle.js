import { makeStyles } from "@mui/styles";
import { Erreur0_Acquitté0, Erreur1_Acquitté0, Erreur1_Acquitté1 } from "../../../ParamametrageDuCouleur";

export const useStyles = makeStyles({
  map: {
    paddingTop: 75,
    backgroundRepeat: "no-repeat",
    backgroundColor: "#000d20",
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    width: "100%",
    height: "100%",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "flex-end"

  },
  BoxGrid: {
    height: 500,
    justifyContent: "center",
    alignItems: "center",
    margin: "5rem 0 1rem 0",
    padding: "1rem 1rem",
  },

  DataGrid: {
    color: "white",
    width: "100%",
    ///Pour Changer la valeur de la Couleur:

    ////////summary
    //////Défaut_résolu
    "& .super-app-theme--acquitté": {
      color: Erreur1_Acquitté1,
      fontWeight: "bold",
      // animationName: '$blinker',
      // animationDuration: '1s',
      // animationTimingFunction:  "steps(2, start)",
      // animationIterationCount: 'infinite',
    },
    "& .super-app-theme--solved-non-acquitté": {
      color: Erreur0_Acquitté0,
      fontWeight: "bold",
      // animationName: '$blinker',
      // animationDuration: '1s',
      // animationTimingFunction:  "steps(2, start)",
      // animationIterationCount: 'infinite',
    },
    "@global": {
      "@keyframes blinker": {
        //   from: { opacity: 1 },
        to: { visibility: "hidden" },
      },
    },

    //////Alarme
    "& .super-app-theme--false": {
      color: Erreur1_Acquitté0,
      fontWeight: "bold",
      animationName: "$blinker",
      animationDuration: "1000ms",
      animationTimingFunction: "steps(2, start)",
      animationIterationCount: "infinite",
    },

    ///////////////
    "& .MuiDataGrid-iconSeparator": {
      display: "none  !important",
      fontWeight: "bold",
    },
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: "#272827",
      color: "white",
      fontSize: 14,
      fontWeight: "bold",
    },
    "& .MuiTablePagination-displayedRows": {
      color: "white",
    },
    "& .MuiDataGrid-cell": {
      border: "none",
    },
    "& .MuiButtonBase-root": {
      color: "white !important",
    },
    ".MuiDataGrid-root .MuiDataGrid-columnHeaderTitle": {
      fontWeight: "bold",
      overFlow: "visible",
    },
  },
});
