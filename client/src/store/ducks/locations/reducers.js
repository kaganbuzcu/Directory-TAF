import {
  LocationsActionTypes,
} from './types';

export const initialState = {
  locations: [],
  loading: false,
  insertInputValues: {
    name: '',
    tafics: '',
    isGeneral: false,
    operatorAccessNumber: '',
    externalNumber: '',
  },
  apiCallStatus: '',
  apiCallStatusMessage: ''
};

export const locationsReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case LocationsActionTypes.FETCH: {
      return {
        ...state,
        apiCallStatus: '',
        apiCallStatusMessage: '',
        loading: true
      };
    }
    case LocationsActionTypes.FETCH_SUCCESS: {
      return {
        ...state,
        locations: action.payload,
        loading: false
      };
    }
    case LocationsActionTypes.FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        apiCallStatus: "danger",
        apiCallStatusMessage: action.payload
      };
    }
    case LocationsActionTypes.INSERT_INPUT_ON_CHANGE: {
      return {
        ...state,
        insertInputValues: {
          ...state.insertInputValues,
          [action.payload.name]: action.payload.value
        }
      };
    }
    case LocationsActionTypes.INSERT: {
      return {
        ...state,
        apiCallStatus: '',
        apiCallStatusMessage: '',
      };
    }
    case LocationsActionTypes.INSERT_SUCCESS: {
      let newLocation = { ...state.insertInputValues, ID: action.payload.lastID };
      return {
        ...state,
        locations: state.locations.concat(newLocation),
        apiCallStatus: "success",
        apiCallStatusMessage: action.payload.message,
        insertInputValues: {
          ...initialState.insertInputValues
        },
      };
    }
    case LocationsActionTypes.INSERT_ERROR: {
      return {
        ...state,
        apiCallStatus: "danger",
        apiCallStatusMessage: action.payload.message
      };
    }
    case LocationsActionTypes.UPDATE: {
      return {
        ...state,
        apiCallStatus: '',
        apiCallStatusMessage: '',
      };
    }
    case LocationsActionTypes.UPDATE_SUCCESS: {
      return {
        ...state,
        apiCallStatus: "success",
        apiCallStatusMessage: action.payload.message
      };
    }
    case LocationsActionTypes.UPDATE_ERROR: {
      return {
        ...state,
        apiCallStatus: "danger",
        apiCallStatusMessage: action.payload.message
      };
    }
    case LocationsActionTypes.DELETE: {
      return {
        ...state,
        apiCallStatus: '',
        apiCallStatusMessage: ''
      };
    }
    case LocationsActionTypes.DELETE_SUCCESS: {
      return {
        ...state,
        apiCallStatus: "success",
        apiCallStatusMessage: action.payload.message,
        locations: state.locations.filter((row) => row.ID != action.payload.lastID)
      };
    }
    case LocationsActionTypes.DELETE_ERROR: {
      return {
        ...state,
        apiCallStatus: "danger",
        apiCallStatusMessage: action.payload.message
      };
    }
    case LocationsActionTypes.CLEAR_API_CALL_STATUS: {
      return {
        ...state,
        apiCallStatus: "",
        apiCallStatusMessage: ""
      };
    }
    default:
      return state;
  }
};
