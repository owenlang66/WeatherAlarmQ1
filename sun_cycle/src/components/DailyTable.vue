
<template>
  <div>
    <!-- If the useWeatherStore instance has weatherData -->
      <q-list v-if="useWeatherStore.weatherData">
        <!-- then weatherItems should be filled with a key & value -->
        <q-item v-for="(item, key) in weatherItems" :key="key" dense>
          <q-item-section>{{ item.label }}:</q-item-section>
          <q-item-section class="text-right">{{ item.value }}</q-item-section>
        </q-item>
      </q-list>
      <p v-else>Loading...</p>
  </div>
</template>

<script>
// Grab the useWeatherStore component (instance) from its file
import { useWeatherStore } from 'src/stores/weather';

export default {
  data() {
    return {
      location: 'Omaha',
      apiKey: process.env.WEATHER_API_KEY,
    };
  },
  computed: {
    weatherItems() {
      if (!this.useWeatherStore.weatherData) return [];
      const addUnitLabel = (value, unitLabel) => `${value} ${unitLabel}`;
      return [
        { label: 'Sunrise', value: this.useWeatherStore.weatherData.Sunrise },
        { label: 'Sunset', value: this.useWeatherStore.weatherData.Sunset },
        { label: 'AQI', value: '4 AQIs' },
        // { label: 'AQI', value: addUnitLabel(useWeatherStore.weatherData.aqi, 'AQI') },
        { label: 'Low', value: addUnitLabel(this.useWeatherStore.weatherData.temp_min, '°F') },
        { label: 'High', value: addUnitLabel(this.useWeatherStore.weatherData.temp_max, '°F') },
        { label: 'Humidity', value: addUnitLabel(this.useWeatherStore.weatherData.humidity, '%') },
      ];
    },
  },
  methods: {
    async fetchWeatherData() {
      // try{
      await this.useWeatherStore.makeApiCall(this.location, this.apiKey);
      // } catch (error) {
      //   console.error('Error fetching weather data:', error);
      // }
    },
  },
  async created() {
    await this.fetchWeatherData();
  }
};
</script>
