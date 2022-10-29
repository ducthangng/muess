import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';
import log4js from 'log4js';
import hfc from 'fabric-client';
import path from 'path';
import { User } from '../interfaces/users.interface';
import { CreateUserDTO } from '@interfaces/users.interface';
import { buildCCPOrg1, buildWallet } from '../utils//AppUtil';
import { buildCAClient, registerAndEnrollUser } from '../utils/CAUtil';
import { X509Identity } from 'fabric-network';
import { mspOrg1 } from './hlf.service';

const walletPath = path.join(__dirname, 'wallet');

const logger = log4js.getLogger('auth.service.ts');
hfc.setLogger(logger);

class AuthService {
  public users = userModel;

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { _id: user._id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return {
      expiresIn,
      token: sign(dataStoredInToken, secretKey, { expiresIn })
    };
  }

  public createCookie(tokenData: TokenData): string {
    return `token=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }

  // sign up a user
  public async signUp(
    userData: CreateUserDTO
  ): Promise<{ cookie: string; findUser: User }> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (findUser)
      throw new HttpException(
        409,
        `You're email ${userData.email} already exists`
      );

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.users.create({
      ...userData,
      password: hashedPassword
    });

    // build an in memory object with the network configuration (also known as a connection profile)
    const ccp = buildCCPOrg1();

    // // build an instance of the fabric ca services client based on
    // // the information in the network configuration
    const caClient = buildCAClient(ccp, 'ca.org1.example.com');

    // // setup the wallet to hold the credentials of the application user
    const wallet = await buildWallet(walletPath);

    // // in a real application this would be done only when a new user was required to be added
    // // and would be part of an administrative flow
    const identity: X509Identity = await registerAndEnrollUser(
      caClient,
      wallet,
      mspOrg1,
      createUserData._id,
      'org1.department1'
    );

    // Update the created user with identity
    await this.users.findOneAndUpdate(
      {
        email: createUserData.email,
        password: createUserData.password
      },
      { identity: JSON.stringify(identity) }
    );

    return {
      cookie: this.createCookie(this.createToken(createUserData)),
      findUser: createUserData
    };
  }

  // login a user and return a cookie
  public async logIn(
    userData: CreateUserDto
  ): Promise<{ cookie: string; findUser: User }> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (!findUser) {
      throw new HttpException(409, 'Username or Password not found');
    }

    const isPasswordMatching: boolean = await compare(
      userData.password,
      findUser.password
    );
    if (!isPasswordMatching) {
      throw new HttpException(409, 'Username or Password not found');
    }

    const identity: X509Identity = JSON.parse(findUser.identity);

    console.log('findUser', findUser);
    console.log(`user's identity: `, identity);

    return {
      cookie: this.createCookie(this.createToken(findUser)),
      findUser
    };
  }

  // logout
  public logOut(): string {
    return this.createCookie({ expiresIn: 0, token: '' });
  }
}

export default AuthService;
