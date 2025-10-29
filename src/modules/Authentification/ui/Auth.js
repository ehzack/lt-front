import { Box } from "@mui/system";
import React from "react";
import FormAuth from "../components/FormAuth";
import { useStyles } from "../Style/FormAurhStyle";

export default function Auth() {
  
    
  const classes = useStyles();
  return (
    <Box className={classes.Auth}>
      <FormAuth />
    </Box>
  );
}
