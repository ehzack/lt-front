import * as ActionsTypes from "../../../common/state/StatesConstants";



// actions for loading communication machines
export const communicationStart = (request) => ({
    type: ActionsTypes.COMMUNICATION_START,
    request,
});
export const communicationSuccess = (response) => ({
    type: ActionsTypes.COMMUNICATION_SUCCESS,
    response,
});
export const communicationFail = (error) => ({
    type: ActionsTypes.COMMUNICATION_FAIL,
    error,
});

// actions responsible for updating ip state from web socket received data
export const getIpStatusUpdate = (request) => ({
    type: ActionsTypes.GET_IP_STATUS_UPDATE,
    request
  })
  
