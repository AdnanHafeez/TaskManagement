import { Injectable } from '@nestjs/common';
import { UserRespository } from './user.respository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
    
    constructor(
        @InjectRepository(UserRespository)
        private userRepository: UserRespository){}
}
