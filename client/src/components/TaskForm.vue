<script setup>
    import { useRouter } from "vue-router";
    import { useStore } from 'vuex'
    import { useToast } from 'vue-toastification';
    const toast=useToast()
    const router=useRouter()
    const store=useStore()

    const tasks= store.state.tasks
    const state= defineProps({
        isEdit:{
            type:Boolean,
        },data:{
            type:Object,
        }
    });

    function resetData(){
        state.data={  title:'', desc:'', deadline: new Date(), type:'Personal' }
        state.isEdit=false
    }
    
    if(state.isEdit){
        // console.log(state.data);
        let d=new Date(state.data.deadline)
        const localDate = new Date(d.getTime() - (d.getTimezoneOffset() * 60000));
        state.data.deadline=localDate.toISOString().slice(0, 16)
    }

    function handleTask(){
        console.log(state.data)
        let date=parseInt(new Date(state.data.deadline).getTime() - new Date().getTime())
        if(state.data.title.length<5 || state.data.title.length>30){
            toast.warning("Title should be betwn 5 and 30 character")
        }else if(state.data.desc.length<20 || state.data.desc.length>300){
            toast.warning("Descriptn should be betwn 20 and 300 characters")
        }
        else if(date<= 3600000){
            toast.warning("Deadline should atleast be 1hr ahead of current time")
        }
        else{
            console.log(state.data)
            if(state.isEdit){
                store.dispatch('editTaskApi',{task:state.data,router})
            }else{
                let data=state.data;
                resetData()
                store.dispatch('addTaskApi',{task:data,router})
            }
        }
    }

</script>

<template>
    <form @submit.prevent="handleTask" class="container m-auto max-w-2xl  p-6 my-12 flex flex-col  border border-black border-none shadow-md shadow-gray-600  rounded-xl gap-2 bg-white">
        <h1 class="text-3xl font-bold text-center mb-4 text-orange-500">
            <span  v-if="isEdit"> Edit Task</span>
            <span v-else>Add Task</span>
        </h1>
        <div class="mb-3 ">
            <label class="block text-gray-700 font-bold mb-3" for="tname">Task Name</label>
            <input class="border rounded w-full py-2 px-3 mb-2" type="text" name="" id="tname" minlength="5" maxlength="30" v-model="data.title">
        </div>
        <div class="mb-3 ">
            <label class="block text-gray-700 font-bold mb-3" for="tdesc">Task Description</label>
            <textarea name="" class=" border rounded w-full py-2 px-3 mb-2" id="tdesc" cols="30" minlength="20" maxlength="300" v-model="data.desc"></textarea>
        </div>
        <div class="mb-3 ">
            <label class="block text-gray-700 font-bold mb-3" for="ttime">Deadline</label>
            <input type="datetime-local" class="border rounded w-full py-2 px-3 mb-2"  name="" id="ttime" v-model="data.deadline">
        </div>
        <div class="mb-3 ">
            <label class="block text-gray-700 font-bold mb-3" for="ttype">Task Type</label>
            <select class="border rounded w-full py-2 px-3 mb-2" name="" id="ttype" v-model="data.type">
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Project">Project</option>
            </select>
        </div>
        <button type="submit" class="bg-orange-500 text-white rounded-lg py-2"> 
            <span  v-if="isEdit"> Edit Task</span>
            <span v-else>Add Task</span>
        </button>

    </form>    
</template>