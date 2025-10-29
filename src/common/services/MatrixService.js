import { instance } from "../Axios";

// loading matrix api
export const MatrixApi = () => {
    return instance
        .get("/matrix/active")
        .then((response) => {
            return response
        })
};

// switching OFF/ON macros api
export const macroApi = (payload) => {
    return instance
        .patch(
            "/macro/" + payload.id, { CMD_Adress: payload.adress })
        .then((response) => {
            return response;
        })
};

// adding matrix api
export const matrixAddApi = (payload) => {
    return instance
        .patch(
            "/matrix/" + payload.id, payload)
        .then((response) => {
            return response;
        })
};

// updating matrix api
export const matrixUpdateApi = (payload) => {
    return instance
        .patch(
            "/matrix/" + payload.id, payload)
        .then((response) => {
            return response;
        })
};

// deleting matrix api
export const matrixDeleteApi = (payload) => {
    return instance
        .patch(
            "/matrix/active/" + payload.id, { active: payload.active })
        .then((response) => {
            return response;
        })
};