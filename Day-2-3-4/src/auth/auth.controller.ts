import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/sign-up.dto';
import { loginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Post("/signup")
    async SignUp(
        @Body()
        signUpDto: CreateUserDto
    ): Promise<{ token: string }> {
        return this.authService.signUp(signUpDto)
    }

    @Post("/login")
    async login(
        @Body()
        loginDto: loginDto
    ): Promise<{ token: string }> {
        return this.authService.login(loginDto)
    }
}
