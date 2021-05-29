export const getWindDirection = (deg) => {
    if (deg === 0 || deg > 360) {
        return 'штиль или из космоса'
    }
    if (deg >= 337.5 || deg < 22.5) {
        return 'южный'
    }
    if (deg >= 22.5 && deg < 67.5) {
        return 'юго-западный'
    }
    if (deg >= 67.5 && deg < 112.5) {
        return 'западный'
    }
    if (deg >= 112.5 && deg < 157.5) {
        return 'северо-западный'
    }
    if (deg >= 157.5 && deg < 202.5) {
        return 'северный'
    }
    if (deg >= 202.5 && deg < 247.5) {
        return 'северо-восточный'
    }
    if (deg >= 247.5 && deg < 292.5) {
        return 'восточный'
    }
    if (deg >= 292.5 && deg < 337.5) {
        return 'юго-восточный'
    }

}