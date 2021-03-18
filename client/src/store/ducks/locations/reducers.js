import {
  LocationsActionTypes,
} from './types';

export const initialState = {
  locations: [],
  loading: false
};

export const locationsReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case LocationsActionTypes.FETCH_LOCATIONS: {
      return { ...state, loading: true };
    }
    case LocationsActionTypes.FETCH_UNITS_SUCCESS: {
      return {
        ...initialState,
        locations: action.payload,
      };
    }
    case LocationsActionTypes.FETCH_UNITS_ERROR: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};
