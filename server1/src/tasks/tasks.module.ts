import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Tasks, TaskSchema } from "src/schema/task.schema";
import { Users, UserSchema } from "src/schema/user.schema";
import { UsersModule } from "src/users/users.module";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";

@Module({
    imports:[
        MongooseModule.forFeature([
            {name:Tasks.name, schema:TaskSchema},
            {name:Users.name,schema:UserSchema}
        ]),
        UsersModule,
        // Users
    ],
    exports:[],
    controllers:[TasksController],
    providers:[TasksService]
})
export class TasksModule{

}