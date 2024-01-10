<template>
  <div>
    <q-btn @click="startTimer">Start Timer</q-btn>
  </div>
</template>

<script>

// Depriciated means that I should probably look at this for the vibration issue
import { Plugins } from '@capacitor/core';
import audioFile from 'src/assets/never-enough.mp3';

const { Haptics } = Plugins;

export const hapticsVibrate = async (duration = 3000) => {
  try {
    // Starts vibrating and playing music, commented out because pc gets angry. seems to skip the (if android check)
    // const vibrationPromise = Haptics.vibrate();
    const audio = new Audio(audioFile);
    const audioPromise = audio.play();

    // Wait for both the vibration and audio playback to start
    // await Promise.all([vibrationPromise, audioPromise]);
    // replaced ^^ with vv because of the vibrations issue on pc
    await Promise.all( audioPromise);

    // Wait for the specified duration
    await new Promise(resolve => {
      setTimeout(() => {
        resolve();
        // Stop the vibration and pause the audio
        // Haptics.vibrateCancel();
        audio.stop();
      }, duration);
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
