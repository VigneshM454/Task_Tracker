import { createRouter, createWebHistory, useRoute, useRouter } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import TaskListView from '../views/TaskListView.vue'
import AddTaskView from '../views/AddTaskView.vue'
import EditTaskView from '../views/EditTaskView.vue'
import NotFoundPage from '../views/NotFoundPage.vue'
import { useStore } from 'vuex'
const store=useStore()
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path:'/tasks',
      name:'task',
      component:TaskListView
    },{
      path:'/add-tasks',
      name:'add-task',
      component:AddTaskView
    },{
      path:'/edit-task/:id',
      name:'edit-task',
      component:EditTaskView,
    },{
      path:'/:catchAll(.*)',
      name:'404-page',
      component:NotFoundPage

    }
  ],
})

router.beforeEach((to,from,next)=>{
  const token=sessionStorage.getItem('userToken')
  if(token){ //protectedRoutes allow except login route
    if(to.path!=='/') next()
    else router.push('/tasks')
  }else{
    if(to.path==='/')next()
    else router.push('/')
  }
})

export default router;