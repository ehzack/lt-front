import { takeLatest } from "redux-saga/effects";
import * as ActionsTypes from "../../../common/state/StatesConstants";
import { authorizationSaga } from "./authorizationSaga";

// watcher for authorization saga
export default function*AuthorizationWatchar() {
  yield takeLatest(ActionsTypes.AUTHORIZATION_START,authorizationSaga);
}
