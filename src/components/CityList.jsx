import React, { useState } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import translitRusEng from 'translit-rus-eng';

const mapStateToProps = (state) => ({
    cityList: state.cityList,
    isFetching: state.isFetching,
})

const actionCreators = {
    togglePreloader: actions.togglePreloader,
    setWeatherCity: actions.setWeatherCity,
    getWeatherCityThunk: actions.getWeatherCityThunk
}


const CityList = (props) => {
    const {cityList, getWeatherCityThunk, setInputMode} = props
    const [textForm, setTextForm] = useState('')
    const [suitableCities, setSuitableCities] = useState(null)

    const autoComplite = (e) => {
        const {value} = e.target
        const valueToUpperCase = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
        const translitRus = translitRusEng(valueToUpperCase)
        setTextForm(valueToUpperCase)
        if (translitRus.length > 3) {
            
            let searchCities = cityList.filter((city) => city.name.substring(0, translitRus.length) == translitRus)
            setSuitableCities(searchCities)
        } 
        else { 
            setSuitableCities(null) 
        }

    }

    const clickHandler = () => {
        const city = cityList.filter((city) => translitRusEng(textForm) == city.name)
        city.length > 0 ? getWeatherCityThunk(city[0].id) : alert('не нашлось, попробуйте выбрать из предлагаемого списка.')
        setInputMode(false)
    }

    const selectCity = (city) => () => {
        setTextForm(translitRusEng(city.name,  { engToRus: true }))
        console.log(translitRusEng(city.name,  { engToRus: true }))
        setSuitableCities(null)
    }

    return (
        <>
             <div className="search">
            <input type='text' value={textForm} onChange={autoComplite} />
            <button onClick={clickHandler}>OK</button>
            </div>
            <ul style={{position: 'absolute'}}>
            {suitableCities && suitableCities.map((city, i) => <li key={i} onClick={selectCity(city)}>{translitRusEng(city.name,  { engToRus: true })}</li>)}
            </ul>
        </>
    )
} 

export default connect(mapStateToProps, actionCreators)(CityList);