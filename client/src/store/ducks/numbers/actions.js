import { action } from "typesafe-actions";
import { NumbersActionTypes } from "./types";

/** Get numbers service action */
export const fetchAction = () =>
  action(NumbersActionTypes.FETCH, [], {
    method: "get",
    route: "/numbers",
  });
export const fetchSuccess = (data) =>
  action(NumbersActionTypes.FETCH_SUCCESS, data);
export const fetchError = (message) =>
  action(NumbersActionTypes.FETCH_ERROR, message);

/** number insert service action */
export const changeInsertInput = (values) =>
  action(NumbersActionTypes.INSERT_INPUT_ON_CHANGE, values);


export const insertAction = (formData) => {
  if (formData.duty === '' ||
    formData.internalNumber === '') {
    return action(NumbersActionTypes.INSERT_ERROR, { message: "Dahili Numara ve Makam boş olamaz." });
  } else {
    return action(NumbersActionTypes.INSERT, [], {
      method: "post",
      route: "/numbers",
      data: formData
    });
  }
}
export const insertSuccess = (res) =>
  action(NumbersActionTypes.INSERT_SUCCESS, res);
export const insertError = (res) =>
  action(NumbersActionTypes.INSERT_ERROR, res);

/** number update service action */
export const updateAction = ({ column, data, id }) =>
  action(NumbersActionTypes.UPDATE, [], {
    method: "put",
    route: "/numbers/" + id,
    data: { column, data }
  });

export const updateSuccess = (res) =>
  action(NumbersActionTypes.UPDATE_SUCCESS, res);
export const updateError = (res) =>
  action(NumbersActionTypes.UPDATE_ERROR, res);


/** number delete service action */
export const deleteAction = (id) =>
  action(NumbersActionTypes.DELETE, [], {
    method: "delete",
    route: "/numbers/" + id
  });

export const deleteSuccess = (res) =>
  action(NumbersActionTypes.DELETE_SUCCESS, res);
export const deleteError = (res) =>
  action(NumbersActionTypes.DELETE_ERROR, res);

export const clearApiCallStatus = () =>
  action(NumbersActionTypes.CLEAR_API_CALL_STATUS);
