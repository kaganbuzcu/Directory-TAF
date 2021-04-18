import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { locationsReducer } from './locations/reducers';
import locationsSaga from './locations/sagas';
import { subLocationsReducer } from './subLocations/reducers';
import subLocationsSaga from './subLocations/sagas';
import { numbersReducer } from './numbers/reducers';
import numbersSaga from './numbers/sagas';


export const rootReducer = combineReducers({
  locations: locationsReducer,
  subLocations: subLocationsReducer,
  numbers: numbersReducer,
});

export function* rootSaga() {
  yield all([
    fork(locationsSaga),
    fork(subLocationsSaga),
    fork(numbersSaga)
  ]);
}
