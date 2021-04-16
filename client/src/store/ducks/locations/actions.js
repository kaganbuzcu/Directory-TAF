import { action } from "typesafe-actions";
import { LocationsActionTypes } from "./types";

/** Get locations service action */
export const fetchLocationsAction = () =>
  action(LocationsActionTypes.FETCH, [], {
    method: "get",
    route: "/locations",
  });
export const fetchLocationsSuccess = (data) =>
  action(LocationsActionTypes.FETCH_SUCCESS, data);
export const fetchLocationsError = (message) =>
  action(LocationsActionTypes.FETCH_ERROR, message);

/** Location insert service action */
export const onChangeLocationInsertInput = (values) => {
  if (values.name === 'isGeneral') {
    let booleanValue = values.value === 'true' ? true : false
    values.value = !booleanValue;
  }
  return action(LocationsActionTypes.INSERT_INPUT_ON_CHANGE, values);
}

export const locationInsertAction = (formData) => {
  if (formData.name === '' ||
    formData.externalNumber === '' ||
    formData.tafics === '' ||
    formData.operatorAccessNumber === '') {
    return action(LocationsActionTypes.INSERT_ERROR, "Tüm alanlar gereklidir");
  } else {
    return action(LocationsActionTypes.INSERT, [], {
      method: "post",
      route: "/locations",
      data: formData
    });
  }
}
export const locationInsertSuccess = (res) =>
  action(LocationsActionTypes.INSERT_SUCCESS, res);
export const locationInsertError = (res) =>
  action(LocationsActionTypes.INSERT_ERROR, res);

/** Location update service action */
export const locationUpdateAction = ({ column, data, id }) =>
  action(LocationsActionTypes.UPDATE, [], {
    method: "put",
    route: "/locations/" + id,
    data: { column, data }
  });

export const locationUpdateSuccess = (res) =>
  action(LocationsActionTypes.UPDATE_SUCCESS, res);
export const locationUpdateError = (res) =>
  action(LocationsActionTypes.UPDATE_ERROR, res);


/** Location delete service action */
export const locationDeleteAction = (id) =>
  action(LocationsActionTypes.DELETE, [], {
    method: "delete",
    route: "/locations/" + id
  });

export const locationDeleteSuccess = (res) =>
  action(LocationsActionTypes.DELETE_SUCCESS, res);
export const locationDeleteError = (res) =>
  action(LocationsActionTypes.DELETE_ERROR, res);

export const clearApiCallStatus = () =>
  action(LocationsActionTypes.CLEAR_API_CALL_STATUS);
