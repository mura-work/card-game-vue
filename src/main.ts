import { createApp } from "vue";
import vuetify from "./plugins/vuetify";
import App from "./App.vue";
import router from "./router/index";

createApp(App).use(router).use(vuetify).mount("#app");
