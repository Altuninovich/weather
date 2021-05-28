import * as api from "../api/api";
import {getIcon} from "../icon"
//import {stopSubmit} from "redux-form";
//import { createAction } from 'redux-actions';

export const togglePreloader = (isFetching) => ({
    type: 'IS_FETCHING',
    payload: {
        isFetching,
    }
})

export const setCities = (cities) => ({
    type: 'SET_CITIES',
    payload: {
        cities,
    }
})

export const setWeatherCity = (weatherCity) => ({
    type: 'SET_WEATHER_CITY',
    payload: {
        weatherCity,
    }
})

export const setWeatherCityGeneralData = (weatherCityGeneralData) => ({
    type: 'SET_WEATHER_CITY_GENERAL_DATA',
    payload: {
        weatherCityGeneralData,
    }
})

export const getCitiesThunk = () => async (dispatch) => {
    dispatch(togglePreloader(true))
    const response = await api.getCities()
        dispatch(togglePreloader(false))
        dispatch(setCities(response))
}
 
export const getWeatherCityThunk = (idCity) => async (dispatch) => {
    dispatch(togglePreloader(true))
    const response = await api.getWeatherCity(idCity)
    const icon = getIcon()[response.weather.icon]
    const weatherCity = {
        temp: response.main.temp,
        pressure: response.main.pressure,
        humidity: response.main.humidity,
        speed: response.wind.speed,
        name: response.name,
        description: response.weather.description,
        icon: icon,
        chanceRain: '10%'
    }
        dispatch(togglePreloader(false))
        dispatch(setWeatherCityGeneralData(response))
        dispatch(setWeatherCity(weatherCity))
}
