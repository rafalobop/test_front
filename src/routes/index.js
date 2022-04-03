import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);


const routes = [
       {
           path:'/',
           name:'login',
           component: ()=> import('./../components/Login.vue')
       },
        {
            path:'/photosTable',
            name:'photosTable',
            component: ()=> import('./../pages/Photos.vue')
        },
        {
            path:'/posts',
            name:'posts',
            component: ()=> import('./../pages/Posts.vue')
        }
    
]
const router = new Router({
    mode:'history',
    base:process.env.BASE_URL,
    routes
})


export default router;
