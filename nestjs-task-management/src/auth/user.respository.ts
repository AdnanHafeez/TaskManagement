import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { InternalServerErrorException } from "@nestjs/common";
import * as bcrypt  from 'bcrypt';

@EntityRepository(User)
export class UserRespository extends Repository<User> {
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const {username, password} = authCredentialsDto;
        const user = new User();
        user.username = username;
        const salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, salt);
        user.salt = salt;
        try {
            await user.save();
        } catch(error) {
            throw new InternalServerErrorException(error);
        }
    }

    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const {username, password} = authCredentialsDto;
        const user = await this.findOne({username});
        const passwordValid = await user.validateUserPassword(password);
        console.log('Password validated', passwordValid);
        if(user && passwordValid ){
            return user.username;
        }
        else {
            return null;
        }
    }
    private async hashPassword(password: string, salt : string) : Promise<string> {
        return bcrypt.hash(password, salt);
    }
}