import { action } from "typesafe-actions";
import { LocationsActionTypes } from "./types";

export const fetchLocationsAction = () =>
  action(LocationsActionTypes.FETCH_LOCATIONS, [], {
    method: "get",
    route: "/locations",
  });
export const fetchLocationsSuccess = (data) =>
  action(LocationsActionTypes.FETCH_UNITS_SUCCESS, data);
export const fetchLocationsError = (message) =>
  action(LocationsActionTypes.FETCH_UNITS_ERROR, message);
