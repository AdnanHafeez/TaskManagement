import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRespository } from './user.respository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
    
    constructor(
        @InjectRepository(UserRespository)
        private userRepository: UserRespository){}

        async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>{
            return this.userRepository.signUp(authCredentialsDto);
        }

        async signIn(authCredentialsDto: AuthCredentialsDto) : Promise<string> {
            const username = await this.userRepository.validateUserPassword(authCredentialsDto);
            if(!username){
                throw new UnauthorizedException('Invalid credentials');
            }
            return username;
        }
}
