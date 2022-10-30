import { TextDecoder } from 'util';
import { License } from '@/interfaces/hlf.interface';

import {
  Gateway,
  GatewayOptions,
  Contract,
  X509Identity
} from 'fabric-network';
import * as path from 'path';
import { buildCCPOrg1, buildWallet, prettyJSONString } from '../utils//AppUtil';
import {
  buildCAClient,
  enrollAdmin,
  registerAndEnrollUser
} from '../utils/CAUtil';
import { v4 as uuidv4 } from 'uuid';
import {
  AcceptProposalDto,
  CreateAppDto,
  CreateProposalDto
} from '@/dtos/hlf.dto';

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

const initContract = async (identity: X509Identity) => {
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

    // in a real application this would be done only when a new user was required to be added
    // and would be part of an administrative flow
    await registerAndEnrollUser(
      caClient,
      wallet,
      mspOrg1,
      org1UserId,
      'org1.department1'
    );

    // Create a new gateway instance for interacting with the fabric network.
    // In a real application this would be done as the backend server session is setup for
    // a user that has been verified.
    const gateway = new Gateway();
    // const gatewayOpts: GatewayOptions = {
    //   identity: identity,
    //   discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
    // };

    const gatewayOpts: GatewayOptions = {
      wallet: wallet,
      identity: org1UserId,
      discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
    };

    // setup the gateway instance
    // The user will now be able to create connections to the fabric network and be able to
    // submit transactions and query. All transactions submitted by this gateway will be
    // signed by this user using the credentials stored in the wallet.

    await gateway.connect(ccp, gatewayOpts);
    console.log(gateway);

    // Build a network instance based on the channel where the smart contract is deployed
    const network = await gateway.getNetwork(channelName);

    // Get the contract from the network.
    const contract = network.getContract(chaincodeName);

    return contract;
  } catch (error) {
    console.log(error);
  }
};

// const utf8Decoder = new TextDecoder();
// const assetId = `asset${Date.now()}`;

// const temp_walletpath = path.join(process.cwd(), 'wallet');
// const ccp = buildCCPOrg1();

class HLFService {
  public async createApp(appData: CreateAppDto) {
    const contract = await initContract(testIdentity);
    const {
      title,
      description,
      rating,
      appType,
      paymentMethod,
      appTags,
      appIconURL
    } = appData;
    const appId = uuidv4();
    const result = await contract.submitTransaction(
      'CreateApp',
      appId,
      title,
      description,
      rating,
      appType,
      paymentMethod,
      appTags.toString(),
      appIconURL
    );
    console.log(
      `Transaction has successfully created, result is: ${result.toString()}`
    );
    return result.toString();
  }

  public async createProposal(proposalData: CreateProposalDto) {
    try {
      const contract = await initContract(testIdentity);
      const { appId, proposedPrice, licenseDetails } = proposalData;
      const proposalId = uuidv4();

      const proposedPriceString = proposedPrice.toString();

      const result = await contract.submitTransaction(
        'CreateProposal',
        proposalId,
        appId,
        proposedPriceString,
        licenseDetails
      );
      console.log(
        `Transaction has successfully created, result is: ${result.toString()}`
      );
      return result;
    } catch (error) {
      console.log(error);
      throw new Error('Submit Transaction Failed');
    }
  }

  public async acceptProposal(acceptProposalData: AcceptProposalDto) {
    const contract = await initContract(testIdentity);
    const { creatorId, proposalId } = acceptProposalData;
    const licenseId = uuidv4();
    const result = await contract.submitTransaction(
      'AcceptProposal',
      proposalId,
      licenseId,
      creatorId,
      proposalId
    );
    console.log(
      `Transaction has successfully created, result is: ${result.toString()}`
    );
    return result.toString();
  }

  public async getAppsByCreatorId(creatorId: string) {
    const contract = await initContract(testIdentity);
    const result = await contract.evaluateTransaction(
      'QueryAppsByCreatorId',
      creatorId
    );
    console.log(
      `Transaction has successfully created, result is: ${result.toString()}`
    );
    return JSON.parse(result.toString());
  }

  public async getProposalsByAppId(appId: string) {
    const contract = await initContract(testIdentity);
    const result = await contract.evaluateTransaction(
      'QueryProposalsByAppId',
      appId
    );
    console.log(
      `Transaction has successfully created, result is: ${result.toString()}`
    );
    return JSON.parse(result.toString());
  }

  public async getProposalsByBuyerId(buyerId: string) {
    const contract = await initContract(testIdentity);
    const result = await contract.evaluateTransaction(
      'QueryProposalsByBuyerId',
      buyerId
    );
    console.log(
      `Transaction has successfully created, result is: ${result.toString()}`
    );
    return JSON.parse(result.toString());
  }
}

export default HLFService;
