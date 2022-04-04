<template>
  <div class="table-container" style="background:#ccc">
<Navbar />
    <div class="table">
      <ul v-for="(item, index) in dataReq" :key="index" class="dataList">
        <li><strong>UserId:</strong> {{item.userId}}</li>
        <li><strong>Id: </strong> {{item.id}}</li>
        <li><strong>Title: </strong>: {{item.title}}</li>
        <li><strong>Body</strong> {{item.body}}</li>
      </ul>
    </div>
    <div class="pagination-content">

    <button class="paginate" @click="prevPage" v-if="dataReq.previous !== null">Previous</button>
    <label>Pagina: {{dataReq.page}} </label>
    <button class="paginate" @click="nextPage" v-if="dataReq.next !== null">Next</button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { backendUrl } from "./../config/index";
import Navbar from './../components/Navbar.vue'
export default {
  components:{
    Navbar
  },
  data() {
    return {
      dataReq:[]
    };
  },
  created() {
    console.log('aqui', !localStorage.getItem('token'))
    if(!localStorage.getItem('token'))
    alert('debe logearse ')
    this.$router.push('/')
    this.chargeData();
  },
  methods: {
    prevPage(){
      console.log('prev',this.dataReq.data.previous)
    },
    nextPage(){
      console.log('next', this.dataReq.data.next)
    },
    async chargeData() {
      const token = localStorage.getItem("token");
      //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MjQ2ZmM1MTlmOTdjMjA2NTczYjk0NzEiLCJpYXQiOjE2NDg5OTY1MzMsImV4cCI6MTY0OTAwMDEzM30.8VtUL0Ew_Eu5NxOPFMKIrWPB5Nhigmv2JT1966klYBU'
      if (token) {
        const getPhotos = await axios({
          method: "get",
          url: `${backendUrl}/api/getData/photos?page=1&limit=10`,
          //Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MjQ2ZmM1MTlmOTdjMjA2NTczYjk0NzEiLCJpYXQiOjE2NDg5OTY1MzMsImV4cCI6MTY0OTAwMDEzM30.8VtUL0Ew_Eu5NxOPFMKIrWPB5Nhigmv2JT1966klYBU',
          Authorization: `${token}`
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