import { put, call } from "redux-saga/effects";
import { CommunicationApi } from "../../../common/services/CommunicationApis";
import * as actions from "../state/communicationActions";

// saga responsible for loading matrix
export function* communicationSaga(action) {
    const request = action.request;
    try {
        const response = yield call(CommunicationApi, request.payload);
        if (request) {
            yield put(actions.communicationSuccess(response));
            yield call(request.successCallBack, response);
        }
    } catch (error) {
        yield put(actions.communicationFail(error));
        yield call(request.failCallBack, error);
    }
}
