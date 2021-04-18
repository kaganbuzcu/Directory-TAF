import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { locationsReducer } from './locations/reducers';
import locationsSaga from './locations/sagas';
import { subLocationsReducer } from './subLocations/reducers';
import subLocationsSaga from './subLocations/sagas';


export const rootReducer = combineReducers({
  locations: locationsReducer,
  subLocations: subLocationsReducer,
});

export function* rootSaga() {
  yield all([
    fork(locationsSaga),
    fork(subLocationsSaga)
  ]);
}
