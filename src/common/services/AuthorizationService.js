import { instance } from "../Axios";

// api concerned with switching authorization between supervisor and maintenance
export const AuthorizationApi = (payload) => {
  return instance
    .patch("/authorize", payload)
    .then((response) => {
      return response;
    })
};