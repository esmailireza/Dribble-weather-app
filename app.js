// chart.js codes
const ctx = document.getElementById("myChart").getContext("2d");
let inputName = document.querySelector("input");
const titleTemp = document.querySelector(".sec-left h1");
const locationName = document.querySelector(".sec-left p");
const searchBtn = document.querySelector(".input-list span");
const description = document.querySelector(".sec-right #descWeather");
const dayName = document.querySelector(".sec-right #dayName");
const timeShow = document.querySelector(".sec-right h4");
const imageIcon = document.querySelector(".sec-left img");
const humidity = document.querySelector("#humidity p");
const sunriseTag = document.querySelector("#sunrise p");
const sunsetTag = document.querySelector("#sunset p");

console.log(humidity);

searchBtn.addEventListener("click", searchHandler);
//console.log(searchBtn);
//console.log(locationName);
const myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: ["12 AM", "4 AM", "8 AM", "12 PM", "4 PM"],
    datasets: [
      {
        label: "Temperature",
        data: [0, 10, -10, 20, -20],
        borderWidth: 1,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        borderColor: "#7285ff",
        backgroundColor: "#7285ff38",
        responsive: true,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
      maintainAspectRatio: false,
    },
    plugins: {
      title: {
        display: true,
        text: " Temperature . Precipitation . Wind",
        align: "start",
      },
    },
  },
});
//////
window.addEventListener("load", reloadPage);
inputName.focus();
//console.log(inputName);
/* inputName.addEventListener("change", (e) => {
  console.log(e.target.value);
}); */
inputName.onchange = (e) => {
  //console.log("value :", e.target.value);
  const myApi = {
    key: "cc7db574f882a8b3ccab423705ffabd8",
    basePoint: "api.openweathermap.org/data/2.5/",
    nameValue: e.target.value,
  };
  /* console.log(myApi.basePoint);
  console.log(myApi.key); */
  try {
    async function requestApi() {
      let getApi = await fetch(
        `https://${myApi.basePoint}weather?q=${myApi.nameValue}&units=metric&appid=${myApi.key}`
      ).then((response) => response.json());
      // show icon
      let iconValue = getApi.weather[0].icon;
      imageIcon.src = `http://openweathermap.org/img/wn/${iconValue}@2x.png`;
      console.log(getApi.weather[0].icon);
      console.log(getApi);
      //temperature
      let tempValue = Math.round(getApi.main.temp);
      console.log(tempValue);
      titleTemp.innerHTML = `${tempValue}°`;
      //city name
      let cityName = getApi.name;
      let countryName = getApi.sys.country;
      console.log(countryName);
      locationName.innerHTML = `${cityName}, ${countryName}`;
      //description weather
      let desValue = getApi.weather[0].description;
      console.log();
      description.innerHTML = desValue;
      //day name
      let date = new Date();
      console.log(date);
      let day = date.getDay(); //index day
      let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      console.log(day);
      let nameOfDay = days[day];
      console.log(nameOfDay);
      console.log(dayName);
      dayName.innerHTML = `, ${nameOfDay}`;

      // clock
      function getHour() {
        let date = new Date();
        let hour = date.getHours();
        let minutes = date.getMinutes();
        /* let seconds = date.getSeconds(); */
        let p = "AM";
        if (hour > 12) {
          p = "PM";
          hour = hour - 12;
        }
        if (hour < 10) {
          hour = "0" + hour;
        }
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        /*  if (seconds < 10) {
          seconds = "0" + seconds;
        } */
        let concat = hour + ":" + minutes + " " + p;
        timeShow.textContent = concat;
        setTimeout(getHour, 1000);
      }
      getHour();
      // weather icon
      /* console.log(
        (imageIcon.src.innerHTML =
          "http://openweathermap.org/img/wn/10d@2x.png")
      );
      imageIcon.innerHTML = `<img src = "http://openweathermap.org/img/wn/10d@2x.png" class="image-sun"/>`; */
      // humidity
      let getHumi = getApi.main.humidity;
      humidity.innerHTML = `${getHumi}%`;
      //sunrise time
      console.log(getApi.sys.sunrise);
      let unixTimepstampSunrise = getApi.sys.sunrise;
      let dateNewSunrise = new Date(unixTimepstampSunrise * 1000);
      let hour = dateNewSunrise.getHours();
      let minutes = dateNewSunrise.getMinutes();
      /* let seconds = date.getSeconds(); */
      let p = "AM";
      if (hour > 12) {
        p = "PM";
        hour = hour - 12;
      }
      if (hour < 10) {
        hour = "0" + hour;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      let concat = hour + ":" + minutes + " " + p;
      sunriseTag.textContent = concat;
      //sunset time

      console.log(getApi.sys.sunset);
      let unixTimepstampSunset = getApi.sys.sunset;
      let dateNewSunset = new Date(unixTimepstampSunset * 1000);
      hour = dateNewSunset.getHours();
      minutes = dateNewSunset.getMinutes();
      /* let seconds = date.getSeconds(); */
      p = "AM";
      if (hour > 12) {
        p = "PM";
        hour = hour - 12;
      }
      if (hour < 10) {
        hour = "0" + hour;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      concat = hour + ":" + minutes + " " + p;
      sunsetTag.textContent = concat;
    }
    requestApi();
  } catch (error) {
    console.log(error);
  }
  /*console.log(response);
  
  console.log(response); */
};

//remove input value
function searchHandler() {
  inputName.value = "";
}
function reloadPage() {
  console.log("reload");
  const myApi = {
    key: "cc7db574f882a8b3ccab423705ffabd8",
    basePoint: "api.openweathermap.org/data/2.5/",
    nameValue: "urmia",
  };
  try {
    async function requestApi() {
      let getApi = await fetch(
        `https://${myApi.basePoint}weather?q=${myApi.nameValue}&units=metric&appid=${myApi.key}`
      ).then((response) => response.json());
      console.log(getApi);
      // show icon
      let iconValue = getApi.weather[0].icon;
      imageIcon.src = `http://openweathermap.org/img/wn/${iconValue}@2x.png`;
      console.log(getApi.weather[0].icon);
      console.log(getApi);
      //temperature
      let tempValue = Math.round(getApi.main.temp);
      console.log(tempValue);
      titleTemp.innerHTML = `${tempValue}°`;
      //city name
      let cityName = getApi.name;
      let countryName = getApi.sys.country;
      console.log(countryName);
      locationName.innerHTML = `${cityName}, ${countryName}`;
      ////////
      //description weather
      let desValue = getApi.weather[0].description;
      console.log();
      description.innerHTML = desValue;
      //day name
      let date = new Date();
      console.log(date);
      let day = date.getDay(); //index day
      let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      console.log(day);
      let nameOfDay = days[day];
      console.log(nameOfDay);
      console.log(dayName);
      dayName.innerHTML = `, ${nameOfDay}`;

      // clock
      function getHour() {
        let date = new Date();
        let hour = date.getHours();
        let minutes = date.getMinutes();
        /* let seconds = date.getSeconds(); */
        let p = "AM";
        if (hour > 12) {
          p = "PM";
          hour = hour - 12;
        }
        if (hour < 10) {
          hour = "0" + hour;
        }
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        /*  if (seconds < 10) {
          seconds = "0" + seconds;
        } */
        let concat = hour + ":" + minutes + " " + p;
        timeShow.textContent = concat;
        setTimeout(getHour, 1000);
      }
      getHour();
      // humidity
      let getHumi = getApi.main.humidity;
      humidity.innerHTML = `${getHumi}%`;
      //sunrise time
      console.log(getApi.sys.sunrise);
      let unixTimepstamp = getApi.sys.sunrise;
      let dateNew = new Date(unixTimepstamp * 1000);
      let hour = dateNew.getHours();
      let minutes = dateNew.getMinutes();
      /* let seconds = date.getSeconds(); */
      let p = "AM";
      if (hour > 12) {
        p = "PM";
        hour = hour - 12;
      }
      if (hour < 10) {
        hour = "0" + hour;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      let concat = hour + ":" + minutes + " " + p;
      sunriseTag.textContent = concat;
      //sunset time

      console.log(getApi.sys.sunset);
      let unixTimepstampSunset = getApi.sys.sunset;
      let dateNewSunset = new Date(unixTimepstampSunset * 1000);
      hour = dateNewSunset.getHours();
      minutes = dateNewSunset.getMinutes();
      /* let seconds = date.getSeconds(); */
      p = "AM";
      if (hour > 12) {
        p = "PM";
        hour = hour - 12;
      }
      if (hour < 10) {
        hour = "0" + hour;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      concat = hour + ":" + minutes + " " + p;
      sunsetTag.textContent = concat;
    }
    requestApi();
  } catch (error) {
    console.log(error);
  }
}
