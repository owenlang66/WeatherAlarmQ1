
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
// Grab the useWeatherStore component (instance) from its file
import { computed } from 'vue';
import { useWeatherStore } from 'src/stores/weather';
import { storeToRefs } from 'pinia';

export default {
  setup() {
    const weatherStore = useWeatherStore();
    const rawData = computed(()=>weatherStore.makeApiCall);
    console.log(rawData)
    return {
      // these will eventually be subbed out for user input
      location: 'Omaha',
      apiKey: process.env.WEATHER_API_KEY,
      weatherStore,
    };
  },
  computed: {
    // returns a list of labels and values
    weatherItems() {
      // if the api response is invalid return an empty list
      if (!this.weatherStore.weatherData) return [];

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
  methods: {

    async fetchWeatherData() {
      console.log(this.location, this.apiKey)
      await this.useWeatherStore.makeApiCall(this.location, this.apiKey);
    },
  },
  async mounted() {
    await this.fetchWeatherData();
  }
};
</script>

<!--
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
    const apiKey = "d08fafc0d470e65a2747ce5ff5425fbf";

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
 -->
