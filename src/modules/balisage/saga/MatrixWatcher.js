import { takeLatest } from "redux-saga/effects";
import * as ActionsTypes from "../../../common/state/StatesConstants";
import { macroSaga, matrixAddSaga, matrixDeleteSaga, matrixSaga, matrixUpdateSaga } from "./matrixSaga";

// watcher for sagas concerned with matrix's manipulation
export default function*MatrixWatchar() {
  yield takeLatest(ActionsTypes.MATRIX_START,matrixSaga);
  yield takeLatest(ActionsTypes.MACRO_START,macroSaga);
  yield takeLatest(ActionsTypes.MATRIX_ADD_START, matrixAddSaga);
  yield takeLatest(ActionsTypes.MATRIX_UPDATE_START, matrixUpdateSaga);
  yield takeLatest(ActionsTypes.MATRIX_DELETE_START, matrixDeleteSaga);
}
