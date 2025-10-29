import * as ActionsTypes from "../../../common/state/StatesConstants";


// actions for updating authorization for supervisor and maintenance
export const authorizationStart = (request) => ({
  type: ActionsTypes.AUTHORIZATION_START,
  request,
});
export const authorizationSuccess = (response) => ({
  type: ActionsTypes.AUTHORIZATION_SUCCESS,
  response,
});
export const authorizationFail = (error) => ({
  type: ActionsTypes.AUTHORIZATION_FAIL,
  error,
});

// actions for assigning the new authorization status for supervisor and maintenance
export const updateToken = (request) => ({
  type: ActionsTypes.UPDATE_TOKEN,
  request
});

