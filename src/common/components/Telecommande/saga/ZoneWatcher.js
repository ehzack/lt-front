import { takeLatest } from "redux-saga/effects";
import * as ActionsTypes from "../../../state/StatesConstants";
import { LuminositySaga, SwitchSaga, ZoneSaga } from "./ZoneSaga";

// saga watcher for eclairage and balisage modules
export default function* ZoneWatchar() {
  yield takeLatest(ActionsTypes.ZONE_START, ZoneSaga);
  yield takeLatest(ActionsTypes.SWITCH_START, SwitchSaga);
  yield takeLatest(ActionsTypes.LUMINOSITY_START, LuminositySaga);
}
