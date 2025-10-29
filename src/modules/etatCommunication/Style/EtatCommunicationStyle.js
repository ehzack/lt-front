import { makeStyles } from "@mui/styles";
import mapImg from "../../../assets/images/map_etat_de_communication.jpg";

export const useStyles = makeStyles({
  map: {
    backgroundImage: `url(${mapImg})`,
    backgroundRepeat: " no-repeat",
    backgroundColor: "#fafafa",
    backgroundSize: "100% 98%",
    backgroundPosition: "center",
    width: "100%",
    height: "100%",
    position: "absolute",
    top: "10px",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-end",
    alignContent: "flex-end"
  },
});
