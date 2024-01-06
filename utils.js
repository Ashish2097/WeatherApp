// debounces provided func
function debounce(func, delay = 400) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// kelvin to celsius
function kelvinToCelsius(kelvin) {
  if (typeof kelvin !== 'number' || isNaN(kelvin)) {
    return 'Invalid input. Please provide a valid number for Kelvin temperature.';
  }

  const celsius = kelvin - 273.15;
  return celsius.toFixed(2); // Round to 2 decimal places
}
