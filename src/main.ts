import './assets/index.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import Table from './components/Result/Table.vue';
import List from './components/Result/List.vue';

const pinia = createPinia();
const app = createApp(App);

app.component('Table', Table);
app.component('List', List);

app.use(pinia);
app.mount('#app');
