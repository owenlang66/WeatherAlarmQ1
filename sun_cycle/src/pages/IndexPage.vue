<template>
  <q-page class="bg-image">
    <div class="q-mx-auto q-pt-md" style="max-height: 100px;">
      <SysClock/>
    </div>
    <!-- entire bottom of the page under the time -->
    <div style="width: 70%; max-width: 275px;" class="q-mx-auto">
      <!-- large weather icon & stats -->
      <div>
        <div>
          <WeatherImage/>
        </div>
        <div class="component-bg">
          <!-- <DailyTable/> -->
        </div>
        <div class="component-bg">
          <AlarmPOC/>
        </div>
        <div class="component-bg">
          <GeoLocation/>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import SysClock from 'src/components/SysClock.vue';
import DailyTable from 'src/components/DailyTable.vue';
import AlarmPOC from 'src/components/AlarmPOC.vue';
import GeoLocation from 'src/components/GeoLocation.vue';
import WeatherImage from 'src/components/WeatherImage.vue';
export default defineComponent({
  components: {
    SysClock,
    // DailyTable,
    AlarmPOC,
    GeoLocation,
    WeatherImage
},
  name: 'IndexPage'
})
</script>

<style>
  .bg-image {
    background-image: url("src/assets/backgroundimage.jpg");
    background-size: cover;
    background-position: center center;
    height: 100vh;
  }
  .component-bg {
    background-color: rgba(255, 255, 255, 0.8);
    padding: 8px;
    border-radius: 8px;
  }
</style>
