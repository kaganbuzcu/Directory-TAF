import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { locationsReducer } from './locations/reducers';
import locationsSaga from './locations/sagas';


export const rootReducer = combineReducers({
  locations: locationsReducer,
});

export function* rootSaga() {
  yield all([fork(locationsSaga)]);
}
