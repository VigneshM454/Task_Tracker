import { Controller, Get, Post,Body,Put, Delete, Req, UseGuards,Patch, Param } from "@nestjs/common";
import { Request } from "express";
import { JwtAuthGuard } from "src/users/guards/jwt.guard";
import { EditDto } from "./dto/edit.dto";
import { TaskDto } from "./dto/tasks.dto";
import { TasksService } from "./tasks.service";

interface User {
    _id: string;
    username: string;
    exp: number;
    iat:number
  }
  
  interface UserRequest extends Request {
    user: User; 
  }

@Controller('tasks')
export class TasksController{
    constructor(private readonly taskService:TasksService){

    }
   @UseGuards(JwtAuthGuard)
    @Get()
    showTasks(@Req() req:UserRequest){
        const user=req.user
        // console.log(user.username)
        if(!user._id) return user;
        return this.taskService.showTasks(user._id)
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    addTasks(@Req() req:UserRequest,@Body() taskDto:TaskDto){
      const user=req.user
      // console.log(user.username)
      if(!user._id) return user;
      return this.taskService.addTasks(user._id,taskDto)
    }

    @UseGuards(JwtAuthGuard)
    @Put('edit')
    editTasks(@Req() req:UserRequest, @Body() editDto:EditDto){
      console.log(editDto);
      return this.taskService.editTasks(editDto)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:taskId')
    deleteTasks(@Req() req:UserRequest, @Param('taskId') taskId:string){
      console.log('taskId');
      console.log(taskId);
      
      //need to remove taskId from user
      const user=req.user;
      // console.log(user);
      if(!user._id) return user;
      return this.taskService.deleteTasks(user._id,taskId)
    }

    @UseGuards(JwtAuthGuard)
    @Patch('complete')
    completeTasks(@Req() req:UserRequest, @Body('taskId') taskId:string){
      console.log('taskId ');
      // console.log(taskId);
      
      const user=req.user;
      if(!user._id) return user;
      return this.taskService.completeTasks(taskId)
    }
}