// script.js
function getWeather(e) {
  e.preventDefault();
  const city = document.getElementById('city').value;
  const country = document.getElementById('country').value;
  const weatherInfo = document.getElementById('weather-info');
  const htmlBody = document.getElementsByTagName("body")[0];
  const loaderContainer = document.getElementById('loaderContainer');
  const sunriseTime = document.getElementById("sunriseTimeStamp");

  // Note: After activating this key again, you need to wait for around 2 or 3 hrs before using it.  
  const apiKey = 'e5e04ac75ad242dbc6f69a146aac5edd'; // keyname: github_weather_app_1
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?id=524901&q=${city},${country}&appid=${apiKey}`;

  loaderContainer.style.display = 'flex'; // Show loader

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const temperature = kelvinToCelsius(data.main.temp);
      const description = data.weather[0].description;
      const main = data.weather[0].main;
      const sunriseTimeStamp = new Date(data.sys.sunrise);

      weatherInfo.innerHTML = `<p>Temperature: ${temperature} &deg;C</p>
                                  <p>Description: ${description}</p>`;

      sunriseTime.innerText = `${sunriseTimeStamp.getUTCHours()}: ${sunriseTimeStamp.getUTCMinutes()}`;
      if (Object.values(WeatherMain).includes(main)) {
        htmlBody.style.background = `url(assets/backgrounds/${main}.jpg) center/cover`;
      }
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      weatherInfo.innerHTML = '<p>Error fetching weather data</p>';
    })
    .finally(() => {
      loaderContainer.style.display = 'none'; // hide loader
    });
}

// debouncing
// specific name
function getCountryList(e) {
  const countryList = document.getElementById('country-list');
  const search = e.target.value;

  if (!search?.length) return;

  // Fetch the list of countries from Rest Countries API
  fetch(`https://restcountries.com/v3.1/name/${search}`)
  .then(response => response.json())
  .then(data => {
    // Process the data, e.g., extract country names
    const countryNames = data.map(country => country.name.common).splice(0, 10);

    // Use the country names in your application (e.g., populate a dropdown)
    countryList.innerHTML = countryNames.map(name => `<option value="${name}">`).join(" ");
  })
  .catch(error => console.error('Error fetching countries:', error));
}
  

const getCountryListDeb = debounce(getCountryList, 400);

function getCityList(e) {
  const country = document.getElementById("country").value;
  const cityList = document.getElementById("city-list");
  const search = e.target.value;

  fetch(`http://api.geonames.org/searchJSON?name=${search}&fuzzy=0&countryName=${country}&maxRows=5&username=ashishduklan`) // change username to any random name, use amit, rahul etc.
    .then(res => res.json())
    .then(data => {
      const cityNames = [...new Set(data.geonames.map(city => city.name).filter(name => name.length))];

      cityList.innerHTML = cityNames.map(name => `<option value="${name}">`).join("");
    })
    .catch(error =>console.error("Error fetching cities", error));
}

const getCityListDeb = debounce(getCityList, 400);
