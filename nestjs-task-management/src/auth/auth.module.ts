import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRespository } from './user.respository';

@Module({
  imports:[
    TypeOrmModule.forFeature([UserRespository])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
