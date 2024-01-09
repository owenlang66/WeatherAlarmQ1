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
          <img
          src="src/assets/centerIcon.png"
          style="width: 100%;"
          />
        </div>
        <div class="component-bg">
          <DailyTable/>
        </div>
        <div class="component-bg">
          <AlarmPOC/>
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
export default defineComponent({
  components: {
    SysClock,
    DailyTable,
    AlarmPOC,
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
