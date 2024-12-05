import {PassportStrategy} from '@nestjs/passport'
import {Strategy} from 'passport-local'
import {Injectable, UnauthorizedException} from '@nestjs/common'
import { UserService } from '../users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private userService: UserService){
        super();
    }

    validate(username:string,password:string){
        const user=this.userService.validateUsers({username,password})
        if(!user) throw new UnauthorizedException();
        return user;
    }
}