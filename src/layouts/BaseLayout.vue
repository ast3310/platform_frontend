<template>
    <div id="root">
        <div id="loader" v-show="isLoading">
            <Loader/>
        </div>
    <div>
        <map name="home_link">
          <area shape="default" @click="$router.push({ path: '/' })" style="cursor: pointer;" alt="ООО &quot;Партнёр&quot;">
        </map>
        <Header />
      <main class="main" v-show="!isLoading">
        <div class="main-container container">
            <slot/>
        </div>
      </main>
    </div>
</div>
  </template>
  
  <script>
  // @ is an alias to /src
  import Header from '@/components/Header.vue'
  import Loader from '@/components/common/Loader.vue'

  import EventEmitter from '../utils/EventEmitter';
  
  export default {
    name: 'BaseLayout',
    components: {
      Header,
      Loader
    },
    data: () => ({
        isLoading: true,
    }),
    mounted() {
        EventEmitter.$on('pageIsLoading', this.setLoading);
        EventEmitter.$on('pageIsLoaded', this.setLoaded);
    },
    methods: {
        setLoading(){
            this.isLoading = true;
        },
        setLoaded(){
            this.isLoading = false;
        },
    },
  }
  </script>
  