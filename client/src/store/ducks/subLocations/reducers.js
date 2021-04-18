import {
  SubLocationsActionTypes,
} from './types';

export const initialState = {
  subLocations: [],
  loading: false,
  insertInputValues: {
    name: '',
    locationID: '',
  },
  apiCallStatus: '',
  apiCallStatusMessage: ''
};

export const subLocationsReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SubLocationsActionTypes.FETCH: {
      return {
        ...state,
        apiCallStatus: '',
        apiCallStatusMessage: '',
        loading: true
      };
    }
    case SubLocationsActionTypes.FETCH_SUCCESS: {
      return {
        ...state,
        subLocations: action.payload,
        loading: false
      };
    }
    case SubLocationsActionTypes.FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        apiCallStatus: "danger",
        apiCallStatusMessage: action.payload
      };
    }
    case SubLocationsActionTypes.INSERT_INPUT_ON_CHANGE: {
      return {
        ...state,
        insertInputValues: {
          ...state.insertInputValues,
          [action.payload.name]: action.payload.value
        }
      };
    }
    case SubLocationsActionTypes.INSERT: {
      return {
        ...state,
        apiCallStatus: '',
        apiCallStatusMessage: ''
      };
    }
    case SubLocationsActionTypes.INSERT_SUCCESS: {
      let newSubLocation = { ...state.insertInputValues, ID: action.payload.lastID };
      return {
        ...state,
        subLocations: state.subLocations.concat(newSubLocation),
        apiCallStatus: "success",
        apiCallStatusMessage: action.payload.message,
        insertInputValues: {
          ...initialState.insertInputValues
        },
      };
    }
    case SubLocationsActionTypes.INSERT_ERROR: {
      return {
        ...state,
        apiCallStatus: "danger",
        apiCallStatusMessage: action.payload.message
      };
    }
    case SubLocationsActionTypes.UPDATE: {
      return {
        ...state,
        apiCallStatus: '',
        apiCallStatusMessage: '',
      };
    }
    case SubLocationsActionTypes.UPDATE_SUCCESS: {
      return {
        ...state,
        apiCallStatus: "success",
        apiCallStatusMessage: action.payload.message
      };
    }
    case SubLocationsActionTypes.UPDATE_ERROR: {
      return {
        ...state,
        apiCallStatus: "danger",
        apiCallStatusMessage: action.payload.message
      };
    }
    case SubLocationsActionTypes.DELETE: {
      return {
        ...state,
        apiCallStatus: '',
        apiCallStatusMessage: ''
      };
    }
    case SubLocationsActionTypes.DELETE_SUCCESS: {
      return {
        ...state,
        apiCallStatus: "success",
        apiCallStatusMessage: action.payload.message,
        subLocations: state.subLocations.filter((row) => row.ID != action.payload.lastID)
      };
    }
    case SubLocationsActionTypes.DELETE_ERROR: {
      return {
        ...state,
        apiCallStatus: "danger",
        apiCallStatusMessage: action.payload.message
      };
    }
    case SubLocationsActionTypes.CLEAR_API_CALL_STATUS: {
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
