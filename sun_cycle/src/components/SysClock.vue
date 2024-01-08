<!-- SysClock.vue -->
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
    // Update time every second
    this.timer = setInterval(() => {
      this.currentTime = this.getCurrentTime();
    }, 1000);
  },
  beforeUnmount() {
    // Clear the timer to avoid memory leaks
    clearInterval(this.timer);
  },
  methods: {
    getCurrentTime() {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      const period = hours >= 12 ? 'PM' : 'AM';

      // Adjust hours to 12-hour format
      hours = hours % 12;
      hours = hours === 0 ? 12 : hours;

      return `${hours}:${minutes}:${seconds} ${period}`;
    },
  },
}
</script>

<style scoped>
.clock-container {
  width: 90vw; /* Set the width of the container to 70% of the viewport width */
  text-align: center;
}

.clock-text {
  font-size: 15vw; /* Set the font size to 5% of the viewport width */
}
</style>
