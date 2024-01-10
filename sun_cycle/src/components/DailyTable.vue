
<template>
  <div>
      <q-list v-if="weatherStore.weatherData">
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
      location: 'Omaha',
      apiKey: 'd08fafc0d470e65a2747ce5ff5425fbf',
    };
  },
  computed: {
    weatherItems() {
      if (!this.weatherStore.weatherData) return [];
      const addUnitLabel = (value, unitLabel) => `${value} ${unitLabel}`;
      return [
        { label: 'Sunrise', value: weatherStore.weatherData.Sunrise },
        { label: 'Sunset', value: weatherStore.weatherData.Sunset },
        { label: 'AQI', value: '4 AQIs' },
        // { label: 'AQI', value: addUnitLabel(weatherStore.weatherData.aqi, 'AQI') },
        { label: 'Low', value: addUnitLabel(weatherStore.weatherData.temp_min, '°F') },
        { label: 'High', value: addUnitLabel(weatherStore.weatherData.temp_max, '°F') },
        { label: 'Humidity', value: addUnitLabel(weatherStore.weatherData.humidity, '%') },
      ];
    },
  },
  methods: {
    async fetchWeatherData() {
      try{
        await this.weatherStore.makeApiCall(this.location, this.apiKey);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    },
  },
  async created() {
    await this.fetchWeatherData();
  }
};
</script>
