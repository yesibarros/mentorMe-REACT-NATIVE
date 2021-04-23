// REACT REDUX
import { createAsyncThunk } from "@reduxjs/toolkit";

// EXPO
import * as SecureStore from "expo-secure-store";

// AXIOS
import axios from "axios";

// LOCAL HOST
import localHost from "../../../localHostIp";

export const getLocations = createAsyncThunk("GET_LOCATIONS", (data) => {
  return SecureStore.getItemAsync("token").then((token) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return axios
      .get(`http://${localHost}/api/locations`)
      .then((respuesta) => respuesta.data);
  });
});

export const createLocation = createAsyncThunk("CREATE_LOCATION", (data) => {
  return SecureStore.getItemAsync("token").then((token) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return axios
      .post(`http://${localHost}/api/locations`, { locationName: data })
      .then((respuesta) => respuesta.data);
  });
});

export const deleteLocation = createAsyncThunk("DELETE_LOCATION", (data) => {
  return SecureStore.getItemAsync("token").then((token) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return axios
      .delete(`http://${localHost}/api/locations/${data._id}`)
      .then((respuesta) => respuesta.data);
  });
});

export const modifyLocation = createAsyncThunk("MODIFY_LOCATION", (data) => {
  return SecureStore.getItemAsync("token").then((token) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return axios
      .put(`http://${localHost}/api/locations/${data._id}`, {
        locationName: data.name,
      })
      .then((respuesta) => respuesta.data);
  });
});
