import { take, put, spawn, fork, call } from "redux-saga/effects";
import {
  fetchServicesSuccess,
  fetchServicesFailure,
  getServiceSuccess,
  getServiceFailure,
} from "../actions/actionCreators";
import {
  FETCH_SERVICES_REQUEST,
  GET_SERVICE_REQUEST,
} from "../actions/actionTypes";
import { fetchRequest } from "../api/index";

function* handleGetServiceRequest(action) {
  try {
    const data = yield call(fetchRequest, action.payload.id);
    yield put(getServiceSuccess(data));
  } catch (error) {
    yield put(getServiceFailure(error.message));
  }
}

function* watchGetServiceRequest() {
  while (true) {
    const action = yield take(GET_SERVICE_REQUEST);
    yield fork(handleGetServiceRequest, action);
  }
}

function* handleServicesRequest() {
  try {
    const data = yield call(fetchRequest);
    yield put(fetchServicesSuccess(data));
  } catch (error) {
    yield put(fetchServicesFailure(error.message));
  }
}

function* watchServicesRequest() {
  while (true) {
    const action = yield take(FETCH_SERVICES_REQUEST);
    yield fork(handleServicesRequest, action);
  }
}

export default function* saga() {
  yield spawn(watchServicesRequest);
  yield spawn(watchGetServiceRequest);
}