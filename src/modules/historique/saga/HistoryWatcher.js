import { takeLatest } from "redux-saga/effects";
import * as ActionsTypes from "../../../common/state/StatesConstants";
import { HistorySaga } from "./HistorySaga";

// saga watcher for historique module
export default function*HistoryWatchar() {
  yield takeLatest(ActionsTypes.HISTORY_START,HistorySaga);
}
