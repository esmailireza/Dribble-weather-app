// chart.js codes
const ctx = document.getElementById("myChart").getContext("2d");
let inputName = document.querySelector("input");
const titleTemp = document.querySelector(".sec-left h1");
const locationName = document.querySelector(".sec-left p");
const searchBtn = document.querySelector(".input-list span");
const description = document.querySelector(".sec-right #descWeather");
const dayName = document.querySelector(".sec-right #dayName");
const timeShow = document.querySelector(".sec-right h4");
console.log(description);

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
      //temperature
      let tempValue = Math.round(getApi.main.temp);
      console.log(tempValue);
      titleTemp.innerHTML = `${tempValue}°`;
      //city name
      let cityName = getApi.name;
      let countryName = getApi.sys.country;
      console.log(countryName);
      locationName.innerHTML = `${cityName}, ${countryName}`;
    }
    requestApi();
  } catch (error) {
    console.log(error);
  }
}
