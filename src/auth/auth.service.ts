import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async login(userLogin: LoginDto) {

        const user = await this.userService.findOneByEmail(userLogin.email)
        if (!user) {
            throw new UnauthorizedException('email is wrong');
        }

        const isPasswordValid = await bcrypt.compare(userLogin.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Password is incorrect');
        }

        const payload = { sub: user.idUser, email: user.email, name: user.name, country: user.country, role: user.role };

        const token = await this.jwtService.signAsync(payload);

        return {
            token,
            id: user.idUser,
            email: user.email,
            name: user.name,
            country: user.country,
            role: user.role
        };
    }

    async register(register: RegisterDto) {

        const user = await this.userService.findOneByEmail(register.email);

        if (user) {
            console.log(user);
            throw new BadRequestException('user already exists');
        }

        const hashedPassword = await this.hashPassword(register.password);
        const newUser = { ...register, password: hashedPassword };
        await this.userService.create(newUser);
        return newUser;
    }


    private async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }
}
