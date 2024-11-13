<script setup lang="ts">
import type { WeatherTypes } from "@/stores/weatherReport";
import { useWeatherReportsStore } from "@/stores/weatherReports";
import { ref, type DefineComponent } from "vue";

const props = defineProps<{
  id: string;
  weatherType: WeatherTypes;
}>();

const weatherReports = useWeatherReportsStore();

const checked = ref<WeatherTypes>(props.weatherType);

const onCheck = (event: Event) => {
  weatherReports.updateWeatherType(props.id, checked.value);
};
</script>

<template>
  <div class="toggle__switch">
    <label class="switch__label">
      <input
        type="checkbox"
        class="checkbox"
        v-model="checked"
        true-value="day"
        false-value="night"
        @change="onCheck"
      />
      <span class="slider"></span>
    </label>
  </div>
</template>

<style scoped>
.toggle__switch {
  position: relative;
  width: 100px;
  height: 50px;
}

.switch__label {
  position: absolute;
  width: 100%;
  height: 50px;
  background-color: #222;
  border-radius: 25px;
  cursor: pointer;
  border: 3px solid #222;

  box-shadow: rgba(0, 0, 0, 0.2) 0 3px 5px -1px,
    rgba(0, 0, 0, 0.14) 0 6px 10px 0, rgba(0, 0, 0, 0.12) 0 1px 18px 0;
}

.checkbox {
  position: absolute;
  display: none;
}

.slider {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 25px;
  -webkit-transition: 0.3s;
  transition: 0.3s;
}

.checkbox:checked ~ .slider {
  background-color: white;
}

.slider::before {
  content: "";
  position: absolute;
  top: 10px;
  left: 10px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  -webkit-box-shadow: inset 12px -4px 0px 0px white;
  box-shadow: inset 12px -4px 0px 0px white;
  background-color: #222;
  -webkit-transition: 0.3s;
  transition: 0.3s;
}

.checkbox:checked ~ .slider::before {
  -webkit-transform: translateX(50px);
  -ms-transform: translateX(50px);
  transform: translateX(50px);
  background-color: #222;
  -webkit-box-shadow: none;
  box-shadow: none;
}
</style>
