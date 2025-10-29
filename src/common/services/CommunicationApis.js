import { instance } from "../Axios";

// loading history api
export const CommunicationApi = () => {
    return instance
        .get("/machines")
        .then((response) => {
            return response
        })
};