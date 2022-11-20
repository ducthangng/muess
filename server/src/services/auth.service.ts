import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { CreateUserDto, LoginUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';
import log4js from 'log4js';
import hfc from 'fabric-client';
import { User } from '../interfaces/users.interface';
import { CreateUserDTO } from '@interfaces/users.interface';
import { X509Identity } from 'fabric-network';
import { createIdentity, initContract } from '@/utils/hlfUtils';

const logger = log4js.getLogger('auth.service.ts');
hfc.setLogger(logger);

// const log4js = require('log4js');
// var logger = log4js.getLogger('auth.service.ts');

// const util = require('util');
// const fs = require('fs-extra');
// const path = require('path');

// var hfc = require('../../node_modules/fabric-client');
// hfc.setLogger(logger);

class AuthService {
  public users = userModel;

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { _id: user._id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 3 * 24 * 6 * 60;

    return {
      expiresIn,
      token: sign(dataStoredInToken, secretKey, { expiresIn: expiresIn })
    };
  }

  // sign up a user
  public async register(userData: CreateUserDTO) {
    if (isEmpty(userData))
      throw new HttpException(400, 'userData cannot be empty');

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (findUser)
      throw new HttpException(
        409,
        `User with email ${userData.email} already exists`
      );

    const hashedPassword = await hash(userData.password, 10);
    const x509Identity = await createIdentity(userData.email);
    console.log('after createIdentity, x509Identity is');
    console.log(x509Identity);
    const contract = await initContract(x509Identity);
    const clientIdentity = await contract.evaluateTransaction(
      'GetClientIdentity'
    );

    console.log('user: ', userData.fullname, userData.dob, userData.username);

    const createdUser: User = await this.users.create({
      _id: clientIdentity,
      email: userData.email,
      password: hashedPassword,
      fullname: userData.fullname,
      username: userData.username,
      dob: userData.dob,
      x509Identity: JSON.stringify(x509Identity)
    });

    return {
      cookie: this.createToken(createdUser),
      user: createdUser
    };
  }

  // login a user and return a cookie
  public async login(userData: LoginUserDto) {
    if (isEmpty(userData))
      throw new HttpException(400, 'userData cannot be empty');

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (!findUser) {
      throw new HttpException(409, 'Email or Password is wrong');
    }

    const isPasswordMatching: boolean = await compare(
      userData.password,
      findUser.password
    );
    if (!isPasswordMatching) {
      throw new HttpException(409, 'Email or Password is wrong');
    }

    const identity: X509Identity = JSON.parse(findUser.x509Identity);

    console.log('findUser:');
    console.log(findUser);
    return {
      cookie: this.createToken(findUser),
      user: findUser
    };
  }
}

export default AuthService;
