<script setup lang="ts">
import type { DefineComponent } from "vue";

const props = withDefaults(
  defineProps<{
    text?: string;
    onClick: (event: MouseEvent) => void;
    type?: "primary" | "danger";
    icon?: DefineComponent<{}, {}, any>;
  }>(),
  {
    type: "primary",
  }
);
</script>

<template>
  <button :class="`button button__${props.type}`" @click="onClick">
    <component class="icon" :is="icon" v-if="icon" />

    {{ text }}
  </button>
</template>

<style scoped>
.button {
  width: fit-content;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.2) 0 3px 5px -1px,
    rgba(0, 0, 0, 0.14) 0 6px 10px 0, rgba(0, 0, 0, 0.12) 0 1px 18px 0;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.button__primary {
  background-color: #fff;
  color: #222;
}

.button__danger {
  background-color: #dc3545;
  color: white;
}
</style>
