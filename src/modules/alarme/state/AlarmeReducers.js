import { updateObject } from "../../../common/utils/UpdateObjectUtility";
import * as ActionsTypes from "../../../common/state/StatesConstants";

// default state in case state is not provided
const initialState = {
    alarmes: [],
    error: null,
    isLoading: false,
};

// reducers responsibe for applying actions concerned with loading histories state
const AlarmeStart = (state) => {
    return updateObject(state, {
        alarmes: [],
        error: null,
        isLoading: true,
    });
};

const AlarmeSuccess = (state, action) => {
    return updateObject(state, {
        alarmes: action.response.data,
        isLoading: false,
        error: null,
    });
};

const AlarmeFail = (state, action) => {
    return updateObject(state, {
        isLoading: false,
        error: action.error.response?.data?.message,
    });
};

// reducers responsibe for applying actions concerned with loading histories state
const AcquittementStart = (state) => {
    return updateObject(state, {
        error: null,
        isLoading: true,
    });
};

const AcquittementSuccess = (state, action) => {
    return updateObject(state, {
        isLoading: false,
        error: null,
    });
};

const AcquittementFail = (state, action) => {
    return updateObject(state, {
        isLoading: false,
        error: action.error.response.data.message,
    });
};

const getAcquittementUpdate = (state, action) => {
    return updateObject(state, {
        alarmes: state.alarmes.map(
            (alarme) => {
                return { ...alarme, acquittement: true }
            }
        ),
        isLoading: false,
        error: null,
    });
};





// reducers responsibe for applying actions concerned with loading histories state
const DeconnecterStart = (state) => {
    return updateObject(state, {
        error: null,
        isLoading: true,
    });
};

const DeconnecterSuccess = (state, action) => {
    return updateObject(state, {
        isLoading: false,
        error: null,
    });
};

const DeconnecterFail = (state, action) => {
    return updateObject(state, {
        isLoading: false,
        error: action.error.response.data.message,
    });
};






// reducers responsibe for applying actions concerned with updating alarmes state deponding on received data from web socket
const getAlarmesUpdate = (state, action) => {
    return updateObject(state, {
        alarmes: [...state.alarmes, action.request]
    });
}


const getAlarmesRemoved = (state, action) => {
    return updateObject(state, {
        alarmes: state.alarmes.map(
            (alarme) =>
                alarme?.id === action?.request?.id ?
                    action?.request
                    : alarme
        )
    });
}












const AlarmeReducer = (state = initialState, action) => {
    switch (action.type) {

        case ActionsTypes.ALARME_START:
            return AlarmeStart(state);
        case ActionsTypes.ALARME_SUCCESS:
            return AlarmeSuccess(state, action);
        case ActionsTypes.ALARME_FAIL:
            return AlarmeFail(state, action);
        case ActionsTypes.GET_ALARMES_UPDATE:
            return getAlarmesUpdate(state, action);
        case ActionsTypes.GET_ALARMES_REMOVED:
            return getAlarmesRemoved(state, action);
        case ActionsTypes.ACQUITTEMENT_START:
            return AcquittementStart(state);
        case ActionsTypes.ACQUITTEMENT_SUCCESS:
            return AcquittementSuccess(state, action);
        case ActionsTypes.ACQUITTEMENT_FAIL:
            return AcquittementFail(state, action);

        case ActionsTypes.GET_ACQUITEMENT_UPDATE:
            return getAcquittementUpdate(state, action);

        case ActionsTypes.Deconnecter_START:
            return DeconnecterStart(state);
        case ActionsTypes.Deconnecter_SUCCESS:
            return DeconnecterSuccess(state, action);
        case ActionsTypes.Deconnecter_FAIL:
            return DeconnecterFail(state, action);


        default:
            return state;
    }
};

export default AlarmeReducer;
