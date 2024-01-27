<!--
    THIS IS THE DAILY TABLE FOR INPUTTING THE LOCATION FOR API DATA, CURRENTLY NOT BEING UTILIZED

    WE ARE CURRENTLY USING DAILYTABLEALT WHICH UTILIZES THE GPS COORDS
 -->

<template>
  <div>
    <q-list v-if="weatherData">
      <q-item v-for="(value, label) in weatherData" :key="label" dense>
        <q-item-section>{{ label }}:</q-item-section>
        <q-item-section class="text-right">{{ value }}</q-item-section>
      </q-item>
    </q-list>
    <p v-else>Loading...</p>
  </div>
</template>

<script>
import { ref } from "vue";
import { WEATHER_API_KEY } from "../../config.js";

export default {
  data() {
    return {
      weatherData: null,
    };
  },
  mounted() {
    this.getCurrentLocation();
  },
  methods: {
    // snagging those hot location coords
    getCurrentLocation() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.fetchWeatherData(latitude, longitude);
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    },
    // bringing in coords and using them in the api call
    fetchWeatherData(latitude, longitude) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("API Response Data:", data);
          if (data && data.sys && data.sys.sunrise) {
            this.weatherData = {
              City: data.name,
              Sunrise: this.formatTime(data.sys.sunrise, data.timezone),
              Sunset: this.formatTime(data.sys.sunset, data.timezone),
              Temperature: `${this.formatTemp(data.main.temp)} °F`,
              Low: `${this.formatTemp(data.main.temp_min)} °F`,
              High: `${this.formatTemp(data.main.temp_max)} °F`,
              Humidity: `${data.main.humidity} %`,
            };
          } else {
            throw new Error("Unexpected API format");
          }
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    },
    // creating a new date object with timezone and stamp offset converted to seconds
    formatTime(timestamp, timezone) {
      const date = new Date((timestamp + timezone) * 1000);

      // snagging the hours and minutes
      const hours = date.getUTCHours();
      const minutes = date.getUTCMinutes();

      // Pad single-digit minutes with a leading zero (e.g. if the time were 9:04 it pads the ':04' with a zero, so it's not '9:4')
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

      // Format the time as "hh:mm"
      const localTime = `${hours}:${formattedMinutes}`;

      return localTime;
    },
    formatTemp(kelvin) {
      return Math.round((kelvin - 273.15) * (9 / 5) + 32);
    },
  },
};
</script>


<template>
  <div>
    <q-list v-if="weatherData">
      <q-item v-for="(value, label) in weatherData" :key="label" dense>
        <q-item-section>{{ label }}:</q-item-section>
        <q-item-section class="text-right">{{ value }}</q-item-section>
      </q-item>
    </q-list>
    <p v-else>Loading...</p>
  </div>
</template>

<script>
import { WEATHER_API_KEY, WEATHER_LOCATION } from "../../config.js";

export default {
  data() {
    return {
      weatherData: null,
    };
  },
  mounted() {
    // testing purposes
    console.log("Location:", WEATHER_LOCATION);
    console.log("API Key:", WEATHER_API_KEY);

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${WEATHER_LOCATION}&appid=${WEATHER_API_KEY}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("API Response Data:", data);
        if (data && data.sys && data.sys.sunrise) {
          this.weatherData = {
            City: data.name,
            Sunrise: this.formatTime(data.sys.sunrise, data.timezone),
            Sunset: this.formatTime(data.sys.sunset, data.timezone),
            Temperature: `${this.formatTemp(data.main.temp)} °F`,
            Low: `${this.formatTemp(data.main.temp_min)} °F`,
            High: `${this.formatTemp(data.main.temp_max)} °F`,
            Humidity: `${data.main.humidity} %`,
          };
        } else {
          throw new Error("Unexpected API format");
        }
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  },
  methods: {
    // creating a new date object with timezone and stamp offset converted to seconds
    formatTime(timestamp, timezone) {
    const date = new Date((timestamp + timezone) * 1000);

    // snagging the hours and minutes
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    // Pad single-digit minutes with a leading zero (e.g. if the time were 9:04 it pads the ':04' with a zero, so it's not '9:4')
    const formattedMinutes = (minutes < 10) ? `0${minutes}` : minutes;

    // Format the time as "hh:mm"
    const localTime = `${hours}:${formattedMinutes}`;

    return localTime;
  },
    formatTemp(kelvin) {
      return Math.round((kelvin - 273.15) * (9 / 5) + 32);
    },
  },
};
</script>
