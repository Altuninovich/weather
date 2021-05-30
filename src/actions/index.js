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
 
export const getWeatherCityThunk = (cityName) => async (dispatch) => {
    dispatch(togglePreloader(true))
    const data = await api.getWeatherCity(cityName)
    const weather = data.weather[0]
    const icon = getIcon(weather.icon)
    const windDirection = getWindDirection(Number(data.wind.deg))
    const temp = Math.ceil(data.main.temp)
    const speed = Math.ceil(data.wind.speed)
    const weatherCity = {
        temp: temp,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
        speed: speed,
        name: data.name,
        description: weather.description,
        icon: icon,
        chanceRain: data.clouds.all,
        windDirection: windDirection
    }
        dispatch(togglePreloader(false))
        dispatch(setWeatherCityGeneralData(data))
        dispatch(setWeatherCity(weatherCity))
}
