import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';

// var log4js = require('log4js');
// var logger = log4js.getLogger('auth');

// var path = require('path');
// var util = require('util');

// var hfc = require('fabric-client');
// hfc.setLogger(logger);

class AuthService {
  public users = userModel;

  public async signup(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (findUser)
      throw new HttpException(
        409,
        `This email ${userData.email} already exists`
      );

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.users.create({
      ...userData,
      password: hashedPassword
    });

    return createUserData;
  }

  public async login(
    userData: CreateUserDto
  ): Promise<{ cookie: string; findUser: User }> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (!findUser)
      throw new HttpException(
        409,
        `This email ${userData.email} was not found`
      );

    const isPasswordMatching: boolean = await compare(
      userData.password,
      findUser.password
    );
    if (!isPasswordMatching)
      throw new HttpException(409, 'Password is not matching');

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser };
  }

  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await this.users.findOne({
      email: userData.email,
      password: userData.password
    });
    if (!findUser)
      throw new HttpException(
        409,
        `This email ${userData.email} was not found`
      );

    return findUser;
  }

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
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }

  public async getClientForOrg(userData) {
    logger.debug('getClientForOrg - ****** START %s', userData);
    // get a fabric client loaded with a connection profile for this org
    const config = '../test-network/organizations/' + userData.org;

    // build a client context and load it with a connection profile
    // lets only load the network settings and save the client for later
    const client = hfc.loadFromConfig(hfc.getConfigSetting('network' + config));

    // This will load a connection profile over the top of the current one one
    // since the first one did not have a client section and the following one does
    // nothing will actually be replaced.
    // This will also set an admin identity because the organization defined in the
    // client section has one defined
    client.loadFromConfig(hfc.getConfigSetting(userData + config));

    // this will create both the state store and the crypto store based
    // on the settings in the client section of the connection profile
    await client.initCredentialStores();

    // The getUserContext call tries to get the user from persistence.
    // If the user has been saved to persistence then that means the user has
    // been registered and enrolled. If the user is found in persistence
    // the call will then assign the user to the client object.
    if (userData) {
      const user = await client.getUserContext(userData, true);
      if (!user) {
        throw new Error(util.format('User was not found :', userData));
      } else {
        logger.debug(
          'User %s was found to be registered and enrolled',
          userData
        );
      }
    }
    logger.debug('getClientForOrg - ****** END %s \n\n', userData);

    return client;
  }

  public async getRegisteredUser(userData, isJson) {
    try {
      const client = await this.getClientForOrg(userData);
      logger.debug('Successfully initialized the credential stores');
      // client can now act as an agent for organization Org1
      // first check to see if the user is already enrolled
      let user = await client.getUserContext(userData, true);
      if (user && user.isEnrolled()) {
        logger.info('Successfully loaded member from persistence');
      } else {
        // user was not enrolled, so we will need an admin user object to register
        logger.info(
          'User %s was not enrolled, so we will need an admin user object to register',
          userData.email
        );
        const admins = hfc.getConfigSetting('admins');
        const adminUserObj = await client.setUserContext({
          username: admins[0].username,
          password: admins[0].secret
        });
        const caClient = client.getCertificateAuthority();
        const secret = await caClient.register(
          {
            enrollmentID: userData.enrollmentID,
            affiliation: userData.toLowerCase() + '.department1',
            attrs: [{ name: 'role', value: 'approver', ecert: true }]
          },
          adminUserObj
        );
        // let secret = await caClient.register({
        // 	enrollmentID: username,
        // 	affiliation: userOrg.toLowerCase() + '.department1'
        // }, adminUserObj);
        logger.debug('Successfully got the secret for user %s', userData.email);
        user = await client.setUserContext({
          username: userData.email,
          password: secret,
          attr_reqs: [{ name: 'role', optional: false }]
        });
        // user = await client.setUserContext({ username: username, password: secret });
        logger.debug(
          'Successfully enrolled username %s  and setUserContext on the client object',
          userData.email
        );
      }
      if (user && user.isEnrolled) {
        if (isJson && isJson === true) {
          const response = {
            success: true,
            secret: user._enrollmentSecret,
            message: userData.email + ' enrolled Successfully'
          };
          return response;
        }
      } else {
        throw new Error('User was not enrolled ');
      }
    } catch (error) {
      logger.error(
        'Failed to get registered user: %s with error: %s',
        userData.email,
        error.toString()
      );
      return 'failed ' + error.toString();
    }
  }
}

export default AuthService;
