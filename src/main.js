import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';
import router from './router';
import {init} from './router';

const app = createApp(App);

const main = async () => {
    await init();
    app.use(router);
    app.use(ElementPlus);
    app.mount('#app');
}

main();



