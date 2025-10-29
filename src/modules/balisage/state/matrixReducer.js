import { updateObject } from "../../../common/utils/UpdateObjectUtility";
import * as ActionsTypes from "../../../common/state/StatesConstants";

const initialState = {
    matrix: null,
    error: null,
    isLoading: false,
};


// redcers for loading matrix
const matrixStart = (state, action) => {
    return updateObject(state, {
        error: null,
        isLoading: true,
    });
};

const matrixSuccess = (state, action) => {
    return updateObject(state, {
        matrix: action.response.data,
        isLoading: false,
        error: null,
    });
};

const matrixFail = (state, action) => {
    return updateObject(state, {
        isLoading: false,
        error: action.error.response?.data?.message,
    });
};

// reducers for commanding a macro
const macroStart = (state, action) => {
    return updateObject(state, {
        error: null,
        isLoading: true,
    });
};

const macroSuccess = (state, action) => {
    return updateObject(state, {
        isLoading: false,
        error: null,
    });
};

const macroFail = (state, action) => {
    return updateObject(state, {
        isLoading: false,
        error: action.error.response?.data?.message,
    });
};


// reducers for adding a new standard
const matrixAddStart = (state, action) => {
    return updateObject(state, {
        error: null,
        isLoading: true,
    });
};

const matrixAddSuccess = (state, action) => {
    return updateObject(state, {
        matrix: [...state.matrix, action.response.data],
        isLoading: false,
        error: null,
    });
};

const matrixAddFail = (state, action) => {
    return updateObject(state, {
        isLoading: false,
        error: action.error.response?.data?.message,
    });
};


// reducers for a updating a standard
const matrixUpdateStart = (state, action) => {
    return updateObject(state, {
        error: null,
        isLoading: true,
    });
};

const matrixUpdateSuccess = (state, action) => {
    return updateObject(state, {
        matrix: state.matrix.map(
            (matrix) => {
                return matrix.id === action.response.data.id ?
                    action.response.data
                    : matrix
            }
        ),
        isLoading: false,
        error: null,
    });
};

const matrixUpdateFail = (state, action) => {
    return updateObject(state, {
        isLoading: false,
        error: action.error.response?.data?.message,
    });
};



// reducers for deleting a matrix
const matrixDeleteStart = (state, action) => {
    return updateObject(state, {
        error: null,
        isLoading: true,
    });
};

const matrixDeleteSuccess = (state, action) => {
    return updateObject(state, {
        matrix: state.matrix.filter((matrix) => { return matrix.id !== action.response.data.matrixId }),
        isLoading: false,
        error: null,
    });
};

const matrixDeleteFail = (state, action) => {
    return updateObject(state, {
        isLoading: false,
        error: action.error.response?.data?.message,
    });
};


const MatrixReducer = (state = initialState, action) => {
    switch (action.type) {


        case ActionsTypes.MATRIX_START:
            return matrixStart(state, action);
        case ActionsTypes.MATRIX_SUCCESS:
            return matrixSuccess(state, action);
        case ActionsTypes.MATRIX_FAIL:
            return matrixFail(state, action);


        case ActionsTypes.MACRO_START:
            return macroStart(state, action)
        case ActionsTypes.MACRO_SUCCESS:
            return macroSuccess(state, action);
        case ActionsTypes.MACRO_FAIL:
            return macroFail(state, action);

        case ActionsTypes.MATRIX_ADD_START:
            return matrixAddStart(state, action);
        case ActionsTypes.MATRIX_ADD_SUCCESS:
            return matrixAddSuccess(state, action);
        case ActionsTypes.MATRIX_ADD_FAIL:
            return matrixAddFail(state, action);

        case ActionsTypes.MATRIX_UPDATE_START:
            return matrixUpdateStart(state, action);
        case ActionsTypes.MATRIX_UPDATE_SUCCESS:
            return matrixUpdateSuccess(state, action);
        case ActionsTypes.MATRIX_UPDATE_FAIL:
            return matrixUpdateFail(state, action);

        case ActionsTypes.MATRIX_DELETE_START:
            return matrixDeleteStart(state, action);
        case ActionsTypes.MATRIX_DELETE_SUCCESS:
            return matrixDeleteSuccess(state, action);
        case ActionsTypes.MATRIX_DELETE_FAIL:
            return matrixDeleteFail(state, action);


        default:
            return state;
    }
};


export default MatrixReducer;