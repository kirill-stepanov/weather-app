import "@/assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";

import en from "@/locales/en.json";
import uk from "@/locales/uk.json";

import App from "@/App.vue";
import router from "@/router";

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages: {
    en: en,
    uk: uk,
  },
});

const app = createApp(App);

app.use(createPinia());
app.use(i18n);
app.use(router);

app.mount("#app");
