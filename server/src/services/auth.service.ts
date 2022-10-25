import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { Client } from '../../node_modules/fabric-client/lib/Client';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';

// const log4js = require('log4js');
// var logger = log4js.getLogger('auth.service.ts');

// const util = require('util');
// const fs = require('fs-extra');
// const path = require('path');

// var hfc = require('../../node_modules/fabric-client');
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

  public async getClientForOrg(orgName: string): Promise<Client> {
    logger.debug('getClientForOrg - ****** START %s', orgName);

    // get a fabric client loaded with a connection profile for this org
    const config = '../test-network/organizations/' + orgName;

    // build a client context and load it with a connection profile
    // lets only load the network settings and save the client for later
    const client = hfc.loadFromConfig(hfc.getConfigSetting('network' + config));

    // This will load a connection profile over the top of the current one one
    // since the first one did not have a client section and the following one does
    // nothing will actually be replaced.
    // This will also set an admin identity because the organization defined in the
    // client section has one defined
    client.loadFromConfig(hfc.getConfigSetting(orgName + config));

    // this will create both the state store and the crypto store based
    // on the settings in the client section of the connection profile
    await client.initCredentialStores();

    // The getUserContext call tries to get the user from persistence.
    // If the user has been saved to persistence then that means the user has
    // been registered and enrolled. If the user is found in persistence
    // the call will then assign the user to the client object.
    const user = await client.getUserContext(orgName, true);
    if (!user) {
      throw new Error(util.format('User was not found :', orgName));
    } else {
      logger.debug('User %s was found to be registered and enrolled', orgName);
    }

    logger.debug('getClientForOrg - ****** END %s \n\n', orgName);

    return client;
  }

  public async getRegisteredUser(email: string): Promise<boolean> {
    try {
      const client = await this.getClientForOrg(email);
      logger.debug('Successfully initialized the credential stores');
      // client can now act as an agent for organization Org1
      // first check to see if the user is already enrolled
      let user = await client.getUserContext(email, true);
      if (user && user.isEnrolled()) {
        logger.info('Successfully loaded member from persistence');
      } else {
        // user was not enrolled, so we will need an admin user object to register
        logger.info(
          'User %s was not enrolled, so we will need an admin user object to register',
          email
        );
        const admins = hfc.getConfigSetting('admins');
        const adminUserObj = await client.setUserContext({
          username: admins[0].username,
          password: admins[0].secret
        });
        const caClient = client.getCertificateAuthority();
        const secret = await caClient.register(
          {
            enrollmentID: email,
            affiliation: email.toLowerCase() + '.department1',
            attrs: [{ name: 'role', value: 'approver', ecert: true }]
          },
          adminUserObj
        );
        // let secret = await caClient.register({
        // 	enrollmentID: username,
        // 	affiliation: userOrg.toLowerCase() + '.department1'
        // }, adminUserObj);
        logger.debug('Successfully got the secret for user %s', email);
        user = await client.setUserContext({
          username: email,
          password: secret,
          attr_reqs: [{ name: 'role', optional: false }]
        });
        // user = await client.setUserContext({ username: username, password: secret });
        logger.debug(
          'Successfully enrolled username %s  and setUserContext on the client object',
          email
        );
      }
      if (user && user.isEnrolled) {
        // var response = {
        //   success: true,
        //   secret: user._enrollmentSecret,
        //   message: email + ' enrolled Successfully',
        // };

        return user._enrollmentSecret.toString;
      } else {
        throw new Error('User was not enrolled ');
      }
    } catch (error) {
      logger.error(
        'Failed to get registered user: %s with error: %s',
        email,
        error.toString()
      );
      return 'failed ' + error.toString();
    }
  }

  public async createChannel(
    channelName,
    channelConfigPath,
    username,
    orgName
  ) {
    logger.debug("\n====== Creating Channel '" + channelName + "' ======\n");
    try {
      // first setup the client for this org
      const client = await this.getClientForOrg(orgName);
      logger.debug(
        'Successfully got the fabric client for the organization "%s"',
        orgName
      );

      // read in the envelope for the channel config raw bytes
      const envelope = fs.readFileSync(path.join(__dirname, channelConfigPath));
      // extract the channel config bytes from the envelope to be signed
      const channelConfig = client.extractChannelConfig(envelope);

      //Acting as a client in the given organization provided with "orgName" param
      // sign the channel config bytes as "endorsement", this is required by
      // the orderer's channel creation policy
      // this will use the admin identity assigned to the client when the connection profile was loaded
      const signature = client.signChannelConfig(channelConfig);

      const request = {
        config: channelConfig,
        signatures: [signature],
        name: channelName,
        txId: client.newTransactionID(true) // get an admin based transactionID
      };

      // send to orderer
      const response = await client.createChannel(request);
      logger.debug(' response ::%j', response);
      if (response && response.status === 'SUCCESS') {
        logger.debug('Successfully created the channel.');
        const response = {
          success: true,
          message: "Channel '" + channelName + "' created Successfully"
        };
        return response;
      } else {
        logger.error(
          "\n!!!!!!!!! Failed to create the channel '" +
            channelName +
            "' !!!!!!!!!\n\n"
        );
        throw new Error("Failed to create the channel '" + channelName + "'");
      }
    } catch (err) {
      logger.error(
        'Failed to initialize the channel: ' + err.stack ? err.stack : err
      );
      throw new Error('Failed to initialize the channel: ' + err.toString());
    }
  }

  public async joinChannel(channelName, peers, username, orgname) {
    logger.debug('\n\n============ Join Channel start ============\n');
    let error_message = null;
    const all_eventhubs = [];
    try {
      logger.info(
        'Calling peers in organization "%s" to join the channel',
        orgname
      );

      // first setup the client for this org
      const client = await this.getClientForOrg(orgname);
      logger.debug(
        'Successfully got the fabric client for the organization "%s"',
        orgname
      );
      const channel = client.getChannel(channelName);
      if (!channel) {
        const message = util.format(
          'Channel %s was not defined in the connection profile',
          channelName
        );
        logger.error(message);
        throw new Error(message);
      }

      // next step is to get the genesis_block from the orderer,
      // the starting point for the channel that we want to join
      const request = {
        txId: client.newTransactionID(true) //get an admin based transactionID
      };
      const genesis_block = await channel.getGenesisBlock(request);

      // tell each peer to join and wait 10 seconds
      // for the channel to be created on each peer
      const promises = [];
      promises.push(new Promise((resolve) => setTimeout(resolve, 10000)));

      const join_request = {
        targets: peers, //using the peer names which only is allowed when a connection profile is loaded
        txId: client.newTransactionID(true), //get an admin based transactionID
        block: genesis_block
      };
      const join_promise = channel.joinChannel(join_request);
      promises.push(join_promise);
      const results = await Promise.all(promises);
      logger.debug(util.format('Join Channel R E S P O N S E : %j', results));

      // lets check the results of sending to the peers which is
      // last in the results array
      const peers_results = results.pop();
      // then each peer results
      for (const i in peers_results) {
        const peer_result = peers_results[i];
        if (peer_result.response && peer_result.response.status == 200) {
          logger.info(
            'Successfully joined peer to the channel %s',
            channelName
          );
        } else {
          const message = util.format(
            'Failed to join peer to the channel %s',
            channelName
          );
          error_message = message;
          logger.error(message);
        }
      }
    } catch (error) {
      logger.error(
        'Failed to join channel due to error: ' + error.stack
          ? error.stack
          : error
      );
      error_message = error.toString();
    }

    // need to shutdown open event streams
    all_eventhubs.forEach((eh) => {
      eh.disconnect();
    });

    if (!error_message) {
      const message = util.format(
        'Successfully joined peers in organization %s to the channel:%s',
        orgname,
        channelName
      );
      logger.info(message);
      // build a response to send back to the REST caller
      const response = {
        success: true,
        message: message
      };
      return response;
    } else {
      const message = util.format(
        'Failed to join all peers to channel. cause:%s',
        error_message
      );
      logger.error(message);
      throw new Error(message);
    }
  }
}

export default AuthService;
