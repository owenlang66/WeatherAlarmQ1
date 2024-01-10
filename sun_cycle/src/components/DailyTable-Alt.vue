<template>
  <div>
      <q-list v-if="weatherData">
        <q-item v-for="(value, label) in weatherData" :key="label" dense>
          <q-item-section>{{ label }}:</q-item-section>
          <!-- <q-item-section class="text-right">{{ value }}</q-item-section> -->
          <q-item-section class="text-right">{{ label === 'AQI' ? apiCallCount : value }}</q-item-section>
        </q-item>
      </q-list>
      <p v-else>Loading...</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      weatherData: null,
      apiCallCount: 0,
    };
  },
  // mounted is a "lifecycle hook" in vue which executes after the component has been mounted to the DOM, typically used for asynch api calls (Like this!)
  mounted() {
    if (this.apiCallCount <200) {
      this.makeApiCall();
    } else{
      console.log("API Limit reached, please try again in 24 hours")
    }

  },
  methods: {
    makeApiCall() {
      const location = "Omaha";
      const apiKey = "apiKey";

      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`)
        .then((response) => response.json())
        .then((data) => {
          this.weatherData = {
            City: data.name,
            Sunrise: this.formatTime(data.sys.sunrise),
            Sunset: this.formatTime(data.sys.sunset),
            AQI: `${data.main.aqi} AQI`,
            Low: `${this.formatTemp(data.main.temp_min)} °F`,
            High: `${this.formatTemp(data.main.temp_max)} °F`,
            Humidity: `${data.main.humidity} %`,
          };
          this.apiCallCount++;
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error);
        });
    },
    formatTime(timestamp) {
      const date = new Date(timestamp * 1000);
      const timeFormat = { hour: 'numeric', minute: 'numeric' };
      return date.toLocaleTimeString(undefined, timeFormat);
    },
    formatTemp(kelvin) {
      return Math.round((kelvin - 273.15) * (9 / 5) + 32);
    },
  },
};
</script>
