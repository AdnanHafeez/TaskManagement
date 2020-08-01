import { Injectable } from '@nestjs/common';
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

        async signIn(authCredentialsDto: AuthCredentialsDto) {
            const result = await this.userRepository.validateUserPassword(authCredentialsDto);
            return result;
        }
}
