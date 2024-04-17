
// RELOJ
function updateTime() {
  var clockElement = document.getElementById('clock');
  var currentDate = new Date();
  var date = currentDate.toDateString();
  var time = currentDate.toLocaleTimeString();

  var dateTimeString = date + ' ' + time;
  clockElement.textContent = dateTimeString;
}

setInterval(updateTime, 1000);


// BOTON CAMBIO DE COLOR
var button = document.getElementById('botonicon');
var isIcon1 = true;

button.addEventListener('click', function () {
  if (isIcon1) {
    button.classList.remove('btn-dark');
    button.classList.add('btn-secondary');
  } else {
    button.classList.remove('btn-secondary');
    button.classList.add('btn-dark');
  }

  isIcon1 = !isIcon1;
});

// COLOR DE FONDO
function changeBackgroundColor() {
  var body = document.body;
  var currentColor = window.getComputedStyle(body).backgroundColor;

  if (currentColor === 'rgb(255, 255, 255)' || currentColor === 'rgba(0, 0, 0, 0)')
    body.style.backgroundColor = 'black';
  else
    body.style.backgroundColor = 'white';
}

window.addEventListener('load', function () {
  changeBackgroundColor();
});



// Cambio de Icono
function changeIcon() {
  var button = document.getElementById('botonicon');
  var icon = document.getElementById('icon');

  if (icon.classList.contains('fa-moon')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
}


//////// Clima ////////
function successCallback(position) {
  const apiKey = 'ac46b7e6f0297600fd560ea0a486277c';
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const locationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  const translationUrl = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=es&dt=t&q=";

  fetch(locationUrl)
    .then(response => response.json())
    .then(locationData => {
      const cityName = locationData.name;

      fetch(translationUrl + locationData.weather[0].description)
        .then(response => response.json())
        .then(translationData => {
          const weatherDescription = translationData[0][0][0];

          const temperatureCelsius = locationData.main.temp - 273.15;

          document.getElementById("clima-actual").innerHTML = `
                      <h2>Clima Actual en ${cityName}</h2>
                      <p>Clima: ${weatherDescription}</p>
                      <p>Temperatura: ${temperatureCelsius.toFixed(2)} °C</p>
                      <p>Humedad: ${locationData.main.humidity} %</p>
                      <p>Viento: ${locationData.wind.speed} m/s</p>
                  `;
        })
        .catch(error => {
          console.log("Error al obtener los datos de traducción:", error);
        });
    })
    .catch(error => {
      console.log("Error al obtener los datos de ubicación:", error);
    });
}

function errorCallback(error) {
  console.log("Error al obtener la ubicación:", error.message);
}




function showDropdown() {
  var dropdownMenu = document.getElementById("dropdownMenu");
  dropdownMenu.style.display = "block";
}

function hideDropdown() {
  var dropdownMenu = document.getElementById("dropdownMenu");
  dropdownMenu.style.display = "none";
}

