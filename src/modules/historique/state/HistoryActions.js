import * as ActionsTypes from "../../../common/state/StatesConstants";


// actions for Histories starting load, success and fail 
export const HistoryStart = (request) => ({
    type: ActionsTypes.HISTORY_START,
    request
});
export const HistorySuccess = (response) => ({
    type: ActionsTypes.HISTORY_SUCCESS,
    response,
});
export const HistoryFail = (error) => ({
    type: ActionsTypes.HISTORY_FAIL,
    error,
});