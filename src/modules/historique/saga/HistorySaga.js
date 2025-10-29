import { put, call } from "redux-saga/effects";
import * as actions from "../state/HistoryActions";
import { HistoryApi } from "../../../common/services/HistoryApis";

// saga responsible for loading histories 
export function* HistorySaga(action) {
  const request = action.request;
  try {
    const response = yield call(HistoryApi, request.payload);
    if(request){
      yield put(actions.HistorySuccess(response));
      yield call(request.successCallBack, response);
    }
  } catch (error) {
    yield put(actions.HistoryFail(error));
    yield call(request.failCallBack, error);
  }
}