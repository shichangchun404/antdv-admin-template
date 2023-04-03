import { createApp } from "vue"
import Antd from 'ant-design-vue';
import router from "@/router"
import { createPinia } from "pinia"
import App from "@/App.vue"
import "@/assets/less/global.less"

import 'ant-design-vue/dist/antd.css';

const app = createApp(App)
app.use(Antd)
app.use(router)
app.use(createPinia())
app.mount("#app")
