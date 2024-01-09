
<!-- original DailyTable -->
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

<!-- <template>
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
    const location = "Tacoma";
    const apiKey = "d08fafc0d470e65a2747ce5ff5425fbf";

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        this.weatherData = {
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
</script> -->
