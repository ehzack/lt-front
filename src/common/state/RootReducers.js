import { combineReducers } from "redux";
import AuthReducer from "../../modules/Authentification/state/AuthReducer";
import ZoneReducer from "../../common/components/Telecommande/state/ZoneReducers";
import HistoryReducer from "../../modules/historique/state/HistoryReducers";
import AlarmeReducer from "../../modules/alarme/state/AlarmeReducers";
import AuthorizationReducer from "../../modules/balisage/state/authorizationReducer";
import MatrixReducer from "../../modules/balisage/state/matrixReducer";
import CommunicationReducer from "../../modules/etatCommunication/state/communicationReducer";
import ElectricityReducer from "../../modules/electricite/state/electricityReducer";

const rootReducer = combineReducers({
  Auth: AuthReducer,
  Zone: ZoneReducer,
  History: HistoryReducer,
  Alarmes: AlarmeReducer,
  Authorization: AuthorizationReducer,
  Matrix: MatrixReducer,
  Communicator: CommunicationReducer,
  Electricity: ElectricityReducer
});

export default rootReducer;