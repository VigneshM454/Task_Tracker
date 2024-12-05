import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UserService } from "./users.service";
import {MongooseModule} from '@nestjs/mongoose'
import { Users, UserSchema } from "src/schema/user.schema";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    imports:[
        JwtModule.registerAsync({
            imports:[ConfigModule],
            inject:[ConfigService],
            useFactory:(configService:ConfigService)=>({
                secret:configService.get<string>('JWT_SECRET'),
                signOptions:{ expiresIn:'1h' }    
            })
        }),
        PassportModule,
        MongooseModule.forFeature([
            {
                name:Users.name,
                schema:UserSchema
            }
        ])
    ],
    exports:[JwtModule],
    controllers:[UsersController],
    providers:[UserService, LocalStrategy,JwtStrategy]
})
export class UsersModule{

}