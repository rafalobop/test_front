<template>
  <div class="page-container">
    <Navbar />
    <div class="table-photos-container">
      <div class="table-photos">
        <ul v-for="(item, index) in pictures" :key="index" class="dataList-photos">
          <li><strong>AlbumId:</strong> {{ item.albumId }}</li>
          <li><strong>Id: </strong> {{ item.id }}</li>
          <li><img class="listImg" :src="item.url" :alt="item.title"></li>
          <li><strong>Title</strong> {{ item.title }}</li>
        </ul>
      </div>
      <div class="pagination-content">
        <button
          class="paginate"
          @click="prevPage"
          v-if="dataReq.previous !== null"
        >
          Previous
        </button>
        <label>Pagina: {{ dataReq.page }} </label>
        <button class="paginate" @click="nextPage" v-if="dataReq.next !== null">
          Next
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { backendUrl } from "./../config/index";
import Navbar from "./../components/Navbar.vue";
export default {
  components: {
    Navbar,
  },
  data() {
    return {
      dataReq: [],
      currentPage:1,
      pictures:[]
    };
  },
  mounted() {
    console.log("token", localStorage.getItem("token"));
    if (localStorage.getItem("token") === null) {
      this.$swal({
        title: "Debe logearse con su usuario para acceder",
        icon: "error",
      });
      this.$router.push("/");
    }
    this.chargeData();
  },
  methods: {
    prevPage() {
      this.currentPage = this.currentPage - 1
      this.chargeData()

    },
    nextPage() {
      this.currentPage = this.currentPage + 1
      this.chargeData()
    },
    async chargeData() {
      const token = localStorage.getItem("token");
      console.log("token", token);
      if (token) {
        const getPhotos = await axios({
          method: "get",
          url: `${backendUrl}/api/getData/photos?page=${this.currentPage}&limit=10`,
          Authorization: `${token}`,
        });
        console.log("getP", getPhotos);
        try {
          switch (getPhotos.status) {
            case 200:
              this.dataReq = getPhotos.data;
              this.pictures = getPhotos.data.data
              break;

            default:
              break;
          }
        } catch (error) {
          this.$swal({
            title: "Hubo un error en el servidor, intente nuevamente.",
            icon: "error",
          });
        }
      }
    },
  },
};
</script>
<style scoped>
.listImg{
  width: 100%;
  border-radius: 10px ;
}
.table-photos{
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 10px;
  
}
.table-photos-container{
  border-radius: 20px;
  height: 480px;
  overflow: scroll;
}
.table-photos-container::-webkit-scrollbar{
  width:10px;
  background-color: #eee;
}
.table-photos-container::-webkit-scrollbar:horizontal{
  display: none;
}
.table-photos-container::-webkit-scrollbar-thumb{
  width:10px;
  background-color: #4dc8e1;
  border-radius: 10px;
}
.dataList-photos{
  list-style: none;
  width: 50%;
  margin: 10px auto;
  padding: 5px;
}
.pagination-content {
  display: flex;
  justify-content: space-around;
}
.paginate {
  border: none;
  background: transparent;
  color: #4dc8e1;
}
</style>