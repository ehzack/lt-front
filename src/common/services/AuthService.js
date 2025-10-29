// login api

import { instance } from "../Axios";

export const AuthApi = (payload) => {
  return instance
    .post("/auth/login", payload)
    .then((response) => {
      return response;
    })
};