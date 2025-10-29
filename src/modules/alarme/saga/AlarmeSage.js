import { put, call } from "redux-saga/effects";
import * as actions from "../state/AlarmeActions";
import { AlarmeApi } from "../../../common/services/AlarmeApis";
import { ThereAlarme ,Deconnecter} from "../../../common/services/AlarmeApis";

// saga responsible for loading histories 
export function* AlarmeSaga(action) {
  const request = action.request;
  try {
    const response = yield call(AlarmeApi, request.payload);
    if(request){
      yield put(actions.AlarmeSuccess(response));
      yield call(request.successCallBack, response);
    }
  } catch (error) {
    yield put(actions.AlarmeFail(error));
    yield call(request.failCallBack, error);
  }
}


export function* AcquittementSaga(action) {
  const request = action.request;
  try {
    const response = yield call(ThereAlarme, request.payload);
    if (request) {
      yield put(actions.AcquittementSuccess(response));
      yield call(request.successCallBack, response);
    }
  } catch (error) {
    yield put(actions.AcquittementFail(error));
    yield call(request.failCallBack, error);
  }
}










export function* DeconnecterSaga(action) {
  const request = action.request;
  try {
    const response = yield call(Deconnecter, request.payload);
    if (request) {
      yield put(actions.AcquittementSuccess(response));
      yield call(request.successCallBack, response);
    }
  } catch (error) {
    yield put(actions.AcquittementFail(error));
    yield call(request.failCallBack, error);
  }
}