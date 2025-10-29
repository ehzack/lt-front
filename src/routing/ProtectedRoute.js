import React from "react";
import { Route } from "react-router-dom";
import JwtUtils from "./JwtUtils";
import ForbiddenComponent from "./ForbiddenComponent";
import jwt from "jsonwebtoken";


function ProtectedRoute({ roles, component: Component, ...rest }) {
  return (
    <Route 
    {...rest}
    render={(props) => {
      if (JwtUtils.isActif() && (JwtUtils.hasAnyRole(roles) || jwt.decode(sessionStorage.getItem("token"))?.Is_Super)
      ) {
          return <Component {...props} />;
        } else {
          return <ForbiddenComponent />;
        }
      }}
    />
  );
}

export default ProtectedRoute;
