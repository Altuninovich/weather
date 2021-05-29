import * as api from "../api/api";
import {getIcon} from "../icon";
import {getWindDirection} from "../utils/wind"

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
    const weather = response.weather[0]
    const icon = getIcon(weather.icon)
    const windDirection = getWindDirection(Number(response.wind.deg))
    const temp = Math.ceil(response.main.temp)
    const speed = Math.ceil(response.wind.speed)
    const weatherCity = {
        temp: temp,
        pressure: response.main.pressure,
        humidity: response.main.humidity,
        speed: speed,
        name: response.name,
        description: weather.description,
        icon: icon,
        chanceRain: response.clouds.all,
        windDirection: windDirection
    }
        dispatch(togglePreloader(false))
        dispatch(setWeatherCityGeneralData(response))
        dispatch(setWeatherCity(weatherCity))
}
