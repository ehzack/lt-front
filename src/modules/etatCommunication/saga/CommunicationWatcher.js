import { takeLatest } from "redux-saga/effects";
import * as ActionsTypes from "../../../common/state/StatesConstants";
import { communicationSaga } from "./communicationSaga";

// watcher for sagas concerned with matrix's manipulation
export default function* CommunicationWatchar() {
    yield takeLatest(ActionsTypes.COMMUNICATION_START, communicationSaga);
}
