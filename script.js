// Variable 
const cityName = document.querySelector('#weatherInput');
const searchBtn = document.querySelector('#searchBtn');
const form = document.getElementById('weatherForm');
const myCity = document.getElementById('city');
const image = document.getElementById('weatherImage');
const weather = document.getElementById('weatherMain');
const temp = document.querySelector('.temp');
const dates = document.querySelector('.todayDates');
const times = document.getElementById('todayTime');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMsg = document.getElementById('errorMsg');
let date = new Date();


// Function work when user input the city name
form.addEventListener('submit', function (e) {

    // preventDefault() to stop page reload
    e.preventDefault();

    // Updating the city name
    const city = cityName.value.trim();
    const myWeatherContainer = document.querySelector('.weatherContainer')

    // Reset UI
    errorMsg.style.display = 'none';
    loadingSpinner.style.display = 'block';
    myCity.innerHTML = '';
    temp.innerHTML = '';
    weather.innerHTML = '';
    image.src = '';
    dates.innerHTML = '';
    times.innerHTML = '';

    if (!city) {
        loadingSpinner.style.display = 'none';
        errorMsg.innerText = 'Please enter a city name!';
        errorMsg.style.display = 'block';
        return;
    }

    // API URL
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=931f131dde3f4ae2fcbc3289fc646471`

    // fetching data from the weather api
    fetch(url).then((response) => {
        return response.json();
    }).then((data) => {
        loadingSpinner.style.display = 'none';
        if (data.cod !== 200) {
            errorMsg.innerText = data.message ? data.message : 'City not found!';
            errorMsg.style.display = 'block';
            return;
        }

        const tempValue = Math.round(data['main']['temp']);
        const weatherMain = data['weather'][0]['main'];
        weather.innerHTML = weatherMain;

        // Updating the DOM
        myCity.innerHTML = city;
        temp.innerHTML = `${tempValue}<span><sup>o</sup>C</span>`;
        weather.innerHTML = `${weatherMain}`;

        // Animate weather info
        temp.style.opacity = 0;
        temp.style.transform = 'translateY(30px)';
        weather.style.opacity = 0;
        weather.style.transform = 'translateY(30px)';
        setTimeout(() => {
            temp.style.animation = 'fadeInUp 0.8s 0.2s forwards';
            weather.style.animation = 'fadeInUp 0.8s 0.4s forwards';
        }, 100);

        // Updating the Images according to the weather
        if (weatherMain == 'Clear') {
            image.src = `./Images/sunny.png`
            myWeatherContainer.style.backgroundColor = '#ec6e4c'
        }
        if (weatherMain == 'Clouds') {
            image.src = `./Images/clouds.png`
            myWeatherContainer.style.backgroundColor = '#86d3d3'
        }
        if (weatherMain == 'Rain') {
            image.src = `./Images/Rain.png`
            myWeatherContainer.style.backgroundColor = '#494bcf'
        }
        if (weatherMain == 'Drizzle') {
            image.src = `./Images/Drizzle.png`
            myWeatherContainer.style.backgroundColor = '#8ecfcf'
        }
        if (weatherMain == 'Haze') {
            image.src = `./Images/Drizzle.png`
            myWeatherContainer.style.backgroundColor = '#d8ced2'
        }

        // Updating dates
        const currentMonth = date.getMonth();
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept.', 'Oct.', 'Nov', 'Dec'];
        dates.innerHTML = `${date.getDate()}, ${months[currentMonth]}`;

        // Updating times       
        function leftInterval() {
            const left = document.getElementById('todayTime')
            let leftDate = new Date();
            let hours = leftDate.getHours();
            let minutes = leftDate.getMinutes();
            let seconds = leftDate.getSeconds();

            if(hours == 0){
                hours = 12;
            }
            
            if(hours > 12){
                hours = hours - 12;
            }
            left.innerHTML = `${hours}h: ${minutes}m: ${seconds}s`
        }
        setInterval(leftInterval, 1000);
    }).catch(() => {
        loadingSpinner.style.display = 'none';
        errorMsg.innerText = 'Network error. Please try again!';
        errorMsg.style.display = 'block';
    });
})
