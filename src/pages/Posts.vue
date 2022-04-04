<template>
<div class="page-container">

    <Navbar />
  <div class="table-container">
    <div class="table">
      <ul v-for="(item, index) in dataReq" :key="index" class="dataList">
        <li><strong>UserId:</strong> {{ item.userId }}</li>
        <li><strong>Id: </strong> {{ item.id }}</li>
        <li><strong>Title: </strong>: {{ item.title }}</li>
        <li><strong>Body</strong> {{ item.body }}</li>
      </ul>
    </div>
  </div>
  </div>

</template>
<script>
import { backendUrl } from "./../config/index";
import axios from "axios";
import Navbar from './../components/Navbar.vue'
export default {
  components:{
    Navbar
  },
  data() {
    return {
      dataReq: [],
    };
  },
  created() {
    console.log("aqui", !localStorage.getItem("token"));
    if (localStorage.getItem("token") === null) {
      this.$swal({
        title: "Debe logearse con su usuario para acceder",
        icon: "error",
      });
      this.$router.push("/");
    }
    this.chargeTable();
  },

  methods: {
    async chargeTable() {
      const token = localStorage.getItem("token");
      if (token) {
        const getPosts = await axios({
          method: "get",
          url: `${backendUrl}/api/getData/post`,
          Authorization: `${token}`,
          "Content-Type": "application/json",
        });
        console.log("getP", getPosts);
        try {
          switch (getPosts.status) {
            case 200:
              this.dataReq = getPosts.data;
              break;

            default:
              break;
          }
        } catch (error) {
          this.$swal({
            title: "Hubo un error en el servidor, intente nuevamente",
            icon: "error",
          });
        }
      }else{
        this.$swal({
        title: "Debe logearse con su usuario para acceder",
        icon: "error",
      });
      }
    },
  },
};
</script>
<style scoped>
.table-container {
  height: 500px;
}
.table::-webkit-scrollbar{
  width:10px;
  background-color: #eee;
}
.table::-webkit-scrollbar:horizontal{
  display: none;
}
.table::-webkit-scrollbar-thumb{
  width:10px;
  background-color: #4dc8e1;
  border-radius: 10px;
}
.table {
  height: 100%;
  overflow: scroll;
}
.dataList {
  list-style: none;
  border: 1px solid black;
  text-align: initial;
}
</style>