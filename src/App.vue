<template>
  <div id="app">
    <!--Login />-->
    <router-view/>
    </div>
</template>

<script>
//import Login from './components/Login.vue'

export default {
  name: 'App',
  components: {
    //Login,
    
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  min-height: 700px;
  padding: 90px;
}
</style>
