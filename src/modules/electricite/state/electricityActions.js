import * as ActionsTypes from "../../../common/state/StatesConstants";



// actions for loading alarmes
export const alarmeGeneratorStart = (request) => ({
    type: ActionsTypes.ALARME_GENERATOR_START,
    request,
  });
  export const alarmeGeneratorSuccess = (response) => ({
    type: ActionsTypes.ALARME_GENERATOR_SUCCESS,
    response,
  });
  export const alarmeGeneratorFail = (error) => ({
    type: ActionsTypes.ALARME_GENERATOR_FAIL,
    error,
  });

// actions for loading gasoline current statue
export const gasolineStart = (request) => ({
    type: ActionsTypes.GASOLINE_API_START,
    request,
  });
  export const gasolineSuccess = (response) => ({
    type: ActionsTypes.GASOLINE_API_SUCCESS,
    response,
  });
  export const gasolineFail = (error) => ({
    type: ActionsTypes.GASOLINE_API_FAIL,
    error,
  });

// actions for loading source normale
export const normaleSourceStart = (request) => ({
    type: ActionsTypes.NORMALE_SOURCE_START,
    request,
  });
  export const normaleSourceSuccess = (response) => ({
    type: ActionsTypes.NORMALE_SOURCE_SUCCESS,
    response,
  });
  export const normaleSourceFail = (error) => ({
    type: ActionsTypes.NORMALE_SOURCE_FAIL,
    error,
  });

// actions for loading electricity
export const electricityStart = (request) => ({
    type: ActionsTypes.ELECTRICITY_START,
    request,
  });
  export const electricitySuccess = (response) => ({
    type: ActionsTypes.ELECTRICITY_SUCCESS,
    response,
  });
  export const electricityFail = (error) => ({
    type: ActionsTypes.ELECTRICITY_FAIL,
    error,
  });

  
    // actions responsible for updating electricity state from web socket received data
    export const getElecUpdate = (request) => ({
      type: ActionsTypes.UPDATE_ELEC_STATUS,
      request
    })


  // actions responsible for updating gasoline state from web socket received data
export const getGasolineUpdate = (request) => ({
  type: ActionsTypes.UPDATE_GASOLINE_STATUS,
  request
})


    // actions responsible for updating alarmes state from web socket received data
export const getAlarmesUpdate = (request) => ({
  type: ActionsTypes.UPDATE_ALARMES_STATUS,
  request
})


  // actions responsible for updating normale source state from web socket received data
  export const getNormaleSourceUpdate = (request) => ({
    type: ActionsTypes.UPDATE_NORMALE_SOURCE_STATUS,
    request
  })
