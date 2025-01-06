import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { CreateProfileInput } from 'src/profile/dto/create-profile.input';
import { Profile } from 'src/profile/entities/profile.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as moment from 'moment';
import * as bcrypt from 'bcrypt';
import { Earning } from 'src/earnings/entities/earning.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Earning) private earningRepository: Repository<Earning>,
    private jwtService: JwtService,
  ) {}

  async create(userInput: CreateUserInput): Promise<any> {
    const { email, userName } = userInput;

    if (email?.length == 0 || email == null) {
      throw new BadRequestException(`email can't be empty`);
    } else if (userName?.length == 0 || userName == null) {
      throw new BadRequestException(`user name can't be empty`);
    }

    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    const uniqueName = await this.userRepository.findOne({
      where: { userName },
    });
    if (user !== null || user?.email == email) {
      throw new BadRequestException('user already exist');
    } else if (uniqueName !== undefined && uniqueName?.userName) {
      throw new BadRequestException('username already exist');
    } else {
      userInput.password = await this.getPasswordHash(userInput.password);
      const senditan = await this.userRepository.create(userInput);
      const createProfile = await this.profileRepository.create();
      const createWallet = await this.earningRepository.create();
      const earning = await this.earningRepository.save(createWallet);
      const profile = await this.profileRepository.save(createProfile);

      const signUpToken = await this.getJwtToken({
        role: profile.role,
      });

      senditan.profile = profile;
      senditan.earning = earning;
      senditan.refreshToken = signUpToken;
      return this.userRepository.save(senditan);
    }
  }

  async validateUser({ userId }): Promise<any> {
    const id = userId;
    const user = await this.findOne(id);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  private async getPasswordHash(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  async verifyToken(token: string): Promise<any> {
    return await this.jwtService.decode(token);
  }

  public async getJwtToken(dataToken): Promise<string> {
    const payload = {
      ...dataToken,
    };
    return this.jwtService.signAsync(payload);
  }

  public async getRefreshToken(userId: string, role: string): Promise<any> {
    const payload = {
      userId,
      role,
    };
    const token = await this.jwtService.signAsync(payload);
    const userDataToUpdate = {
      refreshToken: token,
      refreshTokenExp: moment().day(10).format('YYYY/MM/DD'),
    };
    await this.userRepository.update(userId, userDataToUpdate);
    return userDataToUpdate;
  }

  async loginUser(userInput: CreateUserInput): Promise<any> {
    const { email, userName, password } = userInput;

    let user;
    if (email !== null && email !== undefined && email.length > 0) {
      user = await this.userRepository.findOne({
<<<<<<< HEAD
        relations: ['profile', 'earning', 'package', 'notification'],
=======
        relations: ['profile', 'earning'],
>>>>>>> origin/main
        where: {
          email,
        },
      });
    } else if (
      userName !== null &&
      userName !== undefined &&
      userName.length > 0
    ) {
      user = await this.userRepository.findOne({
<<<<<<< HEAD
        relations: ['profile', 'notification', 'earning', 'package'],
=======
        relations: ['profile', 'notification', 'earning'],
>>>>>>> origin/main
        where: {
          userName,
        },
      });
    } else {
      throw new BadRequestException(`username or email can't be empty`);
    }

    if (user == null) {
      throw new BadRequestException('wrong username or email');
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new BadRequestException('invalid password');
    }
    const userId = user.id;
    const role = user.profile.role;
    const { refreshToken, refreshTokenExp } = await this.getRefreshToken(
      userId,
      role,
    );

    const result = { ...user, refreshToken, refreshTokenExp };

    return result;
  }

  findUserByName(userName: string): Promise<User> {
    return this.userRepository.findOne({
      relations: ['profile', 'notification', 'earning'],
      where: {
        userName,
      },
    });
  }

  currentUser(user): Promise<User> {
    const { email } = user;
    return this.userRepository.findOne({
      relations: ['profile', 'profile.file', 'notification', 'earning'],
      where: {
        email,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['profile', 'notification', 'earning'],
    });
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    const userToUpdate = await this.userRepository.findOne({
      where: { id },
    });
    const clean = (obj) => {
      for (const prop in obj) {
        if (obj[prop] === null || obj[prop] === undefined) {
          delete obj[prop];
        }
      }
      return obj;
    };
    const value = clean(updateUserInput);
    value.password = await this.getPasswordHash(value.password);
    const result = { ...userToUpdate, ...value };
    return this.userRepository.save(result);
  }

<<<<<<< HEAD
  async updatePassword(
    id: string,
    updateUserInput: UpdateUserInput,
  ): Promise<User> {
    const userToUpdate = await this.userRepository.findOne({
      where: { id },
    });
    const clean = (obj) => {
      for (const prop in obj) {
        if (obj[prop] === null || obj[prop] === undefined) {
          delete obj[prop];
        }
      }
      return obj;
    };
    const value = clean(updateUserInput);
    const oldPassword = await bcrypt.compare(
      value.password,
      userToUpdate.password,
    );
    if (!oldPassword) {
      throw new BadRequestException('old password does not match');
    }
    value.password = await this.getPasswordHash(value.newPassword);
    const result = { ...userToUpdate, ...value };
    return this.userRepository.save(result);
  }

=======
>>>>>>> origin/main
  async remove(id: string): Promise<User> {
    const removeUser: User = await this.userRepository.findOne({
      where: { id },
    });
    await this.userRepository.remove(removeUser);
    return removeUser;
  }
}
