import { put, call } from "redux-saga/effects";
import { macroApi, matrixAddApi, MatrixApi, matrixDeleteApi, matrixUpdateApi } from "../../../common/services/MatrixService";
import * as actions from "../state/matrixActions";

// saga responsible for loading matrix
export function * matrixSaga(action) {
  const request = action.request;
  try {
    const response = yield call(MatrixApi, request.payload);
    if (request) {
      yield put(actions.matrixSuccess(response));
      yield call(request.successCallBack, response);
    }
  } catch (error) {
    yield put(actions.matrixFail(error));
    yield call(request.failCallBack, error);
  }
}


// saga responsible for commanding macro
export function* macroSaga(action) {
  const request = action.request;
  try {
    const response = yield call(macroApi, request.payload);
    if (request) {
      yield put(actions.macroSuccess(response));
      yield call(request.successCallBack, response);
    }
  } catch (error) {
    yield put(actions.macroFail(error));
    yield call(request.failCallBack, error);
  }
}

// saga responsible for adding a matrix(standard)
export function * matrixAddSaga(action) {
  const request = action.request;
  try {
    const response = yield call(matrixAddApi, request.payload);
    if (request) {
      yield put(actions.matrixAddSuccess(response));
      yield call(request.successCallBack, response);
    }
  } catch (error) {
    yield put(actions.matrixAddFail(error));
    yield call(request.failCallBack, error);
  }
}

// saga responsible for updating a matrix(standard)
export function * matrixUpdateSaga(action) {
  const request = action.request;
  try {
    const response = yield call(matrixUpdateApi, request.payload);
    if (request) {
      yield put(actions.matrixUpdateSuccess(response));
      yield call(request.successCallBack, response);
    }
  } catch (error) {
    yield put(actions.matrixUpdateFail(error));
    yield call(request.failCallBack, error);
  }
}


// saga responsible for deleting a matrix(standard)
export function * matrixDeleteSaga(action) {
  const request = action.request;
  try {
    const response = yield call(matrixDeleteApi, request.payload);
    if (request) {
      yield put(actions.matrixDeleteSuccess(response));
      yield call(request.successCallBack, response);
    }
  } catch (error) {
    yield put(actions.matrixDeleteFail(error));
    yield call(request.failCallBack, error);
  }
}





