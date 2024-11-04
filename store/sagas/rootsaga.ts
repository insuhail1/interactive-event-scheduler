import { all } from "redux-saga/effects";
import watcheventSaga from "./eventSaga";

export default function* rootSaga() {
  yield all([watcheventSaga()]);
}
