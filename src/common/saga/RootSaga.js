import { all } from "redux-saga/effects";
import AuthWatcher from "../../modules/Authentification/saga/AuthWatcher";
import ZoneWatcher from "../components/Telecommande/saga/ZoneWatcher";
import HistoryWatcher from "../../modules/historique/saga/HistoryWatcher";
import AlarmeWatchar from "../../modules/alarme/saga/AlarmeWatcher";
import AuthorizationWatchar from "../../modules/balisage/saga/AuthorizationWatcher";
import MatrixWatchar from "../../modules/balisage/saga/MatrixWatcher";
import CommunicationWatchar from "../../modules/etatCommunication/saga/CommunicationWatcher";
import ELelctricityWatchar from "../../modules/electricite/saga/ElectricityWatcher";

// all saga's watchers call
export default function* rootSaga() {
  yield all([
    AuthWatcher(),
    ZoneWatcher(),
    HistoryWatcher(),
    AlarmeWatchar(),
    AuthorizationWatchar(),
    MatrixWatchar(),
    CommunicationWatchar(),
    ELelctricityWatchar()
  ]);
}
