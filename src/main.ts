import './assets/index.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import Table from './components/Result/Table.vue';
import List from './components/Result/List.vue';

const app = createApp(App);

// TODO: Rename component
// eslint-disable-next-line vue/no-reserved-component-names
app.component('Table', Table);
app.component('List', List);

app.use(createPinia());
app.mount('#app');
