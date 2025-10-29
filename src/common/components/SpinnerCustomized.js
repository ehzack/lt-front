import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function SpinnerCustomized() {
  return (
    <Backdrop
      sx={{
        color: "#232A56",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default SpinnerCustomized;
