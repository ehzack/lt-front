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
  zoneCards: {
    position: "absolute",
    display: "flex",
    alignItems: "flex-end",
    bottom: 1,
    left: 0,
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
  matCards: {
    display: "flex",
    alignItems: "flex-end",
  }
});
