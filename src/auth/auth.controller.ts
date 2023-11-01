import { Controller, Post, Res, Req, Get, HttpException, UseGuards} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Response, Request } from 'express';
import { UserDto } from '../user/dto/user-dto';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
// import { AuthGuard } from './auth.JwtGuard';
import { AuthGuard } from '@nestjs/passport';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
    dotenv.config();
  }
  @Post('register')
  async register(@Req() request: Request, @Res() response: Response) {
    const username = request.headers.username;
    let password = request.headers.password;
    const userDto = new UserDto();
    userDto.username = username;
    userDto.password = password;
    await this.userService.addUser(userDto);
    return response
      .status(201)
      .json({ message: 'user Added!', status: 201, payload: '' });
  }

  @Post('login')
  async login(@Req() request: Request, @Res() response: Response) {
    let username = request.headers.username;
    let password = request.headers.password;
    console.log("username: ", username);
    console.log("password: ", password);
    try {
      const userVerified = await this.userService.userExist({
        username: username,
        password: password,
      });
      console.log('verified User: ', userVerified);
      if (userVerified) {
        console.log("executing if...");
        const payload = {
          username: userVerified.username,
          sub: userVerified._id,
        };
        const token = this.jwtService.sign(payload, {
          secret: 'secretkeybiwebvuervbreuvovberovrevo',
        });
        console.log("jwt: ", token);
        return response.cookie("access_token", token, {expires: new Date(Date.now() + 3600000), httpOnly: true, secure: true, sameSite:'none'}).send({status: 200, payload: {username: userVerified.username, userId: userVerified._id}});
      }
      else
      {
        throw new HttpException("login failed...", 400);
      }
    } catch (error) {
      console.log(error);
      throw new HttpException("login failed!", 400)
    }
  }


  @Get('verify')
  @UseGuards(AuthGuard('jwt'))
  async verify(@Req() request, @Res() response:Response)
  {
    console.log("user in request: ", request.user);
    return response.status(200).json({message: "user verified...", status: 200, payload: request.user});
  }
}