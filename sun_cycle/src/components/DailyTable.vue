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
export default {
  data() {
    return {
      weatherData: null,
    };
  },
  // mounted is a "lifecycle hook" in vue which executes after the component has been mounted to the DOM, typically used for asynch api calls (Like this!)
  mounted() {
    const location = "Johannesburg";
    const apiKey = "key";

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        this.weatherData = {
          City: data.name,
          Sunrise: this.formatTime(data.sys.sunrise),
          Sunset: this.formatTime(data.sys.sunset),
          // AQI: `${data.main.aqi} AQI`,
          Low: `${this.formatTemp(data.main.temp_min)} °F`,
          High: `${this.formatTemp(data.main.temp_max)} °F`,
          Humidity: `${data.main.humidity} %`,
        };
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  },
  methods: {
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
