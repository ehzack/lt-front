import { instance } from "../Axios";

// loading Alarmes api
export const AlarmeApi = () => {
  return instance
    .get("/alarme-historic")
    .then((response) => {
      return response;
    })
};

export const ThereAlarme = (payload) => {
  return instance
    .patch("/alarme-historic/acquittement", payload)
    .then((response) => {
    })
};



export const Deconnecter = (payload) => {
  return instance
    .patch("/logout/"+payload.id, payload)
    .then((response) => {
    })
};
