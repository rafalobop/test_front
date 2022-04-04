<template>
  <div class="login-container">
    
    <h3>Bienvenido al Test de Conexa</h3>
    <h5>Inicia sesión para testear la app</h5>
    <div class="form-container mx-auto" v-if="notRegisterUser === false">
      <b-form>
        <b-form-input
          class="form-input"
          id="input-user"
          type="email"
          placeholder="Email"
          v-model="email"
          required
        ></b-form-input>
        <b-form-input
          class="form-input"
          id="input-pass"
          type="password"
          placeholder="Password"
          v-model="password"
          required
        ></b-form-input>
        <b-button variant="primary" class="form-button" @click="login"
          >Iniciar sesion</b-button
        >
      </b-form>
      <p class="register-span">
        Aun no tienes una cuenta?
        <span
          >Registrate
          <button class="newUserForm" @click="changeForm">Aqui</button></span
        >
      </p>
    </div>
    <div class="form-container mx-auto" v-if="notRegisterUser === true">
      <b-form>
        <b-form-input
          class="form-input"
          id="input-newUser"
          type="text"
          placeholder="Nombre"
          v-model="newUserName"
          required
        ></b-form-input>
        <b-form-input
          class="form-input"
          id="input-newMail"
          type="email"
          placeholder="Correo electronico"
          v-model="newUserMail"
          required
        ></b-form-input>
        <b-form-input
          class="form-input"
          id="input-newPass"
          type="password"
          placeholder="Ingrese su contraseña"
          v-model="newUserPass"
          required
        ></b-form-input>
        <b-form-input
          class="form-input"
          id="input-newPass2"
          type="password"
          placeholder="Repita su contraseña"
          v-model="newUserRepeatPass"
          required
        ></b-form-input>
        <b-button variant="primary" class="form-button" @click="register"
          >Registrarse</b-button
        >
      </b-form>
      <p class="register-span">
        Ya tienes una cuenta?
        <span
          >Inicia Sesion
          <button class="newUserForm" @click="changeForm">Aqui</button></span
        >
      </p>
    </div>

    <div class="footer-container">
      <h5>Lobo Plaza Rafael | Conexa's Challenge | 2022</h5>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { backendUrl } from "./../config/index";

export default {
  name: "Login",
  data() {
    return {
      password: "",
      email: "",
      notRegisterUser: false,
      newUserName: "",
      newUserPass: "",
      newUserRepeatPass: "",
      newUserMail: "",
    };
  },
  methods: {
    changeForm() {
      this.notRegisterUser = !this.notRegisterUser;
    },
    async login() {
      if (this.email === "" || this.password === "") {
        this.$swal({
          title: "Correo y password obligatorios",
          icon: "error",
        });
      } else {
        const data = {
          correo: this.email,
          password: this.password,
        };
        const userLoged = await axios({
          method: "post",
          url: `${backendUrl}/api/login`,
          data,
        });
        try {
          switch (userLoged.status) {
            case 200:
              this.$swal({
                title: "Usuario logeado exitosamente",
                icon: "success",
              });
              localStorage.setItem("userData", userLoged.data.usuario);
              localStorage.setItem("token", userLoged.data.token);
              this.$router.push("/photosTable");
              break;
            case 400:
              this.$swal({
                title: `${userLoged.data.msg}`,
                icon: "error",
              });
              break;
            case 401:
              this.$swal({
                title: `${userLoged.data.msg}`,
                icon: "error",
              });
              break;
          }
        } catch (error) {
          this.$swal({
            title: `${userLoged.data.msg}`,
            icon: "error",
          });
        }
      }
    },
    async register() {
      if (
        this.newUserName === "" ||
        this.newUserMail === "" ||
        this.newUserPass === "" ||
        this.newUserRepeatPass === ""
      ) {
        this.$swal({
          title: "Nombre, Email y Contraseña son obligatorios",
          icon: "error",
        });
      } else if (this.newUserPass !== this.newUserRepeatPass) {
        this.$swal({
          title: "Las contraseñas deben coincidir",
          icon: "error",
        });
      } else {
        const data = {
          nombre: this.newUserName,
          correo: this.newUserMail,
          password: this.newUserPass,
        };
        const userCreated = await axios({
          method: "post",
          url: `${backendUrl}/api/usuarios/newUser`,
          data,
        });
        try {
          if (userCreated.status === 200) {
            this.$swal({
              title: `${userCreated.data.msg}`,
              icon: "success",
            });
            localStorage.setItem("userData", userCreated.data.usuario);
          }
          this.notRegisterUser = false;
        } catch (error) {
          this.$swal({
            title: "Hubo un error en el servidor, intente nuevamente",
            icon: "error",
          });
        }
      }
    },
  },
};
</script>

<style>
.footer-container {
  margin-top: 30px;
}
.newUserForm {
  border: none;
  background: transparent;
  color: #4dc8e1;
  width: 50px;
  padding: 0;
  margin-left: -8px;
}
.register-span {
  margin-top: 30px;
}
.form-button {
  margin-top: 10px;
}
.login-container {
  height: 100%;
  margin-top: 20px;
}
.form-container {
  width: 50%;
}
.form-input {
  margin-top: 10px;
}

</style>
