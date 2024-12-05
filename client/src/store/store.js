import {createStore} from 'vuex';
import axios  from 'axios'
import { useToast } from 'vue-toastification';
const toast=useToast()
const apiUrl=import.meta.env.VITE_API_URL
export const store= createStore({
    state:{
        username:'',
        isLoggedIn:false,
        tasks:[],
        currentTask:{},

        apiClient:axios.create({
            baseURL:apiUrl,
        }),
    },
    mutations:{
        resetState(state){
            state.username= ''
            state.isLoggedIn=false
            state.tasks=[]
            state.currentTask={}
        },
        setName(state,username){
            state.username=username
        },
        setLoggedIn(state,val){
            state.isLoggedIn=val
        },
        setTask(state,taskArr){
            let demoarr=taskArr.reverse()
            state.tasks=demoarr
        },
        addTask(state,task){
            state.tasks=[...(state.tasks),task].reverse()
        },
        editTask(state,{taskId,editTask}){
            let tempArr= (state.tasks).map((task,i)=>{
                if(task._id===taskId){
                    return editTask
                }return task;
            });
            state.tasks=tempArr;
        },
        deleteTask(state,taskId){
            let tempArr= state.tasks.filter((task,i)=>task._id!=taskId)
            state.tasks=tempArr
        },
        completeTask(state,taskId){
            let tempArr=(state.tasks).map((task,i)=>{
                if(task._id==taskId){
                    task.isCompleted=true;
                }
                return task;
            })
            state.tasks=tempArr
        }
        
    },
    actions:{
        loginUser({state,commit},{user,router}){
            state.apiClient.post('/users/login',user)
            .then(data=>{
              if(data.status==201){
                sessionStorage.setItem('userToken',data.data.token)     
                commit('setLoggedIn',true)
                toast.success('Login Success, '+data.data.username)
                router.push('/tasks')
              }
            })
            .catch(err=>{
              console.log(err)
              toast.error(err.response.data.message)
            })//err.response.message, err.response.status    
        },

        signupUser({state,commit},{user,router}){
            state.apiClient.post('/users/create',user)
            .then(data=>{
              console.log(data)
              if(data.status==201){
                sessionStorage.setItem('userToken',data.data.token)     
                commit('setLoggedIn',true)
                toast.success('Welcome user '+data.data.username)     
                router.push('/tasks')
              }    
            })
            .catch(err=>{
              console.log(err)
              toast.error(err.response.data.message)
            })    
        },

        getUserData({state,commit},{router}){
            //if(isNew){
            //}
            //state.secureApiClient.get('/tasks')
            state.apiClient.defaults.headers.Authorization=`Bearer ${sessionStorage.getItem('userToken')}`
            state.apiClient.get('/tasks')
            .then(data=>data.data)
            .then(data=>{
                commit('setName',data.username)
                if(data.taskArr.length>0){
                    commit('setTask',data.taskArr)
                }
            }).catch(err=>{
                sessionStorage.removeItem('userToken')
                console.log(err)
                commit('setLoggedIn',false)
                router.push('/')
                toast.error('User unauthorized, try loging in again ')
            })
    
        },
        editTaskApi({state,commit},{task,router}){
            state.apiClient.defaults.headers.Authorization=`Bearer ${sessionStorage.getItem('userToken')}`
            state.apiClient.put(`/tasks/edit`,{taskId:task._id,task:task})
            .then(data=>{
                console.log(data);
                if(data.data && data.status==200){
                    commit('editTask',{taskId:task._id,editTask:data.data})
                    router.push('/tasks')
                }
            }).catch(err=>{
                console.log(err);
                toast.error(err.response.data.message)
                if(err.status==401) router.push('/')
            })

        },
        addTaskApi({commit, state},{task,router}){
            state.apiClient.defaults.headers.Authorization=`Bearer ${sessionStorage.getItem('userToken')}`
            state.apiClient.post(`/tasks/create`,task)
            .then(data=>{
                console.log(data);
                if(data.data.addedTask && data.status==201){
                    toast.info('Task added')
                    commit('addTask',data.data.addedTask)
                    router.push('/tasks')
                }
            }).catch(err=>{
                console.log(err);
                toast.error(err.response.data.message)
                if(err.status==401) router.push('/')
            })
        },

        completeTaskApi({commit,state},{id,router}){
            state.apiClient.defaults.headers.Authorization=`Bearer ${sessionStorage.getItem('userToken')}`
            state.apiClient.patch('tasks/complete',{taskId:id})
            .then(data=>{
                console.log(data);
                if(data.status==200){
                    commit('completeTask',id)
                    toast.info('Task marked completed')
                }
            }).catch(err=>{
                console.log(err);
                toast.error(err.response.data.message)
                if(err.status==401) router.push('/')
            })
        },
        deleteTaskApi({commit,state},{id,title,router}){
            state.apiClient.defaults.headers.Authorization=`Bearer ${sessionStorage.getItem('userToken')}`
            state.apiClient.delete(`tasks/delete/${id}`)
            .then(data=>{
                console.log(data);
                if(data.status==200){
                    toast.info(`Deleted Task, "${title}"`);
                    commit('deleteTask',id)
                }
            }).catch(err=>{
                console.log(err);
                console.log(err.status);
                toast.error(err.response.data.message)
                if(err.status==401) router.push('/')
            })
        }

    },
    getters:{
        getName(state){
            return state.username;
        }
    }
})
          