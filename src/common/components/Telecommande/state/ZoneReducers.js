import { updateObject } from "../../../utils/UpdateObjectUtility";
import * as ActionsTypes from "../../../state/StatesConstants";

// default state in case state is not provided
const initialState = {
  zones: [],
  error: null,
  isLoading: false,
};

// reducers responsibe for applying actions concerned with loading zones state
const ZoneStart = (state) => {
  return updateObject(state, {
    zones: [],
    error: null,
    isLoading: true,
  });
};

const ZoneSuccess = (state, action) => {
  // Sort the zones data before updating the state
  const sortedZones = action.response.data.slice().sort((zone1, zone2) => {
    if (zone1.LabelZone > zone2.LabelZone) return 1;
    if (zone2.LabelZone > zone1.LabelZone) return -1;
    return 0;
  });
  return updateObject(state, {
    zones: sortedZones,
    isLoading: false,
    error: null,
  });

};

const ZoneFail = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    error: action.error,
  });
};


// reducers responsibe for applying actions concerned with updating zone state OFF/ON options
const SwitchStart = (state) => {
  return updateObject(state, {
    error: null,
    isLoading: true,
  });
};

const SwitchSuccess = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    error: null,
  });
};

const SwitchFail = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    error: action.error.response?.data?.message,
  });
};

// reducers responsibe for applying actions concerned with updatig zone state levelDown/levelUp
const LuminosityStart = (state) => {
  return updateObject(state, {
    error: null,
    isLoading: true,
  });
};

const LuminositySuccess = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    error: null,
  });
};

const LuminosityFail = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    error: action.error.response?.data?.message,
  });
};

// reducers responsibe for applying actions concerned with updating zones state depending on received data from web socket
const getZoneUpdate = (state, action) => {
  return updateObject(state, {
    zones: state.zones.map(
      (zone) =>
        zone.id === action.request.id ?
          {
            ...zone,
            ValeurRealTime: action.request.ValeurRealTime,
            equipements: zone.equipements.map(
              (equipement) =>
              ({
                ...equipement,
                LevelRealTime: action.request.ValeurRealTime !== -1 ? action.request.ValeurRealTime : equipement.LevelRealTime
              })
            )
          }
          : zone
    ),
  })
}

// reducers responsibe for applying actions concerned with updating zones state depending on received data from web socket
const getDiscoUpdate = (state, action) => {
  return updateObject(state, {
    zones: state.zones.map(
      (zone) =>
        zone.id === action.request.id ?
          {
            ...zone,
            ValeurRealTime: action.request.ValeurRealTime,
            equipements: zone.equipements.map(
              (equipement) =>
              ({
                ...equipement,
                LevelRealTime: action.request.equipements.find(
                  (msgequipement) =>
                    msgequipement.id === equipement.id
                ).LevelRealTime,
              })
            )
          }
          : zone
    ),
  })
}


// reducers responsibe for applying actions concerned with updating alarmes state depending on received data from web socket
const getAlarmeUpdate = (state, action) => {
  return updateObject(state, {
    zones: state.zones.map(
      (zone) =>
        zone.id === action.request.id ?
          {
            ...zone,
            equipements: zone.equipements.map(
              (equipement) =>
                equipement.id === action.request.equipements.id ?
                  {
                    ...equipement,
                    items: equipement.items.map(
                      (item) =>
                        item.id === action?.request?.equipements?.items?.id ? { ...item, ValeurRealTime: action.request.equipements.items.ValeurRealTime }
                          : item
                    ),
                    extra_data: equipement.extra_data.map(
                      (extra_data) =>
                        extra_data.id === action?.request?.equipements?.extra_data?.id ? { ...extra_data, Value: action.request.equipements.extra_data.Value }
                          : extra_data
                    ),
                  }
                  : equipement
            )
          }
          : zone
    ),
  })
}

// reducers responsibe for applying actions concerned with updating alarmes state depending on received data from web socket
const getExtraUpdate = (state, action) => {
  return updateObject(state, {
    zones: state.zones.map(
      (zone) =>
        zone.id === action.request.id ?
          {
            ...zone,
            equipements: zone.equipements.map(
              (equipement) =>
                equipement.id === action.request.equipements.id ?
                  {
                    ...equipement,
                    extra_data: equipement.extra_data.map(
                      (extra_data) =>
                        extra_data.id === action?.request?.equipements?.extra_data?.id ? { ...extra_data, Value: action.request.equipements.extra_data.Value }
                          : extra_data
                    ),
                  }
                  : equipement
            )
          }
          : zone
    ),
  })
}

// reducers responsibe for applying actions concerned with updating telemmande state depending on received data from web socket
const getModeTeleUpdate = (state, action) => {
  return updateObject(state, {
    zones: state.zones.map(
      (zone) =>
        zone.id === action.request.id ?
          {
            ...zone,
            equipements: zone.equipements.map(
              (equipement) =>
                equipement.id === action.request.equipements.id ?
                  {
                    ...equipement,
                    ModeTel_Value: action.request.equipements.ModeTel_Value
                  }
                  : equipement
            )
          }
          : zone
    ),
  })
}




// reducers responsible for applying actions concerned with updating zones state depending on received data from web socket
const getIpStatusUpdate = (state, action) => {
  return updateObject(state, {
    zones: state.zones.map(
      (zone) =>
        zone.id === action?.request?.zone_id ?
          {
            ...zone,
            equipements: zone.equipements.map(
              (equipement) =>
                equipement.id === action?.request?.equipement?.equip_id ?
                  {
                    ...equipement,
                    IpStatus: equipement?.IpStatus?.map(
                      (ipstatu) =>
                        ipstatu?.id === action?.request?.equipement?.ipStatus?.id ?
                          {
                            ...ipstatu,
                            status: action?.request?.equipement?.ipStatus?.status
                          }
                          : ipstatu
                    )
                  }
                  : equipement
            ),

          }
          : zone
    ),
  });
};


const getMarcheUpdate = (state, action) => {
  return updateObject(state, {
    zones: state.zones.map(
      (zone) =>
        zone.id === action?.request?.id ?
          {
            ...zone,
            equipements: zone.equipements.map(
              (equipement) =>
                equipement.id === action?.request?.equipements.id ?
                  {
                    ...equipement,
                    heur_Value: action?.request?.equipements.heur_value,
                    min_Value: action?.request?.equipements.min_value
                  }
                  : equipement
            )
          }
          : zone
    ),
  })
}



const ZoneReducer = (state = initialState, action) => {
  switch (action.type) {

    case ActionsTypes.ZONE_START:
      return ZoneStart(state);
    case ActionsTypes.ZONE_SUCCESS:
      return ZoneSuccess(state, action);
    case ActionsTypes.ZONE_FAIL:
      return ZoneFail(state, action);

    case ActionsTypes.SWITCH_START:
      return SwitchStart(state);
    case ActionsTypes.SWITCH_SUCCESS:
      return SwitchSuccess(state, action);
    case ActionsTypes.SWITCH_FAIL:
      return SwitchFail(state, action);

    case ActionsTypes.LUMINOSITY_START:
      return LuminosityStart(state);
    case ActionsTypes.LUMINOSITY_SUCCESS:
      return LuminositySuccess(state, action);
    case ActionsTypes.LUMINOSITY_FAIL:
      return LuminosityFail(state, action);

    case ActionsTypes.GET_ZONE_UPDATE:
      return getZoneUpdate(state, action);

    case ActionsTypes.GET_DISCO_UPDATE:
      return getDiscoUpdate(state, action);

    case ActionsTypes.GET_ALARME_UPDATE:
      return getAlarmeUpdate(state, action);

    case ActionsTypes.GET_EXTRA_UPDATE:
      return getExtraUpdate(state, action);

    case ActionsTypes.GET_MODE_TELE_UPDATE:
      return getModeTeleUpdate(state, action);

    case ActionsTypes.GET_IP_STATUS_UPDATE_REG:
      return getIpStatusUpdate(state, action);


    case ActionsTypes.GET_MARCHE_UPDATE:
      return getMarcheUpdate(state, action);

    default:
      return state;
  }
};

export default ZoneReducer;
