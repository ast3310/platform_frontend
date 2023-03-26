<template>
    <div id="root">
        <map name="home_link">
          <area shape="default" @click="$router.push({ path: '/' })" style="cursor: pointer;" alt="ООО &quot;Партнёр&quot;">
        </map>
        <Header />
      <main class="main">
        <div class="main-container container">
            <slot/>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import Header from '@/components/Header.vue'
  
  export default {
    name: 'BaseLayout',
    components: {
      Header
    },
  }
  </script>
  