import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schemas';
import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/sign-up.dto';
import { loginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: mongoose.Model<User>,
        private jwtService: JwtService
    ) { }

    async signUp(signUpDto: CreateUserDto,): Promise<{ token: string }> {
        const { name, email, password } = signUpDto
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds)

        const user = await this.userModel.create({
            name,
            email,
            password: hash
        })
        const token = this.jwtService.sign({ id: user._id });
        return { token }
    }

    async login(loginDto: loginDto,): Promise<{ token: string }> {
        const { email, password } = loginDto
        const user = await this.userModel.findOne({ email })
        if (!user) {
            throw new UnauthorizedException('Invalid email or password')
        }  

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            throw new UnauthorizedException('Invalid email or password')
        }

        const token = this.jwtService.sign({ id: user._id });
        return { token }
    }
}
