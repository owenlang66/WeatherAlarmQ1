<template>
  <div>
    GPS position: <strong>{{ position }}</strong>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import {Plugins, Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';
const {Permissions} = Plugins;
const requestLocationPermission = async () => {
  try {
    // Check if the platform is Android
    if (Capacitor.isAndroid) {
      // Request location permissions
      const result = await Permissions.requestPermission('ACCESS_FINE_LOCATION');

      // Handle the result
      if (result.granted) {
        console.log('Location permission granted');
      } else {
        console.log('Location permission denied');
      }
    } else {
      // Handle other platforms if needed
      console.log('Location permission not supported on this platform');
    }
  } catch (error) {
    console.error('Error requesting location permission:', error);
  }
};

export default {
  setup () {
    requestLocationPermission();
    const position = ref('determining...')

    function getCurrentPosition() {
      Geolocation.getCurrentPosition().then(newPosition => {
        console.log('Current', newPosition)
        position.value = newPosition
      })
    }

    let geoId

    onMounted(() => {
      getCurrentPosition()

      // we start listening
      geoId = Geolocation.watchPosition({}, (newPosition, err) => {
        console.log('New GPS position')
        position.value = newPosition
      })
    })

    onBeforeUnmount(() => {
      // we do cleanup
      Geolocation.clearWatch(geoId)
    })

    return {
      position
    }
  }
}
</script>
