import { all } from "redux-saga/effects";

//public
import AuthenticationSaga from "./authentication/saga";
import BlogsSaga from "./blogs/saga";
import AdminsSaga from "./admins/saga";


export default function* rootSaga() {
  yield all([
    AuthenticationSaga(),
    BlogsSaga(),

    AdminsSaga(),


  ]);
}
