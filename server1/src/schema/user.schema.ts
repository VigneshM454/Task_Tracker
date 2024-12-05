import { Prop, Schema , SchemaFactory} from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Tasks } from "./task.schema";

@Schema()
export class Users{

    @Prop({required:true, unique:true})
    username:string;

    @Prop({required:true})
    password:string;

    @Prop({type: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Tasks'
        }
    ]})
    tasks:Tasks[];

}

export const UserSchema = SchemaFactory.createForClass(Users)