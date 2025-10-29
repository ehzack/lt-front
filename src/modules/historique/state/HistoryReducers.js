import { updateObject } from "../../../common/utils/UpdateObjectUtility";
import * as ActionsTypes from "../../../common/state/StatesConstants";

// default state in case state is not provided
const initialState = {
    histories: [],
    error: null,
    isLoading: false,
};

// reducers responsibe for applying actions concerned with loading histories state
const HistoryStart = (state) => {
    return updateObject(state, {
        histories: [],
        error: null,
        isLoading: true,
    });
};

const HistorySuccess = (state, action) => {
    return updateObject(state, {
        histories: action.response.data,
        isLoading: false,
        error: null,
    });
};

const HistoryFail = (state, action) => {
    return updateObject(state, {
        isLoading: false,
        error: action.error.response?.data?.message,
    });
};



const HistoryReducer = (state = initialState, action) => {
    switch (action.type) {

        case ActionsTypes.HISTORY_START:
            return HistoryStart(state);
        case ActionsTypes.HISTORY_SUCCESS:
            return HistorySuccess(state, action);
        case ActionsTypes.HISTORY_FAIL:
            return HistoryFail(state, action);

        default:
            return state;
    }
};

export default HistoryReducer;