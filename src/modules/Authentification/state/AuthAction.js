import * as ActionsTypes from "../../../common/state/StatesConstants";
export const AuthStart = (request) => ({
  type: ActionsTypes.AUTH_START,
  request,
});
export const AuthSuccess = (response) => ({
  type: ActionsTypes.AUTH_SUCCESS,
  response,
});
export const AuthFail = (error) => ({
  type: ActionsTypes.AUTH_FAIL,
  error,
});
