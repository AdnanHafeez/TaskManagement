import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRespository } from './user.respository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    
    constructor(
        @InjectRepository(UserRespository)
        private userRepository: UserRespository,
        private jwtService: JwtService,){}

        async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>{
            return this.userRepository.signUp(authCredentialsDto);
        }

        async signIn(authCredentialsDto: AuthCredentialsDto) : Promise<{accessToken: string}> {
            const username : string = await this.userRepository.validateUserPassword(authCredentialsDto);
            if(!username){
                throw new UnauthorizedException('Invalid credentials');
            }
            const payload : JwtPayload= {username};
            const accessToken = await this.jwtService.sign(payload);
            return {accessToken};
        }
}
