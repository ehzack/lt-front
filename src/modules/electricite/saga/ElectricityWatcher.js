import { takeLatest } from "redux-saga/effects";
import * as ActionsTypes from "../../../common/state/StatesConstants";
import { AlarmeGeneratorSaga, electricitySaga, gasolineSaga, normaleSourceSaga } from "./ElectricitySaga";

// watcher for sagas concerned with matrix's manipulation
export default function*ELelctricityWatchar() {
  yield takeLatest(ActionsTypes.ALARME_GENERATOR_START,AlarmeGeneratorSaga);
  yield takeLatest(ActionsTypes.GASOLINE_API_START,gasolineSaga);
  yield takeLatest(ActionsTypes.NORMALE_SOURCE_START, normaleSourceSaga);
  yield takeLatest(ActionsTypes.ELECTRICITY_START, electricitySaga);
}
