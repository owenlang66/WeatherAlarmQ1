<template>
  <q-page class="flex flex-center">
    <div class="q-mx-auto">
      <SysClock/>
    </div>
    <!-- entire bottom of the page under the time -->
    <div>
      <!-- large weather icon & stats -->
      <div>
        <div>
          Hi, I'm a weather icon
          <img
          src="src/assets/quasar-logo-vertical.svg"
          />
        </div>
        <div class="flex q-justify-end">
            <q-list class="">
              <q-item-label>Sunrise:</q-item-label>
              <q-item-label>Sunset:</q-item-label>
              <q-item-label>Humidity:</q-item-label>
              <q-item-label>AQI:</q-item-label>
            </q-list>
            <q-list class="text-right" >
              <q-item-label>6:05</q-item-label>
              <q-item-label>5:50</q-item-label>
              <q-item-label>30%</q-item-label>
              <q-item-label>40</q-item-label>
            </q-list>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import SysClock from 'src/components/SysClock.vue';
export default defineComponent({
  components: {
    SysClock,
},
  name: 'IndexPage'
})
</script>
