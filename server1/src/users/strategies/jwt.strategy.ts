import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly configService:ConfigService){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpression:false,
            secretOrKey:configService.get<string>('JWT_SECRET') 
        })
    }

    validate(payload:any){
        console.log("inside jwt strategy")
        // console.log(payload);
        return payload
        
    }
}