<template>
  <div id="app">
    
    <h3>Bienvenido al Test de Conexa</h3>
    <h5>Inicia sesión para testear la app</h5>
    <Login />
    </div>
</template>

<script>
import Login from './components/Login.vue'

export default {
  name: 'App',
  components: {
    Login,
    
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
