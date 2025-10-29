import { takeLatest } from "redux-saga/effects";
import * as ActionsTypes from "../../../common/state/StatesConstants";
import { AcquittementSaga, AlarmeSaga,DeconnecterSaga } from "./AlarmeSage";


// saga watcher for Alarmes module
export default function* AlarmeWatchar() {
  yield takeLatest(ActionsTypes.ALARME_START,AlarmeSaga);
  yield takeLatest(ActionsTypes.ACQUITTEMENT_START,AcquittementSaga);
  yield takeLatest(ActionsTypes.Deconnecter_START,DeconnecterSaga);
  
}
