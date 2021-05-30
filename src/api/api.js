import axios from 'axios';

export const getCities = async () => {
  try {
    const response = await axios.get('/cities.json')
    return response.data
  } catch (e) {
    throw e
  }  
}

export const getWeatherCity = async (cityName) => {
  try {
    const appid = '2692d95687b9f0aef0d3da58989f4a57'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${appid}&units=metric&lang=ru`
    const response = await axios.get(url)
    return response.data
  } catch (e) {
    alert('город не найден, попробуйте выбрать другой')
    throw e
  }
}

