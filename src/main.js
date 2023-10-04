import { createApp } from 'vue'
import App from './App.vue'
import router from './Router'
import './assets/index.css';
import Toaster from "@meforma/vue-toaster";
import Vue3Toastify from 'vue3-toastify';

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import {LoadingPlugin} from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const app = createApp(App);

app.use(router);
app.use(VueSweetalert2);
app.use(Toaster);
app.use(Vue3Toastify);
app.use(LoadingPlugin);
app.use(VueDatePicker);
app.use(Toast);
app.mount('#app');
