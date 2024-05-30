import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { quillEditor } from "vue3-quill";

// Bootstrap CSS
import "@/assets/css/bootstrap.css";

// Custom CSS
import "@/assets/css/style.css";
import "@/assets/css/css_slider.css";
import "@/assets/css/font-awesome.min.css";
import "@/assets/css/google-fonts.css";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(quillEditor);
app.mount("#app");
