const apikey = "a7f6fb1f3ae7436ba78103426251105";
const apiUrl = "https://api.weatherapi.com/v1/current.json";

function $(sel) {
  return document.querySelector(sel);
}

async function checkWeather() {
  //   const response = await fetch(
  //     "https://api.weatherapi.com/v1/current.json?key=a7f6fb1f3ae7436ba78103426251105&q=Kwara",
  //     { mode: "no-cors" }
  //   );
  //   var data = await response.json().then((value) => value);

  //   console.log(data);

  fetch(
    "https://api.weatherapi.com/v1/current.json?key=a7f6fb1f3ae7436ba78103426251105&q=Kwara",
    { mode: "cors" }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      $("#weather_img").src = data.current.condition.icon;
      $("#temp").innerHTML = data.current.temp_c + "&deg;C";
      $("#loc").innerHTML = data.location.name;
      $("#hum").innerHTML = data.current.humidity + "%";
      $("#wind_s").innerHTML = data.current.wind_kph + "km/hr";
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}
window.addEventListener("load", () => {
  checkWeather();
  $('#close').addEventListener('click', ()=>$('#search_result').style.display='none');
  console.log("Hello world");
});

// https://api.openweathermap.org/data/2.5/weather?&units=metric&q=bangalore&appid=863242cfb2b1d357e6093d9a4df19a4b

// https://api.weatherapi.com/v1/current.json?key=a7f6fb1f3ae7436ba78103426251105&q=Kwara

function searchAPI(value) {
  if (!value ||value.length<3){
    $("#search_result ul").innerHTML="";
      $('#search_result').style.display='none';
    return;
  }
  $('#search_result').style.display='block';
  fetch(
    "https://api.weatherapi.com/v1/search.json?key=a7f6fb1f3ae7436ba78103426251105&q=" +
      value,
    { mode: "cors" }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
        if(data.length===0){
            $("#search_result ul").innerHTML="No results found!";
            return;
        }
        $("#search_result ul").innerHTML="";
      data.forEach((res) => {
        let elem = document.createElement("li");
        elem.innerHTML = res.name + ", " +res.region+ ", " + res.country + ".";
        elem.addEventListener('click', ()=>{
          getWeatherData(res.url);
        })
        $("#search_result ul").appendChild(elem);
      });
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}
function getWeatherData(url){
  console.log(url);
    if (!url){
    return;
  }
  fetch(
    "https://api.weatherapi.com/v1/current.json?key=a7f6fb1f3ae7436ba78103426251105&q=" +
      url,
    { mode: "cors" }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    }).then((data) => {
      $("#weather_img").src = data.current.condition.icon;
      $("#temp").innerHTML = data.current.temp_c + "&deg;C";
      $("#loc").innerHTML = data.location.name;
      $("#hum").innerHTML = data.current.humidity + "%";
      $("#wind_s").innerHTML = data.current.wind_kph + "km/hr";
    })
}