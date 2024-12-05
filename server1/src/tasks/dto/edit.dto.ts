import { IsNotEmpty, IsString } from "class-validator";
import { TaskDto } from "./tasks.dto";

export class EditDto{
    task:TaskDto;

    @IsString()
    @IsNotEmpty()
    taskId:string
}