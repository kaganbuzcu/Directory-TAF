import { action } from "typesafe-actions";
import { SubLocationsActionTypes } from "./types";

/** Get Sub Location service action */
export const fetchAction = () =>
  action(SubLocationsActionTypes.FETCH, [], {
    method: "get",
    route: "/sub-locations",
  });
export const fetchSuccess = (data) =>
  action(SubLocationsActionTypes.FETCH_SUCCESS, data);
export const fetchError = (message) =>
  action(SubLocationsActionTypes.FETCH_ERROR, message);

/** Sub Location insert service action */
export const changeInsertInput = (values) => 
  action(SubLocationsActionTypes.INSERT_INPUT_ON_CHANGE, values);

export const insertAction = (formData) => {
  if (formData.name === '' || formData.locationID === '') {
    return action(SubLocationsActionTypes.INSERT_ERROR, { message: "Tüm alanlar gereklidir" });
  } else {
    return action(SubLocationsActionTypes.INSERT, [], {
      method: "post",
      route: "/sub-locations",
      data: formData
    });
  }
}
export const insertSuccess = (res) =>
  action(SubLocationsActionTypes.INSERT_SUCCESS, res);
export const insertError = (res) =>
  action(SubLocationsActionTypes.INSERT_ERROR, res);

/** Sub Location update service action */
export const updateAction = ({ name, id }) =>
  action(SubLocationsActionTypes.UPDATE, [], {
    method: "put",
    route: "/sub-locations/" + id,
    data: { name }
  });

export const updateSuccess = (res) =>
  action(SubLocationsActionTypes.UPDATE_SUCCESS, res);
export const updateError = (res) =>
  action(SubLocationsActionTypes.UPDATE_ERROR, res);


/** Sub Location delete service action */
export const deleteAction = (id) =>
  action(SubLocationsActionTypes.DELETE, [], {
    method: "delete",
    route: "/sub-locations/" + id
  });

export const deleteSuccess = (res) =>
  action(SubLocationsActionTypes.DELETE_SUCCESS, res);
export const deleteError = (res) =>
  action(SubLocationsActionTypes.DELETE_ERROR, res);

export const clearApiCallStatus = () =>
  action(SubLocationsActionTypes.CLEAR_API_CALL_STATUS);
