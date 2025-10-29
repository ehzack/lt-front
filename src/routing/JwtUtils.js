import jwt from "jsonwebtoken";
class JwtUtils {

  getEmail() {
    return jwt.decode(sessionStorage.getItem("token")).sub;
  }

  isActif() {

    if (sessionStorage.getItem("token")) {
      return jwt.decode(sessionStorage.getItem("token"))?.exp > (new Date().getTime() + 1) / 1000;

    }

    return false;
  }

  hasRole(roles) {
    if (!sessionStorage.getItem("token")) {
      return false;
    }
    let role = jwt.decode(sessionStorage.getItem("token"))?.role;
    if (role) {
      for (let roleIndex in roles) {
        if (role === roles[roleIndex]) {
          return true;
        }
      }
    }
    return false;
  }

  authorizedConfirmation(role) {
    return (this.hasRole(role) && jwt.decode(sessionStorage.getItem("token"))?.authorized)
  }

  hasRoleConfirmation() {
    return sessionStorage.getItem("token");
  }

  hasThisRole(role) {
    return jwt.decode(sessionStorage.getItem("token"))?.role === role;
  }

  hasAnyRole(rolesIn) {
    if (rolesIn.length === 0) {
      return true;
    }
    if (this.hasRole(rolesIn)) {
      return true;
    }
    return false;
  }

  logOutWithoutRefresh() {
    sessionStorage.getItem("token")&& sessionStorage.removeItem("token");
  }

  logOut() {
    if (sessionStorage.getItem("token")) {
      sessionStorage.removeItem("token");
      window.location.reload();
    }
  }
}

var jwtUtils = new JwtUtils()
export default jwtUtils;
