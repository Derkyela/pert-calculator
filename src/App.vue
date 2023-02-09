<template>
  <Calculator />
</template>

<script lang="ts">
import 'dracula-ui/styles/dracula-ui.css';
import { Options, Vue } from 'vue-class-component';
import Calculator from './components/Calculator.vue';

@Options({
  components: {
    Calculator,
  },
})
export default class App extends Vue {}
</script>

<style>
</style>
