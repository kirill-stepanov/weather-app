<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { locale, availableLocales } = useI18n();
</script>

<template>
  <select v-model="locale" class="select">
    <option v-for="locale in availableLocales" :key="locale" :value="locale">
      {{ locale }}
    </option>
  </select>
</template>

<style scoped>
.select {
  min-height: 48px;
  cursor: pointer;
  z-index: 1;
  padding: 10px;
  border-radius: 8px;
  background-color: #fff;
  border-style: none;
  box-shadow: rgba(0, 0, 0, 0.2) 0 3px 5px -1px,
    rgba(0, 0, 0, 0.14) 0 6px 10px 0, rgba(0, 0, 0, 0.12) 0 1px 18px 0;
}

.select:focus-visible {
  border: none;
  outline: none;
}
</style>
