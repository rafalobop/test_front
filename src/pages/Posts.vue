<template>
  <div class="table-container">
    <div class="table">
      <ul v-for="(item, index) in dataReq" :key="index" class="dataList">
        <li><strong>UserId:</strong> {{item.userId}}</li>
        <li><strong>Id: </strong> {{item.id}}</li>
        <li><strong>Title: </strong>: {{item.title}}</li>
        <li><strong>Body</strong> {{item.body}}</li>
      </ul>
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
    this.chargeTable();
  },
  methods: {
    async chargeTable() {
      const token = localStorage.getItem("token");
      //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MjQ2ZmM1MTlmOTdjMjA2NTczYjk0NzEiLCJpYXQiOjE2NDg5OTY1MzMsImV4cCI6MTY0OTAwMDEzM30.8VtUL0Ew_Eu5NxOPFMKIrWPB5Nhigmv2JT1966klYBU'
      if (token) {
        const getPosts = await axios({
          method: "get",
          url: `http://localhost:3000/api/getData/post`,
          Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MjQ2ZmM1MTlmOTdjMjA2NTczYjk0NzEiLCJpYXQiOjE2NDg5OTY1MzMsImV4cCI6MTY0OTAwMDEzM30.8VtUL0Ew_Eu5NxOPFMKIrWPB5Nhigmv2JT1966klYBU',
          //Authorization: `${token}`
        });
        console.log('getP', getPosts)
        try {
          switch (getPosts.status) {
            case 200:
             this.dataReq = getPosts.data
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
.table-container{
  height: 500px;
}
.table{
  height: 100%;
  overflow: scroll;
}
.dataList{
  list-style: none;
  border: 1px solid black;
  text-align: initial;
}
</style>