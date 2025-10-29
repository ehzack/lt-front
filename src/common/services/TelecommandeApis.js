import { instance } from "../Axios";

// loading zones api
export const ApiZones = () => {
    return instance
        .get("/zone")
        .then((response) => {
            return response;
        })
};

// switching OFF/ON api
export const SwitchApi = (payload) => {
    return instance
        .patch(
            "/zone/"+payload.id,payload)
        .then((response) => {
            return response;
        })
};

// levelDown/levelUp api
export const LuminosityApi = (payload) => {
    return instance
        .patch(
            "/zone/"+payload.id,payload)
        .then((response) => {
            return response;
        })
};