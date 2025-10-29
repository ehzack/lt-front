import { instance } from "../Axios";

// loading history api
export const HistoryApi = () => {
    return instance
        .get("/historic")
        .then((response) => {
            return response
        })
};