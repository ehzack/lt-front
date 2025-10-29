import { put, call } from "redux-saga/effects";
import * as actions from "../state/electricityActions";
import { AlarmeGeneratorApi, ElectricityApi, GasolineApi, NormaleSourceApi } from "../../../common/services/ElectricityApis";

// saga responsible for loading matrix
export function* AlarmeGeneratorSaga(action) {
    const request = action.request;
    try {
        const response = yield call(AlarmeGeneratorApi, request.payload);
        if (request) {
            yield put(actions.alarmeGeneratorSuccess(response));
            yield call(request.successCallBack, response);
        }
    } catch (error) {
        yield put(actions.alarmeGeneratorFail(error));
        yield call(request.failCallBack, error);
    }
}


// saga responsible for loading matrix
export function* gasolineSaga(action) {
    const request = action.request;
    try {
        const response = yield call(GasolineApi, request.payload);
        if (request) {
            yield put(actions.gasolineSuccess(response));
            yield call(request.successCallBack, response);
        }
    } catch (error) {
        yield put(actions.gasolineFail(error));
        yield call(request.failCallBack, error);
    }
}

// saga responsible for loading matrix
export function* normaleSourceSaga(action) {
    const request = action.request;
    try {
        const response = yield call(NormaleSourceApi, request.payload);
        if (request) {
            yield put(actions.normaleSourceSuccess(response));
            yield call(request.successCallBack, response);
        }
    } catch (error) {
        yield put(actions.normaleSourceFail(error));
        yield call(request.failCallBack, error);
    }
}


// saga responsible for loading matrix
export function* electricitySaga(action) {
    const request = action.request;
    try {
        const response = yield call(ElectricityApi, request.payload);
        if (request) {
            yield put(actions.electricitySuccess(response));
            yield call(request.successCallBack, response);
        }
    } catch (error) {
        yield put(actions.electricityFail(error));
        yield call(request.failCallBack, error);
    }
}

