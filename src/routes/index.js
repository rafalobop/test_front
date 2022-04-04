import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './../pages/Home.vue'
import Photos from './../pages/Photos.vue'
import Posts from './../pages/Posts.vue'
import Error404 from './../pages/Error404.vue'

Vue.use(VueRouter);


const routes = [
       {
           path:'/',
           name:'login',
           component: Home
       },
        {
            path:'/photosTable',
            name:'photosTable',
            component: Photos
        },
        {
            path:'/posts',
            name:'posts',
            component: Posts
        },
        {
            path:'*',
            name:'error404',
            component: Error404
        }
    
]
const router = new VueRouter({
    mode:'history',
    base:'/',
    routes
})


export default router;
