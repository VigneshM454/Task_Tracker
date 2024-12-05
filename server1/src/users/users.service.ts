import { Injectable, NotFoundException } from "@nestjs/common";
import {InjectModel} from '@nestjs/mongoose'
import { Model } from "mongoose";
import { Users } from "src/schema/user.schema";
import * as  argon2 from 'argon2';
import { JwtService } from "@nestjs/jwt/dist";
import { UserDto } from "./dto/users.dto";
@Injectable()
export class UserService{

    constructor(
        private jwtService: JwtService,
        @InjectModel(Users.name) private userModel:Model<Users>,
    ){}

    async validateUsers({username,password}){ //generate jwt token
        const findUser= await this.userModel.findOne({username:username})
        if(!findUser) throw new NotFoundException('No such user exist');
        
        const validatePass=await argon2.verify(findUser.password,password)
        if(!validatePass) throw new NotFoundException('Invalid credentials');
        let token=this.jwtService.sign({username:findUser.username,_id:findUser._id})
        return {token:token,username:findUser.username}
    }


    async createUser(userDto:UserDto){
        console.log(userDto)
        const user= await  this.userModel.findOne({username:userDto.username})
        if(user) throw new NotFoundException('The user with same name already exist')

        const hash= await argon2.hash(userDto.password)
        console.log(hash)
        const newUser= new this.userModel({username:userDto.username,password:hash})
        const userData= await newUser.save()
        const data= {username:userData.username, _id:userData._id}
        let token=this.jwtService.sign(data)
        return {token,username:data.username}
    }
}