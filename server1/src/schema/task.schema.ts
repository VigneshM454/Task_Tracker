import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({timestamps:true})
export class Tasks{

    @Prop({required:true})
    title:string;

    @Prop({required:true})
    desc:string;

    @Prop({required:true})
    deadline: Date;

    @Prop({default:false})
    isCompleted:boolean;

    @Prop({
        required:true,
        enum:['Personal','Work','Project'],
        default:'Personal'
    })
    type:string

}

export const TaskSchema=SchemaFactory.createForClass(Tasks)