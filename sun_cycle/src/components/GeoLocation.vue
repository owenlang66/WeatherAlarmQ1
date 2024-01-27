<template>
  <div>
    <p>
      Your Current GPS position: <strong>{{ position }}</strong>
    </p>
    <p v-if="loading">Loading...</p>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Plugins, Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';

const { Permissions } = Plugins;

const requestLocationPermission = async () => {
  try {
    // checks if the current device is an android
    if (Capacitor.isAndroid) {

      // requests permission to access location if this is the case
      const result = await Permissions.requestPermission('ACCESS_FINE_LOCATION');

      if (result.granted) {
        console.log('Location permission granted');
      } else {
        console.log('Location permission denied');
      }
    } else {
      console.log('Location permission not supported on this platform');
    }
  } catch (error) {
    console.error('Error requesting location permission:', error);
  }
};

export default {
  setup() {
    requestLocationPermission();
    // ref is used to create a "reactive reference" to a value, replaces the "data" option
    const position = ref('determining...');
    const loading = ref(true);

    function getCurrentPosition() {
      // snag location using the geolocation feature (which I do not understand in the slightest)
      Geolocation.getCurrentPosition().then(newPosition => {
        console.log('Current', newPosition);

        // creates actual position value with lat and long values
        position.value = `${newPosition.coords.latitude}, ${newPosition.coords.longitude}`;

        // negates the loading value once the position has been set
        loading.value = false;

      }).catch(error => {
        console.log('Error getting position', error);
        loading.value = false;
      });
    }

    let geoId;

    // lifecycle hook calling this function
    onMounted(() => {
      getCurrentPosition();

      // updates gps position as it changes (very neat)
      geoId = Geolocation.watchPosition({}, (newPosition, err) => {
        console.log('New GPS position');
        position.value = `${newPosition.coords.latitude}, ${newPosition.coords.longitude}`;
      });
    });

    // clears the watch when the component is unmounted
    onBeforeUnmount(() => {
      Geolocation.clearWatch(geoId);
    });

    // returns our GPS data, or loading if it ain't working
    return {
      position,
      loading,
    };
  },
};
</script>
