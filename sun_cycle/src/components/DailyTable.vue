<template>
  <div>

    <div v-if="weatherData">
      <q-list>
        <q-item dense>
          <q-item-section>Sunrise: </q-item-section>
          <q-item-section class="text-right">{{ formattedSunrise }}</q-item-section>
        </q-item>
        <q-item dense>
          <q-item-section>Sunset: </q-item-section>
          <q-item-section class="text-right">{{ formattedSunset }}</q-item-section>
        </q-item>
        <q-item dense>
          <q-item-section>Min Temp: </q-item-section>
          <q-item-section class="text-right">{{ formatTemp(weatherData.main[0].temp_min) }}</q-item-section>
        </q-item>
        <q-item dense>
          <q-item-section>Max Temp: </q-item-section>
          <q-item-section class="text-right">{{ formatTemp(weatherData.main[0].temp_max) }}</q-item-section>
        </q-item>
        <q-item dense>
          <q-item-section>Humidity: </q-item-section>
          <q-item-section class="text-right">{{ weatherData.main[0].humidity }}</q-item-section>
        </q-item>
        <q-item dense>
          <q-item-section>AQI: </q-item-section>
          <q-item-section class="text-right">{{ weatherData.main[0].aqi }}</q-item-section>
        </q-item>
      </q-list>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      weatherData: null,
    };
  },
  computed: {
    formattedSunrise() {
      return this.weatherData ? this.formatTime(this.weatherData.main[0].sunrise) : '';
    },
    formattedSunset() {
      return this.weatherData ? this.formatTime(this.weatherData.main[0].sunset) : '';
    },
  },
  methods: {
    async fetchWeatherData() {
      try {
        const response = await fetch('src/assets/weather.json');
        this.weatherData = await response.json();
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    },
    formatTime(timestamp) {
      const date = new Date(timestamp * 1000);
      const timeFormat = {hour: 'numeric', minute: 'numeric', hour12:false};
      return date.toLocaleTimeString(undefined, timeFormat);
    },
    formatTemp(kelvin) {
      return Math.round((kelvin - 273.15) * (9/5) + 32);
    }
  },
  mounted() {
    this.fetchWeatherData();
  },
};
</script>
