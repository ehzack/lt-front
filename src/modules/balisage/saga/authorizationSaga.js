import { put, call } from "redux-saga/effects";
import { AuthorizationApi } from "../../../common/services/AuthorizationService";
import * as actions from "../state/authorizationActions";


// saga responsible for switching authorization between supervisor and maintenance 
export function * authorizationSaga(action) {
  const request = action.request;
  try {
    const response = yield call(AuthorizationApi, request.payload);
    if (request) {
      yield put(actions.authorizationSuccess(response));
      yield call(request.successCallBack, response);
    }
  } catch (error) {
    yield put(actions.authorizationFail(error));
    yield call(request.failCallBack, error);
  }
}
