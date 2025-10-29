import React from "react";
import forbiddenImage from "../assets/images/forbidden.png";
import Button from "@mui/material/Button";
import { withRouter } from "react-router";

function ForbiddenComponent({ history }) {
  const goBackHome = () => {
    history.push("/");
  };
  return (
    <div
      style={{
        paddingTop:100,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <img
        width="50%"
        height="fit-content"
        style={{ selfAlign: "center" }}
        src={forbiddenImage}
        alt="forbidden"
      />
      <Button variant="contained" color="primary" onClick={goBackHome}>
        Go back
      </Button>
    </div>
  );
}
export default withRouter(ForbiddenComponent);
