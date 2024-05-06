import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';
import router from './router';
import {init} from './router';
import * as Icons  from '@element-plus/icons-vue'

const app = createApp(App);
app.use(ElementPlus);
const main = async () => {
    await init();
    app.use(router);
    app.mount('#app');
}

// 创建Icon组件
Object.keys(Icons).forEach((key) => {
    app.component(key, Icons[key])
})


main();



