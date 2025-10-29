import { makeStyles } from "@mui/styles";


export const useStyles = makeStyles({
  map: {
    paddingTop: 75,
    backgroundRepeat: " no-repeat",
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
    justifyContent: 'center',
    alignItems: 'center',
    margin: '5rem 0 1rem 0',
    padding: '1rem 1rem'
  },

  DataGrid: {
    width: "100%",
    ///Pour Changer la valeur de la Couleur:

    ////////summary
    color: "white",
    //////Défaut_résolu
    "& .super-app-theme--Défaut_résolu": {
      color: "white",
    },
    '@global': {
      '@keyframes blinker': {
        //   from: { opacity: 1 },
        to: { visibility: "hidden" },
      }
    },

    //////Alarme
    "& .super-app-theme--CMD_MOINS": {

    },

    "& .red-date": {
      color: "red"
    },
    //////alarme_acquitté
    "& .super-app-theme--alarme_acquitté": {
      color: "white",
    }
    ///////////////    
    , '& .MuiDataGrid-iconSeparator': {
      display: 'none  !important',
    },
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: "#272827",
      color: "white",
      fontSize: 14,
      fontWeight: 'bold',
    },
    "& .MuiTablePagination-displayedRows": {
      color: "white",
    }
    ,
    "& .MuiButtonBase-root": {
      color: "white !important"
    },
    '& .MuiDataGrid-cell': {
      border: 'none',
    },
    '.MuiDataGrid-root .MuiDataGrid-columnHeaderTitle': {
      fontWeight: 'bold',
      overFlow: 'visible'
    }


  }


})