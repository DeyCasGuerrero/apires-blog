import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {

    constructor(private readonly userService:UserService){}

    async login(){
        
        return "Logged in successfully";
    }

    async register(register:RegisterDto){
        await this.userService.create(register);
        return register;
    }
}
