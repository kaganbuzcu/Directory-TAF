import {
  NumbersActionTypes,
} from './types';

export const initialState = {
  numbers: [],
  loading: false,
  insertInputValues: {
    duty: '',
    internalNumber: '',
    nameSurname: '',
    rank: '',
    gsm: '',
    subLocationID: '',
    locationID: '',
  },
  apiCallStatus: '',
  apiCallStatusMessage: ''
};

export const numbersReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case NumbersActionTypes.FETCH: {
      return {
        ...state,
        apiCallStatus: '',
        apiCallStatusMessage: '',
        loading: true
      };
    }
    case NumbersActionTypes.FETCH_SUCCESS: {
      return {
        ...state,
        numbers: action.payload,
        loading: false
      };
    }
    case NumbersActionTypes.FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        apiCallStatus: "danger",
        apiCallStatusMessage: action.payload
      };
    }
    case NumbersActionTypes.INSERT_INPUT_ON_CHANGE: {
      return {
        ...state,
        insertInputValues: {
          ...state.insertInputValues,
          [action.payload.name]: action.payload.value
        }
      };
    }
    case NumbersActionTypes.INSERT: {
      return {
        ...state,
        apiCallStatus: '',
        apiCallStatusMessage: '',
      };
    }
    case NumbersActionTypes.INSERT_SUCCESS: {
      let newNumber = { ...state.insertInputValues, ID: action.payload.lastID };
      return {
        ...state,
        numbers: state.numbers.concat(newNumber),
        apiCallStatus: "success",
        apiCallStatusMessage: action.payload.message,
        insertInputValues: {
          ...initialState.insertInputValues
        },
      };
    }
    case NumbersActionTypes.INSERT_ERROR: {
      return {
        ...state,
        apiCallStatus: "danger",
        apiCallStatusMessage: action.payload.message
      };
    }
    case NumbersActionTypes.UPDATE: {
      return {
        ...state,
        apiCallStatus: '',
        apiCallStatusMessage: '',
      };
    }
    case NumbersActionTypes.UPDATE_SUCCESS: {
      return {
        ...state,
        apiCallStatus: "success",
        apiCallStatusMessage: action.payload.message
      };
    }
    case NumbersActionTypes.UPDATE_ERROR: {
      return {
        ...state,
        apiCallStatus: "danger",
        apiCallStatusMessage: action.payload.message
      };
    }
    case NumbersActionTypes.DELETE: {
      return {
        ...state,
        apiCallStatus: '',
        apiCallStatusMessage: ''
      };
    }
    case NumbersActionTypes.DELETE_SUCCESS: {
      return {
        ...state,
        apiCallStatus: "success",
        apiCallStatusMessage: action.payload.message,
        numbers: state.numbers.filter((row) => row.ID != action.payload.lastID)
      };
    }
    case NumbersActionTypes.DELETE_ERROR: {
      return {
        ...state,
        apiCallStatus: "danger",
        apiCallStatusMessage: action.payload.message
      };
    }
    case NumbersActionTypes.CLEAR_API_CALL_STATUS: {
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
