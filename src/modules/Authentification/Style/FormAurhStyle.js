import { makeStyles } from "@mui/styles";
import { display } from "@mui/system";
import mapImg from "../../../assets/images/map.png";

export const useStyles = makeStyles({
  Auth: {
    backgroundImage: `url(${mapImg})`,
    backgroundRepeat: " no-repeat",
    backgroundColor: "#fafafa",
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    width:"100%",
    height:"100%",
    position:"absolute",
    display:"flex",
    alignItems:"center",
    justifyContent:"center"
  },
});
