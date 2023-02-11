<template>
  <h1 class="drac-heading-2xl">PERT Activity Calculator</h1>
  <ul class="drac-tabs drac-tabs-white">
    <li v-for="(tab, index) in tabs"
        :key="index"
        class="drac-tab"
        :class="[{'drac-tab-active': currentTab === tab}]"
    >
      <a @click="currentTab = tab"
         @keydown="currentTab = tab"
         class="drac-tab-link drac-text"
      >{{ tab }}</a>
    </li>
  </ul>
  <main class="drac-py-sm">
    <Component :is="currentTab" />
  </main>
</template>

<script lang="ts">
import 'dracula-ui/styles/dracula-ui.css';
import { Options, Vue } from 'vue-class-component';
import Result from '@/components/Result.vue';
import Settings from '@/components/Settings.vue';
import useSettingsStore from '@/stores/settings';
import Calculator from './components/Calculator.vue';

@Options({
  components: {
    Calculator,
    Result,
    Settings,
  },
})
export default class App extends Vue {
  private tabs = ['Calculator', 'Result', 'Settings'];

  private currentTab = 'Calculator';

  private settingsStore = useSettingsStore();

  created() {
    const settings = localStorage.getItem('settings');
    if (settings !== null) {
      this.settingsStore.$patch(JSON.parse(settings));
    }
  }
}
</script>

<style>
.drac-tab-link {
  cursor: pointer;
}
</style>
