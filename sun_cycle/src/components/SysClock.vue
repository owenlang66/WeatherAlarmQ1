<template>
    <div class="clock-container">
      <p class="clock-text">{{ currentTime }}</p>
    </div>
</template>

<script>
export default {
  data() {
    return {
      currentTime: this.getCurrentTime(),
    };
  },
  mounted() {
    this.timer = setInterval(() => {
      this.currentTime = this.getCurrentTime();
    }, 1000);
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
  methods: {
    getCurrentTime() {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      const period = hours >= 12 ? 'PM' : 'AM';

      // Put in if statement in settings
      hours = hours % 12;
      hours = hours === 0 ? 12 : hours;

      return `${hours}:${minutes}:${seconds} ${period}`;
    },
  },
}
</script>

<style scoped>
.clock-container {
  text-align: center;
}

.clock-text {
  font-size: 15vw;
}

@media screen and (min-width: 250px) {
  .clock-text {
    font-size: 28pt;
  }
}
</style>
