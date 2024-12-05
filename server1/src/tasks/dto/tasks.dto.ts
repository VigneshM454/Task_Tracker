import { IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export enum TaskType {
    WORK = 'Work',
    PERSONAL = 'Personal',
    PROJECT = 'Project',
}

export class TaskDto{
    @MinLength(5)
    @MaxLength(30)
    @IsNotEmpty()
    @IsString()
    title:string;

    @IsNotEmpty()
    @IsString()
    @MinLength(20)
    @MaxLength(300)
    desc:string;

    @IsNotEmpty()
    deadline:string;

    @IsNotEmpty()
    @IsEnum(TaskType)
    type:TaskType
}