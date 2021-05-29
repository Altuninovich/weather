import cloud from './img/svg/cloud.svg';
import rain from './img/svg/rain.svg';
import strom from './img/svg/strom.svg';
import sun from './img/svg/sun@2x.svg';
import partlyCloudy from './img/svg/partly cloudy.svg';

export const getIcon = (id) => {

const idIcin = {
    '01d': sun,
    '01n': sun,
    '02d': partlyCloudy,
    '02n': partlyCloudy,
    '03d': cloud,
    '04d': cloud,
    '04n': cloud,
    '50d': cloud,
    '50n': cloud,
    '09d': rain,
    '09n': rain,
    '10d': rain,
    '10n': rain,
    '13d': rain,
    '13n': rain,
    '11d': strom,
    '11n': strom
}

return idIcin[id]

}
