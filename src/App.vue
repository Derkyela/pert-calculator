<template>
  <div class="flex items-start justify-between">
    <h1 class="drac-heading text-4xl lg:text-5xl mb-4 flex-1">PERT Activity Calculator</h1>
    <a href="https://github.com/Derkyela/pert-calculator"
       title="PERT Calculator Github Repository"
       target="_blank"
    >
      <img alt="GitHub Repo"
           src="https://img.shields.io/static/v1?label=&message=GitHub&color=8aff80&style=flat&logo=github&logoColor=21222c"
      >
    </a>
  </div>
  <nav class="overflow-x-auto">
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
  </nav>
  <main class="flex flex-col gap-4 py-4">
    <Component :is="currentTab" />
  </main>
</template>

<script lang="ts">
import './assets/index.css';
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
  @apply cursor-pointer;
}
</style>
