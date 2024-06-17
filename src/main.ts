import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import 'primeicons/primeicons.css'
import 'primevue/resources/primevue.min.css';
import 'primevue/resources/themes/aura-light-green/theme.css'
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080"
axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = 'Bearer ' + token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

const app = createApp(App)

app.use(router)
app.use(PrimeVue)
app.use(ToastService)
app.mount('#app')
