
<template>
  <div>
      <q-list v-if="weatherStore.weatherData">
        <q-item v-for="(item, key) in weatherItems" :key="key" dense>
          <q-item-section>{{ item.label }}:</q-item-section>
          <!-- <q-item-section class="text-right">{{ item.value }}</q-item-section> -->
        </q-item>
      </q-list>
      <p v-else>Loading...</p>
  </div>
</template>
<script>
// Grab the useWeatherStore component (instance) from its file
import { useWeatherStore } from 'src/stores/weather';
// https://quasar.dev/quasar-cli-vite/state-management-with-pinia#introduction
export default {
  setup() {
    const weatherStore = useWeatherStore().makeApiCall();
    return {
      weatherStore,
    };
  },
  computed: {
    // * returns a list of labels and values
    weatherItems() {
      // if the api response is invalid return an empty list
      if (!this.weatherStore.weatherData) return [{label: "hey genius", value: "it didn't work"}]; //verified this does work via console

      // small function that puts a label on the temps & humidity, can be used for am/pm on sunrise /sunset
      const addUnitLabel = (value, unitLabel) => `${value} ${unitLabel}`;
      return [
        { label: 'Sunrise', value: this.weatherStore.weatherData.Sunrise },
        { label: 'Sunset', value: this.weatherStore.weatherData.Sunset },
        { label: 'AQI', value: '4 AQIs' },  // filler to keep its spot use next line in production
        // { label: 'AQI', value: addUnitLabel(weatherStore.weatherData.aqi, 'AQI') },
        { label: 'Low', value: addUnitLabel(this.weatherStore.weatherData.temp_min, '°F') },
        { label: 'High', value: addUnitLabel(this.weatherStore.weatherData.temp_max, '°F') },
        { label: 'Humidity', value: addUnitLabel(this.weatherStore.weatherData.humidity, '%') },
      ];
    },
  },
};
</script>
