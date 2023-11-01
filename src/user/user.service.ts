import { HttpException, Injectable } from '@nestjs/common';
import { User } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddUserDto } from './dto/addUser-dto';
import { UserDto } from './dto/user-dto';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  addUser = async (addUserDto: AddUserDto) => {
    try {
      const newUser = new this.userModel(addUserDto);
      newUser.save();
      return true;
    } catch (error) {
      throw new HttpException('Signup Failed', 500);
    }
  };

  userExist = async (userDto: UserDto) => {
    try {
      const verifiedUser = await this.userModel.findOne({
        username: userDto.username,
        password: userDto.password,
      });
      console.log("user found: ", verifiedUser);
      if(verifiedUser)
      {
        return verifiedUser;
      }
      else
      {
        return undefined;
      }
    } catch (error) {
      throw new HttpException('user verification failed!', 500);
    }
  };
}
