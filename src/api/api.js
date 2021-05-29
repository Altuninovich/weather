import axios from 'axios';

export const getCities = async () => {
  try {
    const response = await axios.get('/city.list.json')
    const russianSities  = response.data.filter((sity) => sity.country === 'RU')
    return russianSities
  } catch (e) {
    throw e
  }  
}

export const getWeatherCity = async (idCity) => {
  try {
    const appid = '2692d95687b9f0aef0d3da58989f4a57'
    const url = `http://api.openweathermap.org/data/2.5/weather?id=${idCity}&appid=${appid}&units=metric&lang=ru`
    const response = await axios.get(url)
    return response.data
  } catch (e) {
    throw e
  }
}

