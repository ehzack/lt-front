import { makeStyles } from "@mui/styles";
import mapImg from "../../../assets/images/map.png";

export const useStyles = makeStyles({
  map: {
    backgroundImage: `url(${mapImg})`,
    backgroundRepeat: " no-repeat",
    backgroundColor: "#fafafa",
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
  alarmeCards: {
    position: "absolute",
    display: "flex",
    alignItems: "flex-end",
    flexWrap: "wrap",
    flexDirection: "column",
    bottom: 1,
    right: 0,
  },
  cards: {
    width: "800px",
    direction: "rtl",
    flexWrap: "wrap-reverse",
    display: "flex",
    alignItems: "flex-start",
    bottom: 1,
    right: 0,
  },
  balisageCards: {
    position: "absolute",
    display: "flex",
    alignItems: "flex-end",
    flexDirection: "row",
    bottom: 1,
    left: 1,
  },
  commande: {
    position: "relative",
    minWidth: 300,
    margin: 0.5,
    backgroundColor: '#D9D9D9',
    textAlign: "center",
    borderRadius: '10px !important'
  },
  authorization: {
    position: "relative",
    minWidth: '180px',
    maxWidth: '180px',
    Height: '150',
    margin: 0.5,
    backgroundColor: '#D9D9D9',
    textAlign: "center",
    borderRadius: '10px !important'
  },
  CardCommandeSlide: {
    backgroundColor: '#404F78',
    padding: '4px !important',
    minWidth: 316,
    borderRadius: 10,
    fontSize: '12px',
    color: 'white',
    cursor: "pointer",
    display: 'flex',
    justifyContent: 'space-around'
  },
  CardContentSlide: {
    backgroundColor: '#404F78',
    padding: '4px !important',
    borderRadius: 10,
    fontSize: '12px',
    color: 'white',
    cursor: "pointer",
    display: 'flex',
    justifyContent: 'space-around'
  },
  commandeCardActions: {
    width: 300,
    display: "flex",
    flexWrap: "wrap",
    overflowY: "auto",
    alignContent: "flex-start",
    '&::-webkit-scrollbar': {
			width: '0em',
      margin: 0,
      padding: 0,
			backgroundColor: 'transparent'
		},
		'&::-webkit-scrollbar-thumb': {
			backgroundColor: 'transparent'
		},
  },
  STD:{
    width: '100%',
    height: "23%",
    display: "flex",
    padding: "8px 8px 8px 0",
		justifyContent: "space-around",
    "&:first-of-type" :{ paddingLeft : "8px"}
  },
  macroBox: {
    width: "50%",
    display: "flex",
    justifyContent: "center"
  },
  macroButton: {
    "&.MuiButton-contained": {
      backgroundColor: '#404F78',
			minWidth: '130px',
			marginLeft: '0px !important'
		},
		"&:disabled": {
			backgroundColor: '#BBB'
		}
  },
  macroButtonOff: {
    "&.MuiButton-contained": {
      backgroundColor: 'red',
			minWidth: '130px',
			marginLeft: '0px !important'
		},
		"&:disabled": {
			backgroundColor: '#BBB'
		}
  },
  confirmationActions: {
    position: "relative",
		justifyContent: "space-around"
  },
  macroButtonOn: {
    "&.MuiButton-contained": {
      backgroundColor: '#41D800',
			minWidth: '130px',
			marginLeft: '0px !important'
		},
		"&:disabled": {
			backgroundColor: '#BBB'
		}
  },
  secondCardActions: {
    display: 'flex',
  },
  ButtonMain: {
    
    "&:disabled": {
			backgroundColor: '#41D800',
      color: "white"
		}
  },
  ButtonSuper: {
    "&:disabled": {
			backgroundColor: '#41D800',
      color: "white"
		}
  }
});
