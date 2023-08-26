import { createApp } from 'vue'
import App from './App.vue'
import router from './Router'
import './assets/index.css';
import Toaster from "@meforma/vue-toaster";

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

createApp(App).use(router).use(VueSweetalert2).use(Toaster).use(VueDatePicker).mount('#app')
