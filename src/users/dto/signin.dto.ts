import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

class SigninDto {
    
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string
    
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    password: string
}

export { SigninDto }