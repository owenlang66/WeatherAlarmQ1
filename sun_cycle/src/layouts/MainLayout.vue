<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="settings"
          aria-label="Settings"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          SunCadian
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="q-pa-md"
    >
      <p class="text-subtitle1">Settings</p>
      <form>
        <q-list>
          <q-item tag="label" v-ripple>
            <q-item-section>
              <q-item-label>So.. here's a toggle</q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-toggle color="blue" v-model="notifications" val="battery" />
            </q-item-section>
          </q-item>
          <q-item tag="label" v-ripple>
            <q-item-section>
              <q-item-label>Use Set Time:</q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-toggle color="blue" v-model="useSetTime"/>
            </q-item-section>
          </q-item>
          <q-item v-if="useSetTime" @click="openTimeDialog">
            <q-item-section @click="openTimeDialog">
              <q-item-label>Add Alarm Time</q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-avatar icon="alarm_add"/>
            </q-item-section>
          </q-item>
        </q-list>
      </form>
    </q-drawer>

    <q-page-container>
      <router-view />
      <q-dialog v-model="timeDialogVisible" persistent>
        <q-card>
          <q-card-section>
            <q-time v-model="selectedTime"/>
          </q-card-section>
          <q-card-actions class="q-mb-md q-mr-md">
            <q-btn label="Cancel" color="negative" @click="closeTimeDialog"/>
            <q-btn label="Save" color="positive" @click="confirmTime"/>
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MainLayout',

  setup() {
    const leftDrawerOpen = ref(false);
    const useSetTime = ref(false);
    const timeDialogVisible = ref(false);
    const selectedTime = ref(() => '12:00'); // Initialize selectedTime as null

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };

    const openTimeDialog = () => {
      timeDialogVisible.value = true;
    };

    const closeTimeDialog = () => {
      timeDialogVisible.value = false;
    };

    const confirmTime = () => {
      // Handle the selected time as needed
      console.log('Selected Time:', selectedTime.value);
      timeDialogVisible.value = false;
    };

    return {
      leftDrawerOpen,
      useSetTime,
      timeDialogVisible,
      selectedTime,
      toggleLeftDrawer,
      openTimeDialog,
      closeTimeDialog,
      confirmTime,
      notifications: ref(['battery']),
    };
  },
});
</script>
