import {
  LocationsActionTypes,
} from './types';

export const initialState = {
  locations: [],
  loading: false,
  locationInsertInputValues: {
    name: '',
    tafics: '',
    isGeneral: false,
    operatorAccessNumber: '',
    externalNumber: '',
  },
  editLoading: false,
  apiCallStatus: '',
  apiCallStatusMessage: '',
  updateStatus: false,
  deleteStatus: false
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
        locationInsertInputValues: {
          ...state.locationInsertInputValues,
          [action.payload.name]: action.payload.value
        }
      };
    }
    case LocationsActionTypes.INSERT: {
      return {
        ...state,
        apiCallStatus: '',
        apiCallStatusMessage: '',
        editLoading: true,
      };
    }
    case LocationsActionTypes.INSERT_SUCCESS: {
      let newLocation = { ...state.locationInsertInputValues, ID: action.payload.lastID };
      return {
        ...state,
        editLoading: false,
        locations: state.locations.concat(newLocation),
        apiCallStatus: "success",
        apiCallStatusMessage: action.payload.message,
        locationInsertInputValues: {
          ...initialState.locationInsertInputValues
        },
      };
    }
    case LocationsActionTypes.INSERT_ERROR: {
      return {
        ...state,
        editLoading: false,
        apiCallStatus: "danger",
        apiCallStatusMessage: action.payload.message
      };
    }
    case LocationsActionTypes.UPDATE: {
      return {
        ...state,
        apiCallStatus: '',
        apiCallStatusMessage: '',
        editLoading: true,
        updateStatus: false,
      };
    }
    case LocationsActionTypes.UPDATE_SUCCESS: {
      return {
        ...state,
        editLoading: false,
        apiCallStatus: "success",
        apiCallStatusMessage: action.payload.message,
        updateStatus: true
      };
    }
    case LocationsActionTypes.UPDATE_ERROR: {
      return {
        ...state,
        editLoading: false,
        apiCallStatus: "danger",
        apiCallStatusMessage: action.payload.message,
        updateStatus: false
      };
    }
    case LocationsActionTypes.DELETE: {
      return {
        ...state,
        apiCallStatus: '',
        apiCallStatusMessage: '',
        editLoading: true,
        updateStatus: false,
      };
    }
    case LocationsActionTypes.DELETE_SUCCESS: {
      return {
        ...state,
        editLoading: false,
        apiCallStatus: "success",
        apiCallStatusMessage: action.payload.message,
        updateStatus: true,
        locations: state.locations.filter((row) => row.ID != action.payload.lastID)
      };
    }
    case LocationsActionTypes.DELETE_ERROR: {
      return {
        ...state,
        editLoading: false,
        apiCallStatus: "danger",
        apiCallStatusMessage: action.payload.message,
        updateStatus: false
      };
    }
    case LocationsActionTypes.CLEAR_API_CALL_STATUS: {
      return {
        ...state,
        apiCallStatus: "",
        apiCallStatusMessage: "",
        updateStatus: false
      };
    }
    default:
      return state;
  }
};
