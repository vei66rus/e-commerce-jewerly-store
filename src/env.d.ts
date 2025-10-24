/// <reference types="vite/client" />

declare module '*.vue' {
  import { defineComponent, type DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
