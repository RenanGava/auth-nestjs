import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { compare } from 'bcrypt'
import { Model } from 'mongoose';
import { User } from './models/users.model';
import { AuthService } from 'src/auth/auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';



interface SigninReturnDTO {
    name: string;
    jwtToken: string;
    email: string
}

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User')
        private readonly userModel: Model<User>,
        private readonly authService: AuthService,
    ) { }

    public async signup(signupDto: SignupDto): Promise<User> {

        // passamos qual usuário queremos criar aqui para o model do mongo
        const user = new this.userModel(signupDto)

        // aqui salvamos o usuário
        return user.save()
    }

    public async signin(signinDto: SigninDto): Promise<SigninReturnDTO> {

        const user = await this.findByEmail(signinDto.email)
        const match = await this.checkPassword(signinDto.password, user)

        if(!match){
            throw new NotFoundException('Invalid Credentials')
        }

        const jwtToken = await this.authService.createAccessToken(user._id)

        return {
            name: user.name,
            email: user.email,
            jwtToken: jwtToken
        }
    }

    public async findAll(): Promise<User[]>{
        return await this.userModel.find()
    }

    private async findByEmail(email: string): Promise<User> {
        const user = await this.userModel.findOne({
            email: email
        })

        if(!user){
            throw new NotFoundException('User not Found!')
        }
        return user
    }

    private async checkPassword(password: string, user: User): Promise<boolean>{
        
        const match = await compare(password, user.password)

        if(!match){
            throw new NotFoundException('Password not Found!')
        }
        
        return match
    }

}
