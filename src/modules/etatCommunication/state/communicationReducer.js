import { updateObject } from "../../../common/utils/UpdateObjectUtility";
import * as ActionsTypes from "../../../common/state/StatesConstants";

const initialState = {
    communicators: null,
    error: null,
    isLoading: false,
};


// redcers for loading communication
const communicationStart = (state, action) => {
    return updateObject(state, {
        error: null,
        isLoading: true,
    });
};

const communicationSuccess = (state, action) => {
    return updateObject(state, {
        communicators: action.response.data,
        isLoading: false,
        error: null,
    });
};

const communicationFail = (state, action) => {
    return updateObject(state, {
        isLoading: false,
        error: action.error.response?.data?.message,
    });
};

// reducers responsibe for applying actions concerned with updating zones state depending on received data from web socket
const getIpStatusUpdate = (state, action) => {
    return updateObject(state, {
        communicators: state.communicators.map(
            (communicator) =>
                communicator.id === action.request.machineId ?
                    {
                        ...communicator,
                        ipAdress: communicator.ipAdress.map(
                            (ip) =>
                                ip.ipAdress === action.request.ipStatus.ip ?
                                    ({
                                        ...ip,
                                        status: action.request.ipStatus.status
                                    })
                                    : ip
                        )
                    }
                    : communicator
        ),
    })
}



const CommunicationReducer = (state = initialState, action) => {
    switch (action.type) {


        case ActionsTypes.COMMUNICATION_START:
            return communicationStart(state, action);
        case ActionsTypes.COMMUNICATION_SUCCESS:
            return communicationSuccess(state, action);
        case ActionsTypes.COMMUNICATION_FAIL:
            return communicationFail(state, action);



        case ActionsTypes.GET_IP_STATUS_UPDATE:
            return getIpStatusUpdate(state, action);



        default:
            return state;
    }
};



export default CommunicationReducer;