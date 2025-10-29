import * as ActionsTypes from "../../../state/StatesConstants";


// actions for zones starting load, success and fail 
export const ZoneStart = (request) => ({
  type: ActionsTypes.ZONE_START,
  request
});
export const ZoneSuccess = (response) => ({
  type: ActionsTypes.ZONE_SUCCESS,
  response,
});
export const ZoneFail = (error) => ({
  type: ActionsTypes.ZONE_FAIL,
  error,
});


// actions for switch OFF/ON starting load, success and fail
export const SwitchStart = (request) => ({
  type: ActionsTypes.SWITCH_START,
  request
});
export const SwitchSuccess = (response) => ({
  type: ActionsTypes.SWITCH_SUCCESS,
  response,
});
export const SwitchFail = (error) => ({
  type: ActionsTypes.SWITCH_FAIL,
  error,
});


// actions for luminosity level controll starting load, success and fail
export const LuminosityStart = (request) => ({
  type: ActionsTypes.LUMINOSITY_START,
  request
});
export const LuminositySuccess = (response) => ({
  type: ActionsTypes.LUMINOSITY_SUCCESS,
  response,
});
export const LuminosityFail = (error) => ({
  type: ActionsTypes.LUMINOSITY_FAIL,
  error,
});


// actions responsible for updating zone state from web socket received data
export const getZoneUpdate = (request) => ({
  type: ActionsTypes.GET_ZONE_UPDATE,
  request
})

// actions responsible for updating zone state from web socket received data
export const getDiscoUpdate = (request) => ({
  type: ActionsTypes.GET_DISCO_UPDATE,
  request
})


// actions responsible for updating alarme state from web socket received data
export const getAlarmeUpdate = (request) => ({
  type: ActionsTypes.GET_ALARME_UPDATE,
  request
})

// actions responsible for updating alarme state from web socket received data
export const getExtraUpdate = (request) => ({
  type: ActionsTypes.GET_EXTRA_UPDATE,
  request
})

// actions responsible for updating mode telecommande state from web socket received data
export const getModeTeleUpdate = (request) => ({
  type: ActionsTypes.GET_MODE_TELE_UPDATE,
  request
})

// actions responsible for updating ip state from web socket received data
export const getIpStatusUpdate = (request) => ({
  type: ActionsTypes.GET_IP_STATUS_UPDATE_REG,
  request
})


// actions responsible for updating ip state from web socket received data
export const getMarcheUpdate = (request) => ({
  type: ActionsTypes.GET_MARCHE_UPDATE,
  request
})

