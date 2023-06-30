// Store's HTML elements inside js variables.
const inputBox = document.querySelector(".input-box");
const btn = document.querySelector(".btn");
const weatherIcon = document.querySelector(".weather-icon");
// Store's api key and url inside js variables.
const apikey = "b95639311d1eba30879721f66b446e0f";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
// The async function below takes in an argument 'city' to fetch user inputs from the server.
async function checkWeather(city) {
  /*Response variable stores the concatenation of the api url, api key and user input('city')
    before its fetched from the server*/
  const response = await fetch(apiUrl + city + `&appid=${apikey}`);
  // The if statement below checks if the input submitted by the user is valid.
  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    // Stores the fetched data (JSON) from the server.
    let data = await response.json();

    console.log(data);
    //Update's the fetched data to the HTML DOM.
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

btn.addEventListener("click", () => {
  // Calls the checkWeather() function and assign the user input as an arguement to the function.
  checkWeather(inputBox.value);
});
