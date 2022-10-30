import { buildCCPOrg1, buildWallet, prettyJSONString } from '../utils//AppUtil';
import { Gateway, GatewayOptions, X509Identity } from 'fabric-network';
import * as path from 'path';

import {
  buildCAClient,
  enrollAdmin,
  registerAndEnrollUser
} from '../utils/CAUtil';

const channelName = 'mychannel';
const chaincodeName = 'muess';
const mspOrg1 = 'Org1MSP';

const walletPath = path.join(__dirname, 'wallet');
const org1UserId = `appUser1`;

const testIdentity: X509Identity = {
  credentials: {
    certificate:
      '-----BEGIN CERTIFICATE-----\nMIICfTCCAiSgAwIBAgIUYapXGiVG2tA88VatJBKYX13VloEwCgYIKoZIzj0EAwIw\naDELMAkGA1UEBhMCVVMxFzAVBgNVBAgTDk5vcnRoIENhcm9saW5hMRQwEgYDVQQK\nEwtIeXBlcmxlZGdlcjEPMA0GA1UECxMGRmFicmljMRkwFwYDVQQDExBmYWJyaWMt\nY2Etc2VydmVyMB4XDTIyMTAzMDA0NTUwMFoXDTIzMTAzMDA1MTYwMFowRTEwMAsG\nA1UECxMEb3JnMTANBgNVBAsTBmNsaWVudDASBgNVBAsTC2RlcGFydG1lbnQxMREw\nDwYDVQQDEwhhcHBVc2VyMTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABPcsOFL8\nLzzQkifht28r/drB4dMPY497TQkMyLy1VupxIqlzuuOIycIt8s0tQjCHHnNtMEQO\nCINtTlQRG3pw2oijgc4wgcswDgYDVR0PAQH/BAQDAgeAMAwGA1UdEwEB/wQCMAAw\nHQYDVR0OBBYEFHaXjw76D34a97psTEG17vcUNwg3MB8GA1UdIwQYMBaAFC9zUGP9\n2i7eTw7JAp6M3sYV6m4lMGsGCCoDBAUGBwgBBF97ImF0dHJzIjp7ImhmLkFmZmls\naWF0aW9uIjoib3JnMS5kZXBhcnRtZW50MSIsImhmLkVucm9sbG1lbnRJRCI6ImFw\ncFVzZXIxIiwiaGYuVHlwZSI6ImNsaWVudCJ9fTAKBggqhkjOPQQDAgNHADBEAiBS\nvo0lHT3jtIJA37YsBsF4eLSRWgdIW7LN5J4ragl82QIgfX27hqGDO3L8/GPqxYpC\nZBsXsce6hU6Z9/16qg7jSL8=\n-----END CERTIFICATE-----\n',
    privateKey:
      '-----BEGIN PRIVATE KEY-----\r\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgE+3rM1YKIo1DNiDe\r\nViz92oPycdzYSWXlyWT7zOcvp6KhRANCAAT3LDhS/C880JIn4bdvK/3aweHTD2OP\r\ne00JDMi8tVbqcSKpc7rjiMnCLfLNLUIwhx5zbTBEDgiDbU5UERt6cNqI\r\n-----END PRIVATE KEY-----\r\n'
  },
  mspId: 'Org1MSP',
  type: 'X.509'
};

export const initContract = async (identity: X509Identity) => {
  try {
    // build an in memory object with the network configuration (also known as a connection profile)
    const ccp = buildCCPOrg1();

    const caClient = buildCAClient(ccp, 'ca.org1.example.com');

    // setup the wallet to hold the credentials of the application user
    const wallet = await buildWallet(walletPath);

    // in a real application this would be done on an administrative flow, and only once
    await enrollAdmin(caClient, wallet, mspOrg1);

    // Create a new gateway instance for interacting with the fabric network.
    // In a real application this would be done as the backend server session is setup for
    // a user that has been verified.
    const gateway = new Gateway();
    const gatewayOpts: GatewayOptions = {
      identity: identity,
      discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
    };

    // setup the gateway instance
    // The user will now be able to create connections to the fabric network and be able to
    // submit transactions and query. All transactions submitted by this gateway will be
    // signed by this user using the credentials stored in the wallet.

    await gateway.connect(ccp, gatewayOpts);

    console.log('connect gateway');

    // Build a network instance based on the channel where the smart contract is deployed
    const network = await gateway.getNetwork(channelName);

    console.log('network got');

    // Get the contract from the network.
    const contract = network.getContract(chaincodeName);

    console.log('contract got');

    return contract;
  } catch (error) {
    console.log(error);
  }
};

// use email as userId to register and enroll user
export const createIdentity = async (email: string) => {
  try {
    // build an in memory object with the network configuration (also known as a connection profile)
    const ccp = buildCCPOrg1();

    // build an instance of the fabric ca services client based on
    // the information in the network configuration
    const caClient = buildCAClient(ccp, 'ca.org1.example.com');

    // setup the wallet to hold the credentials of the application user
    const wallet = await buildWallet(walletPath);

    // in a real application this would be done on an administrative flow, and only once
    await enrollAdmin(caClient, wallet, mspOrg1);

    console.log('enrol admin successfully');

    // in a real application this would be done only when a new user was required to be added
    // and would be part of an administrative flow
    const identity = await registerAndEnrollUser(
      caClient,
      wallet,
      mspOrg1,
      email,
      'org1.department1'
    );

    return identity;
  } catch (error) {
    console.log(error);
  }
};
