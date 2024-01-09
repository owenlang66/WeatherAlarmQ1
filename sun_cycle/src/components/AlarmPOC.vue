<template>
  <div>
    <q-btn @click="startTimer">Start Timer</q-btn>
  </div>
</template>

<script>
import { Plugins } from '@capacitor/core';

const { Haptics } = Plugins;

export const hapticsVibrate = async (duration = 3000) => {
  try {
    // Start the vibration
    await Haptics.vibrate();

    // Wait for the specified duration
    await new Promise(resolve => setTimeout(resolve, duration));

    // Stop the vibration
    await Haptics.vibrateCancel();
  } catch (error) {
    console.error('Error triggering vibration:', error);
  }
};

</script>
