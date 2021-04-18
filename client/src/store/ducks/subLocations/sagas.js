import { all, call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects';
import apiCaller from '../../utils/apiCaller';
import {
  fetchSuccess,
  fetchError,
  insertSuccess,
  insertError,
  updateSuccess,
  updateError,
  deleteSuccess,
  deleteError
} from './actions';
import { SubLocationsActionTypes } from './types';

/**
 * @desc Business sub location get of effect.
 */
function* handleFetch(action) {
  try {
    const res = yield call(
      apiCaller,
      action.meta.method,
      action.meta.route,
    );

    yield put(fetchSuccess(res.data));
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchError(err));
    } else {
      yield put(fetchError('An unknown error occured.'));
    }
  }
}

/**
 * @desc Business sub location insert of effect.
 */
function* handleInsert(action) {
  try {
    const res = yield call(
      apiCaller,
      action.meta.method,
      action.meta.route,
      action.meta.data
    );

    if (res.status === "error") {
      yield put(insertError(res));
    } else {
      yield put(insertSuccess(res));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(insertError(err));
    } else {
      yield put(insertError('An unknown error occured.'));
    }
  }
}

/**
 * @desc Business sub location update of effect.
 */
function* handleUpdate(action) {
  try {
    const res = yield call(
      apiCaller,
      action.meta.method,
      action.meta.route,
      action.meta.data
    );

    if (res.status === "error") {
      yield put(updateError(res));
    } else {
      yield put(updateSuccess(res));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(updateError(err));
    } else {
      yield put(updateError('An unknown error occured.'));
    }
  }
}

/**
 * @desc Business sub location delete of effect.
 */
function* handleDelete(action) {
  try {
    const res = yield call(
      apiCaller,
      action.meta.method,
      action.meta.route
    );

    if (res.status === "error") {
      yield put(deleteError(res));
    } else {
      yield put(deleteSuccess(res));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(deleteError(err));
    } else {
      yield put(deleteError('An unknown error occured.'));
    }
  }
}

/**
 * @desc Watches every specified action and runs effect method and passes action args to it
 */
function* watchFetchRequest() {
  yield takeEvery(SubLocationsActionTypes.FETCH, handleFetch);
  yield takeLatest(SubLocationsActionTypes.INSERT, handleInsert);
  yield takeLatest(SubLocationsActionTypes.UPDATE, handleUpdate);
  yield takeLatest(SubLocationsActionTypes.DELETE, handleDelete);
}

/**
 * @desc saga init, forks in effects, other sagas
 */
export default function* subLocationsSaga() {
  yield all([fork(watchFetchRequest)]);
}