import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

class SignupDto {

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string
    
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    password: string
}

export { SignupDto }