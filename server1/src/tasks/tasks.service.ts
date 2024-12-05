import { Injectable } from "@nestjs/common";
import { HttpException } from "@nestjs/common/exceptions";
// import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import  { Model } from "mongoose";
import { Tasks } from "src/schema/task.schema";
import { Users } from "src/schema/user.schema";
import { EditDto } from "./dto/edit.dto";
import { TaskDto } from "./dto/tasks.dto";

@Injectable()
export class TasksService{

    constructor(
        // private jwtService:JwtService,
        @InjectModel(Users.name) private userModel:Model<Users>,
        @InjectModel(Tasks.name) private taskModel:Model<Tasks>,
    ){}

    async showTasks(id:string){
        console.log("entered show tasks")
        const userData= await this.userModel.findById(id)
        let taskArr=[]
        if(userData.tasks.length>0){
            taskArr=await this.taskModel.find({_id: {'$in' :userData.tasks}})
            // console.log(taskArr)
        }
        return {username:userData.username,taskArr};
    }

    async addTasks(id:string,taskDto:TaskDto){
        console.log(taskDto)
        const newTask= new this.taskModel(taskDto)
        const addedTask = await newTask.save()
        // console.log('addedTask');
        // console.log(addedTask);
        
        const updateUser=await this.userModel.findByIdAndUpdate(id,{
            '$push':{tasks:newTask._id}
        })
        console.log(updateUser);
        return {addedTask}
    }

    async editTasks(editDto:EditDto){
        const {task,taskId}=editDto
        // console.log(task);
        const updatedTask= await this.taskModel.findByIdAndUpdate(taskId,task,{new:true})
        console.log(updatedTask);
        if(updatedTask) return updatedTask
        throw new HttpException('Invalid taskId',404)
    }

    async completeTasks(taskId:string){
        try{            
            const finishedTask=await  this.taskModel.findByIdAndUpdate(taskId,{isCompleted:true},{new:true})
            if(!finishedTask) throw new HttpException('Invalid taskId',404)
            return 'task updated successfully'
        }catch(err){
            console.log(err);
            throw new HttpException('some issue occured',500)
        }       
}

    async deleteTasks(userId:string,taskId:string){
        console.log('inside delete');
        console.log('user id is '+userId);
        console.log(taskId);
        try{
            const delLogs= await this.taskModel.deleteOne({_id:taskId})
            if(!delLogs) throw new HttpException('Task not deleted',404)
            const updateUserArr= await this.userModel.updateOne({_id:userId},{
                '$pull':{tasks:taskId}
            })
            console.log(delLogs);
            // console.log(updateUserArr);
            if(delLogs && updateUserArr)return 'task deleted Successfully'
            throw new HttpException('Cant delete the task',500)
        }catch(err){
            console.log(err);
            throw new HttpException('Some issues occured',500)
        } 
        
    }
}