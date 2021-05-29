import { combineReducers } from 'redux';

const initlState = {
    temp: null,
    pressure: null,
    humidity: null,
    speed: null,
    name: 'Город не выбран',
    description: null,
    icon: null,
    chanceRain: null,
    windDirection: null
}

const weatherCity = (state = initlState, action) => {
    switch (action.type) {
        case 'SET_WEATHER_CITY': {
            return action.payload.weatherCity
        }
        default:
            return state

    }
}

const cityList = (state = [], action) => {
    switch (action.type) {
        case 'SET_CITIES':
            return action.payload.cities
        default:
            return  state
    }
}


const isFetching = (state = true, action) => {
    switch (action.type) {
        case 'IS_FETCHING': {
            return action.payload.isFetching
        }
        default:
            return state
    }
}

const weatherCityGeneralData = (state = {}, action) => {
    switch (action.type) {
        case 'SET_WEATHER_CITY_GENERAL_DATA': {
            return action.payload.weatherCityGeneralData
        }
        default:
            return state
    }
}

export default combineReducers({
    cityList, 
    isFetching,
    weatherCity,
    weatherCityGeneralData
});