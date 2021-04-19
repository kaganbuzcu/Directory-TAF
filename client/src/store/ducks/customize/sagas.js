import { all, call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects';
import apiCaller from '../../utils/apiCaller';
import {
  fetchSuccess,
  fetchError,
  insertSuccess,
  insertError
} from './actions';
import { CustomizeActionTypes } from './types';

/**
 * @desc Business customize get of effect.
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
 * @desc Business customize insert of effect.
 */
function* handleInsert(action) {
  try {
    const res = yield call(
      apiCaller,
      action.meta.method,
      action.meta.route
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
 * @desc Watches every specified action and runs effect method and passes action args to it
 */
function* watchFetchRequest() {
  yield takeEvery(CustomizeActionTypes.FETCH, handleFetch);
  yield takeLatest(CustomizeActionTypes.INSERT, handleInsert);
}

/**
 * @desc saga init, forks in effects, other sagas
 */
export default function* customizeSaga() {
  yield all([fork(watchFetchRequest)]);
}