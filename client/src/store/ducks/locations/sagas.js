import { all, call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects';
import apiCaller from '../../utils/apiCaller';
import {
  fetchLocationsSuccess,
  fetchLocationsError,
  locationInsertSuccess,
  locationInsertError,
  locationUpdateSuccess,
  locationUpdateError,
  locationDeleteSuccess,
  locationDeleteError
} from './actions';
import { LocationsActionTypes } from './types';

/**
 * @desc Business location get of effect.
 */
function* handleFetch(action) {
  try {
    const res = yield call(
      apiCaller,
      action.meta.method,
      action.meta.route,
    );

    yield put(fetchLocationsSuccess(res.data));
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchLocationsError(err));
    } else {
      yield put(fetchLocationsError('An unknown error occured.'));
    }
  }
}

/**
 * @desc Business location insert of effect.
 */
function* handleLocationInsert(action) {
  try {
    const res = yield call(
      apiCaller,
      action.meta.method,
      action.meta.route,
      action.meta.data
    );

    if (res.status === "error") {
      yield put(locationInsertError(res));
    } else {
      yield put(locationInsertSuccess(res));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(locationInsertError(err));
    } else {
      yield put(locationInsertError('An unknown error occured.'));
    }
  }
}

/**
 * @desc Business location update of effect.
 */
function* handleLocationUpdate(action) {
  try {
    const res = yield call(
      apiCaller,
      action.meta.method,
      action.meta.route,
      action.meta.data
    );

    if (res.status === "error") {
      yield put(locationUpdateError(res));
    } else {
      yield put(locationUpdateSuccess(res));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(locationUpdateError(err));
    } else {
      yield put(locationUpdateError('An unknown error occured.'));
    }
  }
}

/**
 * @desc Business location delete of effect.
 */
function* handleLocationDelete(action) {
  try {
    const res = yield call(
      apiCaller,
      action.meta.method,
      action.meta.route
    );

    if (res.status === "error") {
      yield put(locationDeleteError(res));
    } else {
      yield put(locationDeleteSuccess(res));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(locationDeleteError(err));
    } else {
      yield put(locationDeleteError('An unknown error occured.'));
    }
  }
}

/**
 * @desc Watches every specified action and runs effect method and passes action args to it
 */
function* watchFetchRequest() {
  yield takeEvery(LocationsActionTypes.FETCH, handleFetch);
  yield takeLatest(LocationsActionTypes.INSERT, handleLocationInsert);
  yield takeLatest(LocationsActionTypes.UPDATE, handleLocationUpdate);
  yield takeLatest(LocationsActionTypes.DELETE, handleLocationDelete);
}

/**
 * @desc saga init, forks in effects, other sagas
 */
export default function* locationsSaga() {
  yield all([fork(watchFetchRequest)]);
}