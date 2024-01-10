<template>
  <div>
    <q-btn @click="startTimer">Start Timer</q-btn>
  </div>
</template>

<script>
import { Plugins } from '@capacitor/core';
import audioFile from 'src/assets/never-enough.mp3';

const { Haptics } = Plugins;

export const hapticsVibrate = async (duration = 3000) => {
  try {
    // Start the vibration and audio playback concurrently
    // const vibrationPromise = Haptics.vibrate();
    const audio = new Audio(audioFile);
    const audioPromise = audio.play();

    // Wait for both the vibration and audio playback to start
    // await Promise.all([vibrationPromise, audioPromise]);
    await Promise.all( audioPromise);

    // Wait for the specified duration
    await new Promise(resolve => {
      // Store the timeout ID to potentially cancel it later
      const timeoutId = setTimeout(() => {
        resolve();
        // Stop the vibration and pause the audio
        // Haptics.vibrateCancel();
        audio.stop();
      }, duration);

      // If needed, you can store the timeoutId in a variable for later use
      // this.timeoutId = timeoutId;
    });
  } catch (error) {
    console.error('Error triggering vibration:', error);
  }
};

export default {
  methods: {
    startTimer() {
      hapticsVibrate();
    },
  },
};
</script>
