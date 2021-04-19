import {
  CustomizeActionTypes,
} from './types';
import { Base64 } from 'js-base64';

export const initialState = {
  headerText: "",
  loading: false,
  apiCallStatus: '',
  apiCallStatusMessage: ''
};

export const customizeReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case CustomizeActionTypes.FETCH: {
      return {
        ...state,
        apiCallStatus: '',
        apiCallStatusMessage: '',
        loading: true
      };
    }
    case CustomizeActionTypes.FETCH_SUCCESS: {
      console.log(action.payload);
      return {
        ...state,
        headerText: Base64.decode(action.payload),
        loading: false
      };
    }
    case CustomizeActionTypes.FETCH_ERROR: {
      return {
        ...state,
        loading: false,
      };
    }
    case CustomizeActionTypes.INSERT_INPUT_ON_CHANGE: {
      return {
        ...state,
        headerText: action.payload
      };
    }
    case CustomizeActionTypes.INSERT: {
      return {
        ...state,
        apiCallStatus: '',
        apiCallStatusMessage: ''
      };
    }
    case CustomizeActionTypes.INSERT_SUCCESS: {
      return {
        ...state,
        apiCallStatus: "success",
        apiCallStatusMessage: action.payload.message,
      };
    }
    case CustomizeActionTypes.INSERT_ERROR: {
      return {
        ...state,
        apiCallStatus: "danger",
        apiCallStatusMessage: action.payload.message
      };
    }
    case CustomizeActionTypes.CLEAR_API_CALL_STATUS: {
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
