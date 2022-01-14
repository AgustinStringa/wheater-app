export const toCelsius = (temp) => {
    return parseInt(temp - (273.15)).toFixed(2)
}

export const firstUpperCase = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
}