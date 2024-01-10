import { defineStore } from 'pinia'
export const useWeatherStore = defineStore('weather', {
  state: () => ({
    weatherData: null,
    // apiCallCount: 0,
  }),
  // need getter?
  actions: {
    async makeApiCall() {
      const location = process.env.WEATHER_LOCATION;
      const apiKey = process.env.WEATHER_API_KEY;
      console.log(process.env.WEATHER_API_KEY)
      console.log(process.env.WEATHER_LOCATION)
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`)
        const data = await response.json();

        this.weatherData = {
          City: data.name,
          Sunrise: this.formatTime(data.sys.sunrise),
          Sunset: this.formatTime(data.sys.sunset),
          AQI: `${data.main.aqi} AQI`,
          Low: `${this.formatTemp(data.main.temp_min)} °F`,
          High: `${this.formatTemp(data.main.temp_max)} °F`,
          Humidity: `${data.main.humidity} %`,
        };
        // this.apiCallCount++;
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    },
    formatTime(timestamp) {
      const date = new Date(timestamp * 1000);
      const timeFormat = { hour: 'numeric', minute: 'numeric' };
      return date.toLocaleTimeString(undefined, timeFormat);
    },
    formatTemp(kelvin) {
      return Math.round((kelvin - 273.15) * (9 / 5) + 32);
    },
  }
})
