import { updateObject } from "../../../common/utils/UpdateObjectUtility";
import * as ActionsTypes from "../../../common/state/StatesConstants";

const initialState = {
  error: null,
  isLoading: false,
};

// reducers for updating authorization for supervisor and maintenance
const authorizationStart = (state, action) => {
  return updateObject(state, {
    error: null,
    isLoading: true,
  });
};

const authorizationSuccess = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    error: null,
  });
};

const authorizationFail = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    error: action.error.response?.data?.message,
  });
};

//  reducer responsible for assigning the new token that has the new authorization status
const updateToken = (state, action) => {
  // localStorage.setItem("token", action.request.revokedToken.accessToken);
  sessionStorage.setItem("token", action.request.revokedToken.accessToken);
  return updateObject(state, {
    isLoading: false,
    error: null,
  });
}

const AuthorizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionsTypes.AUTHORIZATION_START:
      return authorizationStart(state, action);
    case ActionsTypes.AUTHORIZATION_SUCCESS:
      return authorizationSuccess(state, action);
    case ActionsTypes.AUTHORIZATION_FAIL:
      return authorizationFail(state, action);
    case ActionsTypes.UPDATE_TOKEN:
      return updateToken(state, action);
    default:
      return state;
  }
};

export default AuthorizationReducer;
