import { action } from "typesafe-actions";
import { CustomizeActionTypes } from "./types";
import { Base64 } from 'js-base64';

/** Get header from customize service action */
export const fetchAction = () =>
  action(CustomizeActionTypes.FETCH, [], {
    method: "get",
    route: "/customize/header",
  });
export const fetchSuccess = (data) =>
  action(CustomizeActionTypes.FETCH_SUCCESS, data);
export const fetchError = (message) =>
  action(CustomizeActionTypes.FETCH_ERROR, message);

/** header insert service action */
export const changeHeaderText = (values) =>
  action(CustomizeActionTypes.INSERT_INPUT_ON_CHANGE, values);

export const insertAction = (headerText) => action(CustomizeActionTypes.INSERT, [], {
  method: "post",
  route: "/customize/header/" + Base64.encode(headerText),
});
export const insertSuccess = (res) =>
  action(CustomizeActionTypes.INSERT_SUCCESS, res);
export const insertError = (res) =>
  action(CustomizeActionTypes.INSERT_ERROR, res);

export const clearApiCallStatus = () =>
  action(CustomizeActionTypes.CLEAR_API_CALL_STATUS);
