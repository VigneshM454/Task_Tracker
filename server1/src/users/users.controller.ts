import { Controller, Get, Post, Body, UseGuards, Req } from "@nestjs/common";
import { UsePipes } from "@nestjs/common";
import { UserDto } from "./dto/users.dto";
import { JwtAuthGuard } from "./guards/jwt.guard";
import { LocalGuard } from "./guards/local.guard";
import { UserService } from "./users.service";
import { Request } from "express";
@Controller('users')
export class UsersController{
    constructor( private readonly userService:UserService){}


    @UseGuards(LocalGuard)
    @Post('login')
    loginUser(@Req() req:Request){// @Body() userDto:UserDto
        //return this.userService.loginUser(userDto)
        // console.log('in login usr')
        // console.log(req.user);
        return req.user
    }

    @Post('/create')
    createUser(@Req() req:Request, @Body() userDto:UserDto){
        // console.log('in sign in user')
        // console.log(req.user);
        return this.userService.createUser(userDto)
    }
}