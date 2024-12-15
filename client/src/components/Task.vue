<script setup>
    import { inject } from 'vue'
    import {RouterLink, useRouter} from 'vue-router'
    import { useStore } from 'vuex'
    import { useToast } from 'vue-toastification';
    import Swal from 'sweetalert2'

    const toast=useToast()
    const store=useStore()

    const state=defineProps({
        task:{
            type:Object,
        },
        index:{
            type:Number
        }
    })

    const isExpired=(date)=> new Date(date).getTime() < new Date().getTime()

    const formattedDate= new Intl.DateTimeFormat("en-Us",{
        year:"numeric",
        month:"short",
        day:"numeric",
        hour:"numeric",
        minute:'numeric',
        hour12:true
    }).format(new Date(state.task.deadline))

    function handleDelete(id,title){
        Swal.fire({
            text: 'Are you sure want to delete the task, "'+title +'"',
            title:'Delete',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => result.isConfirmed ? store.dispatch('deleteTaskApi',{id,title,router:useRouter()}) :'' );

    }

    function markComplete(id,title,date){
        console.log(id+ ' '+title+' '+date);
        if(isExpired(date)){
            toast.error('the task is already expired')
        }else{
            Swal.fire({
                text: 'Have you completed the task, "'+title +'" ?',
                title:'Mark Complete',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
            }).then((result) => result.isConfirmed ? store.dispatch('completeTaskApi',{id,router:useRouter()}) :'');  
        }
    }

</script>

<template>
    <div :class="((state.task.isCompleted)?
                    'bg-green-100': 
                    isExpired(state.task.deadline)?
                        'bg-red-100':'bg-white' )
            +' flex flex-col gap-3 p-3 border border-lg  shadow-gray-700 rounded-2xl h-[100%] justify-around [overflow-wrap:anywhere]'">
        <p>{{state.task.type}}</p>
        <h1 class="font-bold text-2xl">{{state.task.title}}</h1>
        <p class="">{{state.task.desc}}</p>
        <p class="text-red-500">
            {{formattedDate}}
        </p>
        <hr>
        <div class="flex items-center gap-3">
            <RouterLink :to="`/edit-task/${state.index}`" >
                <i class="pi pi-pencil  text-blue-800 text-xl border-blue-800 rounded-lg bg-black text-bold p-3"> </i>
            </RouterLink>
            
            <i class="pi pi-trash  text-red-800 text-xl border-blue-800 rounded-lg bg-black text-bold p-3" @click="handleDelete(task._id,task.title)" ></i>
            
            <button v-if="state.task.isCompleted"  class=' text-white w-[50%] rounded-lg p-2 bg-green-500 '>
                Completed
            </button>
            <button v-else-if="isExpired(state.task.deadline)"  class=' text-white w-[50%] rounded-lg p-2 bg-red-500 '>
                Expired
            </button>
            <button v-else @click="markComplete(state.task._id,state.task.title, state.task.deadline)" class=" text-white w-[50%] rounded-lg p-2 bg-orange-500 hover:bg-green-500">
                Incomplete
            </button>

        </div>
    </div>
        
</template>