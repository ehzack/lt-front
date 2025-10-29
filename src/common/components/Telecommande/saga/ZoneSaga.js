import { put, call } from "redux-saga/effects";
import * as actions from "../state/ZoneActions";
import { ApiZones, SwitchApi, LuminosityApi } from "../../../services/TelecommandeApis";

// saga responsible for loading zones 
export function* ZoneSaga(action) {
  const request = action.request;
  try {
    const response = yield call(ApiZones, request.payload);
    if (request) {
      yield put(actions.ZoneSuccess(response));
      yield call(request.successCallBack, response);
    }
  } catch (error) {
    yield put(actions.ZoneFail(error));
    yield call(request.failCallBack, error);
  }
}

// saga responsible for switch states OFF/ON
export function* SwitchSaga(action) {
  const request = action.request;
  try {
    const response = yield call(SwitchApi, request.payload);
    if (request) {
      yield put(actions.SwitchSuccess(response));
      yield call(request.successCallBack, response);
    }
  } catch (error) {
    yield put(actions.SwitchFail(error));
    yield call(request.failCallBack, error);
  }
}

// saga responsible for luminosity controll
export function* LuminositySaga(action) {
  const request = action.request;
  try {
    const response = yield call(LuminosityApi, request.payload);
    if (request) {
      yield put(actions.LuminositySuccess(response));
      yield call(request.successCallBack, response);
    }
  } catch (error) {
    yield put(actions.LuminosityFail(error));
    yield call(request.failCallBack, error);
  }
}