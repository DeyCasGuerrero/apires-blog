import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Post('register')
    register(@Body() register:RegisterDto){
        return this.authService.register(register);
    }

    @Post('login')
    Login(@Body() userLogin:LoginDto){
        return this.authService.login(userLogin);
    }

    @Get('profile')
    @UseGuards(AuthGuard)
    GetProfile(@Request() req){
        return req.user;
    }

}
