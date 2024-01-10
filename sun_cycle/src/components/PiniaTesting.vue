<template>
  <div>
    <!-- Option 1 -->
    <div>Direct store</div>
    <!-- Read the state value directly -->
    <div>{{ store.counter }}</div>
    <!-- Use getter directly -->
    <div>{{ store.doubleCount }}</div>

    <!-- Manipulate state directly -->
    <q-btn @click="store.counter--">-</q-btn>
    <!-- Use an action -->
    <q-btn @click="store.increment()">+</q-btn>
  </div>

</template>

<script>
import { useCounterStore } from 'stores/testing';

export default {
  setup() {
    const store = useCounterStore();

    return {
      // Option 1: return the store directly and couple it in the template
      store,
    };
  },
};
</script>
