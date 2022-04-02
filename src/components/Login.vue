<template>
  <div class="login-container">
    <div class="form-container mx-auto">
      <b-form @submit="onSubmit">
         <b-form-input
          class="form-input"
          id="input-1"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
        <b-form-input
        class="form-input"
          id="input-1"
          type="password"
          placeholder="Enter password"
          required
        ></b-form-input>
          <b-button variant="primary" class="form-button">Iniciar sesion</b-button>

      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
 
}
</script>

<style>
.form-button{
  margin-top: 10px;
}
.login-container{
  height: 100%;
  margin-top: 20px;
}
.form-container{
  width:50%;

}
.form-input{
  margin-top: 10px;
}
</style>
