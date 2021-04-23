// REACT REDUX
import { createAsyncThunk } from "@reduxjs/toolkit";

// EXPO
import * as SecureStore from "expo-secure-store";

// AXIOS
import axios from "axios";

// LOCAL HOST
import localHost from "../../../localHostIp";

export const getCountries = createAsyncThunk("GET_COUNTRIES", (data) => {
  return SecureStore.getItemAsync("token").then((token) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return axios
      .get(`http://${localHost}/api/countries`)
      .then((respuesta) => respuesta.data);
  });
});

export const createCountry = createAsyncThunk("CREATE_COUNTRY", (data) => {
  return SecureStore.getItemAsync("token").then((token) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return axios
      .post(`http://${localHost}/api/countries`, { countryName: data })
      .then((respuesta) => respuesta.data);
  });
});

export const deleteCountry = createAsyncThunk("DELETE_COUNTRY", (data) => {
  return SecureStore.getItemAsync("token").then((token) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return axios
      .delete(`http://${localHost}/api/countries/${data._id}`)
      .then((respuesta) => respuesta.data);
  });
});

export const modifyCountry = createAsyncThunk("MODIFY_COUNTRY", (data) => {
  return SecureStore.getItemAsync("token").then((token) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return axios
      .put(`http://${localHost}/api/countries/${data._id}`, {
        countryName: data.name,
      })
      .then((respuesta) => respuesta.data);
  });
});
