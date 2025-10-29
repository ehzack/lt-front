import * as ActionsTypes from "../../../common/state/StatesConstants";



// actions for loading matrix
export const matrixStart = (request) => ({
    type: ActionsTypes.MATRIX_START,
    request,
  });
  export const matrixSuccess = (response) => ({
    type: ActionsTypes.MATRIX_SUCCESS,
    response,
  });
  export const matrixFail = (error) => ({
    type: ActionsTypes.MATRIX_FAIL,
    error,
  });


// actions for commanding a macro
  export const macroStart = (request) => ({
    type: ActionsTypes.MACRO_START,
    request,
  });
  export const macroSuccess = (response) => ({
    type: ActionsTypes.MACRO_SUCCESS,
    response,
  });
  export const macroFail = (error) => ({
    type: ActionsTypes.MACRO_FAIL,
    error,
  });

// actions for adding a new standard
  export const matrixAddStart = (request) => ({
    type: ActionsTypes.MATRIX_ADD_START,
    request,
  });
  export const matrixAddSuccess = (response) => ({
    type: ActionsTypes.MATRIX_ADD_SUCCESS,
    response,
  });
  export const matrixAddFail = (error) => ({
    type: ActionsTypes.MATRIX_ADD_FAIL,
    error,
  });
  
  // actions for a updating a standard
  export const matrixUpdateStart = (request) => ({
    type: ActionsTypes.MATRIX_UPDATE_START,
    request,
  });
  export const matrixUpdateSuccess = (response) => ({
    type: ActionsTypes.MATRIX_UPDATE_SUCCESS,
    response,
  });
  export const matrixUpdateFail = (error) => ({
    type: ActionsTypes.MATRIX_UPDATE_FAIL,
    error,
  });
  
// actions for deleting a matrix
  export const matrixDeleteStart = (request) => ({
    type: ActionsTypes.MATRIX_DELETE_START,
    request,
  });
  export const matrixDeleteSuccess = (response) => ({
    type: ActionsTypes.MATRIX_DELETE_SUCCESS,
    response,
  });
  export const matrixDeleteFail = (error) => ({
    type: ActionsTypes.MATRIX_DELETE_FAIL,
    error,
  });
  
  
  