<template>
  <div>
    <img v-if="weatherCondition" :src="weatherItems[weatherCondition]" style="width: 100%" />
    <p v-else>Loading...</p>
  </div>
</template>

<script>
export default {
  props: {
    weatherCondition: String,
  },
  computed: {
    weatherItems() {

      if (!this.weatherCondition) return "src/assets/quasar-logo-vertical.svg";

      const weatherPhoto = {
        default: "src/assets/quasar-logo-vertical.svg",
        testing: "src/assets/centerIcon.png",
        thunderstorm: "src/assets/thunderstorm.png",
        shower_rain: "src/assets/showerRain.png",
        rain: "src/assets/rain.png",
        snow: "src/assets/snowflake.png",
        mist: "src/assets/mist.png",
        clear_sky: "src/assets/clearSky.png",
        few_clouds: "src/assets/fewClouds.png",
        partly_cloudy: "src/assets/partlyCloudy.png",
        // drizzle: 'src/assets/drizzle.png',
      };

      if (this.weatherCondition >= 200 && this.weatherCondition <= 299)
        return weatherPhoto["thunderstorm"];

      if (this.weatherCondition >= 300 && this.weatherCondition <= 399)
        return weatherPhoto["shower_rain"];

      if (this.weatherCondition >= 500 && this.weatherCondition <= 599)
        return weatherPhoto["rain"];

      if (this.weatherCondition >= 600 && this.weatherCondition <= 699)
        return weatherPhoto["snow"];

      if (this.weatherCondition >= 700 && this.weatherCondition <= 799)
        return weatherPhoto["mist"];

      if (this.weatherCondition === 800) return weatherPhoto["clear_sky"];

      if (this.weatherCondition >= 801 && this.weatherCondition <= 802)
        return weatherPhoto["few_clouds"];

      if (this.weatherCondition >= 803 && this.weatherCondition <= 804)
        return weatherPhoto["partly_cloudy"];

      else return weatherPhoto['default'];
    },
  },
};
</script>
