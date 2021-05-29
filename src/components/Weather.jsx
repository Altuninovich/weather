import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import CityList from './CityList';
import location from '../img/svg/location.svg';
import cn from "classnames";
import {toFahrenheit} from 'celsius';


const mapStateToProps = (state) => ({
    cityList: state.cityList,
    isFetching: state.isFetching,
    weatherCity: state.weatherCity
})

const actionCreators = {
    togglePreloader: actions.togglePreloader,
    setCities: actions.setCities,
    setWeatherCity: actions.setWeatherCity,
    getCitiesThunk: actions.getCitiesThunk,
    getWeatherCityThunk: actions.getWeatherCityThunk
}

const Weather = (props) => {
    const {getCitiesThunk} = props
    const {
        temp,
        pressure,
        humidity,
        speed,
        name,
        description,
        icon,
        chanceRain,
        windDirection
    } = props.weatherCity
    const [inputMode, setInputMode] = useState(false)
    const [modeFahrenheit, setModeFahrenheit] = useState(false)

    useEffect(() => getCitiesThunk(), [])

    const btnClassCelsius = cn({
        'celsius': modeFahrenheit,
        'celsius-light': !modeFahrenheit
    })

    const btnClassFahrenheit = cn({
        'fahrenheit': !modeFahrenheit,
        'fahrenheit-light': modeFahrenheit
    })

    const Menu = () => {
        return (
            <div className="weather_city_box">
                    <div className="weather_city_name">
                    <h1>{name}</h1>
                    </div>
                    <div style={{marginRight: '20px'}} className="weather_city_set">
                    <p onClick={() => setInputMode(true)}>Выбор города</p>
                    </div>
                    <div className="weather_city_lmg">
                    <img style={{marginTop: '15px'}} src={location}/>
                    </div>
                    <div className="weather_city_location">
                    <p>мое местоположение</p>
                    </div>
                </div>
        )
    } 

    return (
        <div className="weather">
            <div className="weather_city">
                {inputMode ? <CityList setInputMode={setInputMode}/> : <Menu/>}
            </div>
			
			<div className="weather_measurement">
                <div className="measurement-box">
                    <div className={btnClassCelsius} onClick={() => temp && setModeFahrenheit(false)}>C</div>
                    <div className={btnClassFahrenheit} onClick={() => temp && setModeFahrenheit(true)}>F</div>
                </div>
            </div>
			<div className="weather_basic">
                <div className="weather_basic_info">
                    <div className="weather_basic_img"><img src={icon}/></div>
                    <div className="weather_basic_temp">
                        <p>{modeFahrenheit ? toFahrenheit(temp) : temp}</p>
                    </div>
                    <div className="weather_basic_degree">
                        <p>{temp && 'o'}</p>
                    </div>
                    <div className="weather_basic_description">
                        <h2>{description}</h2>
                    </div>
                </div>
            </div>
			<div className="weather_wind">
                <div>
                    <p>Ветер</p>
                    <h2>{speed && `${speed} м/с, ${windDirection}`}</h2>
                </div>
                </div>
			<div className="weather_pressure">
                <div>
                    <p>Давление</p>
                    <h2>{pressure && `${pressure} мм рт. ст.`}</h2>
                </div>
            </div>
			<div className="weather_humidity">
                <p>Влажность</p>
                <h2>{humidity && `${humidity}%`}</h2>            </div>
			<div className="weather_chance-rain">
                <p>Вероятность дождя</p>
                <h2>{chanceRain && `${chanceRain}%`}</h2>
            </div>
        </div>
    )

}

export default connect(mapStateToProps, actionCreators)(Weather);