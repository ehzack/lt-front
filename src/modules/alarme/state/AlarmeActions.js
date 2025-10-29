import * as ActionsTypes from "../../../common/state/StatesConstants";


// actions for Histories starting load, success and fail 
export const AlarmeStart = (request) => ({
    type: ActionsTypes.ALARME_START,
    request
});
export const AlarmeSuccess = (response) => ({
    type: ActionsTypes.ALARME_SUCCESS,
    response,
});
export const AlarmeFail = (error) => ({
    type: ActionsTypes.ALARME_FAIL,
    error,
});

// actions responsible for updating alarme state from web socket's received data
export const getAlarmesUpdate = (request) => ({
    type: ActionsTypes.GET_ALARMES_UPDATE,
    request
  });

export const getAlarmesRemoved = (request) => ({
    type: ActionsTypes.GET_ALARMES_REMOVED,
    request
})

export const AcquittementStart = (request) => ({
    type: ActionsTypes.ACQUITTEMENT_START,
    request
})

export const AcquittementSuccess = (response) => ({
    type: ActionsTypes.ACQUITTEMENT_SUCCESS,
    response,
});

export const AcquittementFail = (error) => ({
    type: ActionsTypes.ACQUITTEMENT_FAIL,
    error,
});

export const getAcquittementUpdate = (request) => ({
    type: ActionsTypes.GET_ACQUITEMENT_UPDATE,
    request
})





export const DeconnecterStart = (request) => ({
    type: ActionsTypes.Deconnecter_START,
    request
})

export const DeconnecterSuccess = (response) => ({
    type: ActionsTypes.Deconnecter_SUCCESS,
    response,
});

export const DeconnecterFail = (error) => ({
    type: ActionsTypes.Deconnecter_FAIL,
    error,
});
