import { all } from "redux-saga/effects";

import metaSaga from "./meta/saga";
import authenticationSaga from "./authentication/saga";

import blogsSaga from "./blogs/saga";
import projectsSaga from "./projects/saga";
import dashboardSaga from "./dashboard/saga";
export default function* rootSaga() {
  yield all([
    metaSaga(),
    authenticationSaga(),

    projectsSaga(),
    blogsSaga(),
    dashboardSaga(),
  ]);
}
