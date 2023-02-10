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
  <Component :is="currentTab" />
</template>

<script lang="ts">
import 'dracula-ui/styles/dracula-ui.css';
import { Options, Vue } from 'vue-class-component';
import Result from '@/components/Result.vue';
import Calculator from './components/Calculator.vue';

@Options({
  components: {
    Calculator,
    Result,
  },
})
export default class App extends Vue {
  tabs = ['Calculator', 'Result'];

  currentTab = 'Calculator';
}
</script>

<style>
.drac-tab-link {
  cursor: pointer;
}
</style>
