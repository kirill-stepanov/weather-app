<script setup lang="ts">
import { useI18n } from "vue-i18n";

import Button from "@/components/Global/Button.vue";

defineProps<{
  showModal: boolean;
  title: string;
  description: string;
  onSubmit?: (event: MouseEvent) => void;
  onCancel?: (event: MouseEvent) => void;
}>();

const { t } = useI18n();
</script>

<template>
  <div v-if="showModal">
    <div class="modal__overlay"></div>
    <div class="modal">
      <h2>{{ title }}</h2>

      <p>{{ description }}</p>

      <div class="modal__buttons">
        <Button
          v-if="onSubmit"
          :text="t('modals.submit')"
          :onClick="onSubmit"
          type="danger"
        />

        <Button
          v-if="onCancel"
          :text="t('modals.cancel')"
          :onClick="onCancel"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal__overlay {
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal {
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 20px;
  right: 20px;
  bottom: 0;
  width: fit-content;
  height: fit-content;
  max-width: 500px;
  padding: 20px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  border-radius: 16px;
  background-color: #fff;
  border-style: none;
  box-shadow: rgba(0, 0, 0, 0.2) 0 3px 5px -1px,
    rgba(0, 0, 0, 0.14) 0 6px 10px 0, rgba(0, 0, 0, 0.12) 0 1px 18px 0;
}

.modal__buttons {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
