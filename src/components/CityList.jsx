import React, {useState} from 'react';
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
        setTextForm(valueToUpperCase)
        if (valueToUpperCase.length > 2) {
            console.log(cityList[6].city.substring(0, valueToUpperCase.length))
            let searchCities = cityList.filter((c) => c.city.substring(0, valueToUpperCase.length) == valueToUpperCase)
            setSuitableCities(searchCities)
        } else {
            setSuitableCities(null)
        }

    }

    const clickHandler = () => {
        if (textForm === '') {
            setInputMode(false)
            return
        } else {
            getWeatherCityThunk(textForm)
            setInputMode(false)
        }
    }

    const selectCity = (city) => () => {
        setTextForm(city.city)
        setSuitableCities(null)
    }

    return (
        <>
            <div className="search">
                <input type='text' value={textForm} onChange={autoComplite}/>
                <button onClick={clickHandler}>OK</button>
                <div style={{marginTop: '40px'}}>
                    <ul style={{listStyle: 'none'}}>
                        {suitableCities && suitableCities.map((c, i) => <li key={i}
                                                                            onClick={selectCity(c)}>{c.city}</li>)}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default connect(mapStateToProps, actionCreators)(CityList);