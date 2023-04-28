import { createApp } from "vue";
import vuetify from "./plugins/vuetify";
import App from "./App.vue";
import router from "./router/index";
import "./index.css";
import store from "./store";

createApp(App).use(store).use(router).use(vuetify).mount("#app");
