import axios from 'axios';

export const getCities = async () => {
  /*
  const config = {
    method: 'get',
    url: 'http://localhost:3000/city.list.json'
  };
  
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });

*/
    const response = await axios.get('http://localhost:3000/city.list.json')
    const russianSities  = response.data.filter((sity) => sity.country === 'RU')
    return russianSities
    
}

export const getWeatherCity = async (idCity) => {
    const appid = '2692d95687b9f0aef0d3da58989f4a57'
    const url = `http://api.openweathermap.org/data/2.5/weather?id=${idCity}&appid=${appid}&units=metric&lang=ru`
    const response = await axios.get(url)
    return response.data
}

/*
export const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    try {
      if (body) {
        body = JSON.stringify(body)
        headers['Content-Type'] = 'application/json'
      }

      const response = await fetch(url, {method, body, headers})
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Что-то пошло не так')
      }
      return data
    } catch (e) {
      return e.message
    }
  }, [])
*/


/*
  const config = {
    method: 'get',
    url: 'http://localhost:3000/j.json'
  };
  
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });

  */