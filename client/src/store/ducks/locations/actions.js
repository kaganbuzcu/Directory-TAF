import { action } from "typesafe-actions";
import { LocationsActionTypes } from "./types";

/** Get locations service action */
export const fetchAction = () =>
  action(LocationsActionTypes.FETCH, [], {
    method: "get",
    route: "/locations",
  });
export const fetchSuccess = (data) =>
  action(LocationsActionTypes.FETCH_SUCCESS, data);
export const fetchError = (message) =>
  action(LocationsActionTypes.FETCH_ERROR, message);

/** Location insert service action */
export const onChangeInsertInput = (values) => {
  if (values.name === 'isGeneral') {
    let booleanValue = values.value === 'true' ? true : false
    values.value = !booleanValue;
  }
  return action(LocationsActionTypes.INSERT_INPUT_ON_CHANGE, values);
}

export const insertAction = (formData) => {
  if (formData.name === '' ||
    formData.externalNumber === '' ||
    formData.tafics === '' ||
    formData.operatorAccessNumber === '') {
    return action(LocationsActionTypes.INSERT_ERROR, { message: "Tüm alanlar gereklidir" });
  } else {
    return action(LocationsActionTypes.INSERT, [], {
      method: "post",
      route: "/locations",
      data: formData
    });
  }
}
export const insertSuccess = (res) =>
  action(LocationsActionTypes.INSERT_SUCCESS, res);
export const insertError = (res) =>
  action(LocationsActionTypes.INSERT_ERROR, res);

/** Location update service action */
export const updateAction = ({ column, data, id }) =>
  action(LocationsActionTypes.UPDATE, [], {
    method: "put",
    route: "/locations/" + id,
    data: { column, data }
  });

export const updateSuccess = (res) =>
  action(LocationsActionTypes.UPDATE_SUCCESS, res);
export const updateError = (res) =>
  action(LocationsActionTypes.UPDATE_ERROR, res);


/** Location delete service action */
export const deleteAction = (id) =>
  action(LocationsActionTypes.DELETE, [], {
    method: "delete",
    route: "/locations/" + id
  });

export const deleteSuccess = (res) =>
  action(LocationsActionTypes.DELETE_SUCCESS, res);
export const deleteError = (res) =>
  action(LocationsActionTypes.DELETE_ERROR, res);

export const clearApiCallStatus = () =>
  action(LocationsActionTypes.CLEAR_API_CALL_STATUS);
