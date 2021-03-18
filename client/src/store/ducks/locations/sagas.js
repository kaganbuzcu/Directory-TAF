import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import apiCaller from '../../utils/apiCaller';
import { fetchLocationsSuccess, fetchLocationsError } from './actions';
import { LocationsActionTypes } from './types';

/**
 * @desc Business logic of effect.
 */
function* handleFetch(action) {
  try {
    const res = yield call(
      apiCaller,
      action.meta.method,
      action.meta.route,
    );

    yield put(fetchLocationsSuccess(res));
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchLocationsError(err));
    } else {
      yield put(fetchLocationsError('An unknown error occured.'));
    }
  }
}

/**
 * @desc Watches every specified action and runs effect method and passes action args to it
 */
function* watchFetchRequest() {
  yield takeEvery(LocationsActionTypes.FETCH_LOCATIONS, handleFetch);
}

/**
 * @desc saga init, forks in effects, other sagas
 */
export default function* locationsSaga() {
  yield all([fork(watchFetchRequest)]);
}