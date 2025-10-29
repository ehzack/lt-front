import { updateObject } from "../../../common/utils/UpdateObjectUtility";
import * as ActionsTypes from "../../../common/state/StatesConstants";

const initialState = {
    alarmes: null,
    gasoline: null,
    normaleSource: null,
    electricity: null,
    error: null,
    isLoading: false,
};


// redcers for loading matrix
const alarmeGeneratorStart = (state, action) => {
    return updateObject(state, {
        error: null,
        isLoading: true,
    });
};

const alarmeGeneratorSuccess = (state, action) => {
    return updateObject(state, {
        alarmes: action.response.data,
        isLoading: false,
        error: null,
    });
};

const alarmeGeneratorFail = (state, action) => {
    return updateObject(state, {
        isLoading: false,
        error: action.error.response?.data?.message,
    });
};


// redcers for loading matrix
const gasolineStart = (state, action) => {
    return updateObject(state, {
        error: null,
        isLoading: true,
    });
};

const gasolineSuccess = (state, action) => {
    return updateObject(state, {
        gasoline: action.response.data,
        isLoading: false,
        error: null,
    });
};

const gasolineFail = (state, action) => {
    return updateObject(state, {
        isLoading: false,
        error: action.error.response?.data?.message,
    });
};


// redcers for loading matrix
const normaleSourceStart = (state, action) => {
    return updateObject(state, {
        error: null,
        isLoading: true,
    });
};

const normaleSourceSuccess = (state, action) => {
    return updateObject(state, {
        normaleSource: action.response.data,
        isLoading: false,
        error: null,
    });
};

const normaleSourceFail = (state, action) => {
    return updateObject(state, {
        isLoading: false,
        error: action.error.response?.data?.message,
    });
};




// redcers for loading matrix
const electricityStart = (state, action) => {
    return updateObject(state, {
        error: null,
        isLoading: true,
    });
};

const electricitySuccess = (state, action) => {
    return updateObject(state, {
        electricity: action.response.data,
        isLoading: false,
        error: null,
    });
};

const electricityFail = (state, action) => {
    return updateObject(state, {
        isLoading: false,
        error: action.error.response?.data?.message,
    });
};



// reducers responsibe for applying actions concerned with updating electricity's item state depending on received data from web socket
const getElecUpdate = (state, action) => {
    return updateObject(state, {
        electricity: state.electricity.map(
            (item) =>
                item.id === action.request.id ?
                    {
                        ...item,
                        status: action.request.value
                    }
                    : item
        ),
    })
}


// reducers responsibe for applying actions concerned with updating electricity's alarmes state depending on received data from web socket
const getAlarmesUpdate = (state, action) => {
    return updateObject(state, {
        alarmes: state.alarmes.map(
            (item) =>
                item.id === action.request.id ?
                    {
                        ...item,
                        status: action.request.value
                    }
                    : item
        ),
    })
}




// reducers responsibe for applying actions concerned with updating electricity's gasoline state depending on received data from web socket
const getGasolineUpdate = (state, action) => {
    return updateObject(state, {
        gasoline: state.gasoline.map(
            (item) =>
                item.id === action.request.id ?
                    {
                        ...item,
                        ValeurRealTime: action.request.value
                    }
                    : item
        ),
    })
}

// reducers responsibe for applying actions concerned with updating electricity's alarmes state depending on received data from web socket
const getNormaleSourceUpdate = (state, action) => {
    return updateObject(state, {
        normaleSource: state.normaleSource.map(
            (item) =>
                item.id === action.request.id ?
                    {
                        ...item,
                        status: action.request.value
                    }
                    : item
        ),
    })
}






const ElectricityReducer = (state = initialState, action) => {
    switch (action.type) {


        case ActionsTypes.ALARME_GENERATOR_START:
            return alarmeGeneratorStart(state, action);
        case ActionsTypes.ALARME_GENERATOR_SUCCESS:
            return alarmeGeneratorSuccess(state, action);
        case ActionsTypes.ALARME_GENERATOR_FAIL:
            return alarmeGeneratorFail(state, action);


        case ActionsTypes.GASOLINE_API_START:
            return gasolineStart(state, action);
        case ActionsTypes.GASOLINE_API_SUCCESS:
            return gasolineSuccess(state, action);
        case ActionsTypes.GASOLINE_API_FAIL:
            return gasolineFail(state, action);


        case ActionsTypes.NORMALE_SOURCE_START:
            return normaleSourceStart(state, action);
        case ActionsTypes.NORMALE_SOURCE_SUCCESS:
            return normaleSourceSuccess(state, action);
        case ActionsTypes.NORMALE_SOURCE_FAIL:
            return normaleSourceFail(state, action);


        case ActionsTypes.ELECTRICITY_START:
            return electricityStart(state, action);
        case ActionsTypes.ELECTRICITY_SUCCESS:
            return electricitySuccess(state, action);
        case ActionsTypes.ELECTRICITY_FAIL:
            return electricityFail(state, action);


        case ActionsTypes.UPDATE_ELEC_STATUS:
            return getElecUpdate(state, action);


        case ActionsTypes.UPDATE_ALARMES_STATUS:
            return getAlarmesUpdate(state, action);

        case ActionsTypes.UPDATE_GASOLINE_STATUS:
            return getGasolineUpdate(state, action);


        case ActionsTypes.UPDATE_NORMALE_SOURCE_STATUS:
            return getNormaleSourceUpdate(state, action);






        default:
            return state;
    }
};


export default ElectricityReducer;