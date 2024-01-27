import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSchema } from 'src/users/schemas/users.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategie/jwt.strategy';

// aqui configuramos todos os modulos necessários para
// a realizarmos a autenticação de usuário e gerar o jwt.

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: "User",
        schema: UserSchema
      }
    ]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions:{
        expiresIn: process.env.JWT_EXPIRATION
      }
    })
  ],
  providers: [AuthService, JwtStrategy], // aqui importamos o servicos para o nestjs
  exports:[AuthService]
})
export class AuthModule {}
