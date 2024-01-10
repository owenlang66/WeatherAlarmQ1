import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    useSetTime: true,
    storedAlarms: [],

  }),
  getters: {
    getAlarms(){
      return this.storedAlarms;
    }
  },
  actions: {
    addAlarm(time) {
      this.storedAlarms.push(time);
    },
    removeAlarm(index) {
      this.storedAlarms.splice(index, 1);
    },
    clearAllAlarms(){
      this.storedAlarms = [];
    }

  }
})
