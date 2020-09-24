import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['../views/login.vue'],resolve)
    },
    {
      path: '/register',
      name: 'register',
      component: resolve => require(['../views/register.vue'],resolve)
    },
    {
      path: '/index',
      name: 'index',
      component: resolve => require(['../views/index.vue'],resolve),
      children:[
       {
         path:"/student",
         name:"student",
         component:resolve => require(['../views/student.vue'],resolve)
       },
       {
         path:"/usermsg",
         name:"usermsg",
         component:resolve => require(['../views/usermsg.vue'],resolve)
       }
      ]
    },
    {
      path: '/',
      redirect:"/login"
    }
  ]
})
