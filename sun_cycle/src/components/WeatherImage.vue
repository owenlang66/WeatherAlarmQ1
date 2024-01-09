<template>
  <div>
      <img v-if="weatherData" :src="weatherItems" style="width: 100%;"/>
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
    if (!this.weatherData) return 'src/assets/quasar-logo-vertical.svg';
    const weatherCondition = this.weatherData.weather[0].main;

    const weatherPhoto = {
      default: 'src/assets/quasar-logo-vertical.svg',
      rain: 'src/assets/rain.png',
      testing: 'src/assets/centerIcon.png',
      // 'clear sky': 'src/assets/clearSky.png',
      // 'few_clouds': 'src/assets/fewClouds.png',
      // 'scattered clouds': 'src/assets/scatteredClouds.png',
      // 'broken clouds': 'src/assets/brokenClouds.png',
      // 'shower rain': 'src/assets/showerRain.png',
      // thunderstorm: 'src/assets/thunderstorm.png',
      // snow: 'src/assets/snow.png',
      // mist: 'src/assets/mist.png',
      // drizzle: 'src/assets/drizzle.png',
      // clear: 'src/assets/clear.png',
    }
    return weatherPhoto[weatherCondition] || weatherPhoto.default;
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

  },
  mounted() {
    this.fetchWeatherData();
  },
};
</script>
