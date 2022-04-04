<template>
  <div>
    <b-nav>
      <b-nav-item active><router-link to="/photosTable">Photos</router-link></b-nav-item>
      <b-nav-item><router-link to="/posts">Posts</router-link></b-nav-item>
      <b-nav-item @click="logout">Cerrar Sesion</b-nav-item>
    </b-nav>
  </div>
</template>
<script>
export default {
  
  methods:{
    logout(){
      localStorage.clear()
      this.$router.push('/')
    }
  }
};
</script>
<style>

</style>