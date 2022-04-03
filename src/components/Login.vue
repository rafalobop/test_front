<!--<template>
  <div class="login-container">
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
        alert("Email y Contraseña son obligatorios");
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
              alert(`${userLoged.data.msg}`);
              localStorage.setItem("userData", userLoged.data.usuario);
              localStorage.setItem("token", userLoged.data.token);
              this.$router.push('/tablePhotos')
              break;
            case 400:
              alert(`${userLoged.data.msg}`);
              break;
            case 401:
              alert(`${userLoged.data.msg}`);
              break;
          }
        } catch (error) {
          console.log('err', error)
          alert("hubo un error del servidor");
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
        alert("Nombre, Email y Contraseña son obligatorios");
      } else if (this.newUserPass !== this.newUserRepeatPass) {
        alert("Las contraseñas deben coincidir");
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
            alert(`${userCreated.data.msg}`);
            localStorage.setItem("userData", userCreated.data.usuario);
          }
          this.notRegisterUser = false
        } catch (error) {
          console.log('err', error)
          alert("hubo un error del servidor");
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
</style>-->
<template>
  <div class="table-container">
    <div class="table">
      <!--<ul v-for="(item, index) in dataReq" :key="index" class="dataList">
        <li><strong>UserId:</strong> {{item.userId}}</li>
        <li><strong>Id: </strong> {{item.id}}</li>
        <li><strong>Title: </strong>: {{item.title}}</li>
        <li><strong>Body</strong> {{item.body}}</li>
      </ul>-->
    </div>
    <div class="pagination-content">

    <button class="paginate">Previous</button>
    <label>Pagina:</label>
    <button class="paginate">Next</button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
//mport { backendUrl } from "./../config/index";

export default {
  data() {
    return {
      dataReq:[]
    };
  },
  mounted() {
    this.chargeData();
  },
  methods: {
    async chargeData() {
      const token = localStorage.getItem("token");
      //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MjQ2ZmM1MTlmOTdjMjA2NTczYjk0NzEiLCJpYXQiOjE2NDg5OTY1MzMsImV4cCI6MTY0OTAwMDEzM30.8VtUL0Ew_Eu5NxOPFMKIrWPB5Nhigmv2JT1966klYBU'
      if (token) {
        const getPhotos = await axios({
          method: "get",
          url: `http://localhost:3000/api/getData/photos?page=2&limit=10`,
          Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MjQ2ZmM1MTlmOTdjMjA2NTczYjk0NzEiLCJpYXQiOjE2NDg5OTY1MzMsImV4cCI6MTY0OTAwMDEzM30.8VtUL0Ew_Eu5NxOPFMKIrWPB5Nhigmv2JT1966klYBU',
          //Authorization: `${token}`
        });
        console.log('getP', getPhotos)
        try {
          switch (getPhotos.status) {
            case 200:
             this.dataReq = getPhotos.data
              break;
          
            default:
              break;
          }
        } catch (error) {
          alert('Hubo un error en el servidor')
        }
      }
    },
  },
};
</script>
<style scoped>
.pagination-content{
  display: flex;
  justify-content: space-around;
}
.paginate{
  border: none;
  background: transparent;
  color:#4dc8e1;

}
</style>