<template>
  <div>
      <q-list v-if="weatherData">
        <q-item v-for="(item, key) in weatherItems" :key="key" dense>
          <q-item-section>{{ item.label }}:</q-item-section>
          <q-item-section class="text-right">{{ item.value }}</q-item-section>
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
  computed: {
  weatherItems() {
    if (!this.weatherData) return [];
    const mainData = this.weatherData.main[0];

    const addUnitLabel = (value, unitLabel) => `${value} ${unitLabel}`;

    return [
      { label: 'Sunrise', value: this.formatTime(mainData.sunrise) },
      { label: 'Sunset', value: this.formatTime(mainData.sunset) },
      { label: 'AQI', value: addUnitLabel(mainData.aqi, 'AQI') },
      { label: 'Low', value: addUnitLabel(this.formatTemp(mainData.temp_min), '°F') },
      { label: 'High', value: addUnitLabel(this.formatTemp(mainData.temp_max), '°F') },
      { label: 'Humidity', value: addUnitLabel(mainData.humidity, '%') },
    ];
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
      const timeFormat = {hour: 'numeric', minute: 'numeric'}; // add ic' hour12:false for 12 hour time
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
