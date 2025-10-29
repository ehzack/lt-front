import { updateObject } from "../../../common/utils/UpdateObjectUtility";
import * as ActionsTypes from "../../../common/state/StatesConstants";

const initialState = {
  token: null,
  error: null,
  isLoading: false,
};

const AuthStart = (state, action) => {
  return updateObject(state, {
    token: null,
    error: null,
    isLoading: true,
  });
};

const AuthSuccess = (state, action) => {
  return updateObject(state, {
    token: action.response.data.accessToken,
    isLoading: false,
    error: null,
  });
};

const AuthFail = (state, action) => {
  return updateObject(state, {
    token: null,
    isLoading: false,
    error:action.error.response.data.message,
  });
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionsTypes.AUTH_START:
      return AuthStart(state, action);
    case ActionsTypes.AUTH_SUCCESS:
      return AuthSuccess(state, action);
    case ActionsTypes.AUTH_FAIL:
      return AuthFail(state, action);
    default:
      return state;
  }
};

export default AuthReducer;
