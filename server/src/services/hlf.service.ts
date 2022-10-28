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
import { AcceptProposalDto, CreateProposalDto } from '@/dtos/hlf.dto';

const channelName = 'mychannel';
const chaincodeName = 'muess';
const mspOrg1 = 'Org1MSP';

const walletPath = path.join(__dirname, 'wallet');
const org1UserId = `appUser${Math.floor(Math.random() * 100)}`;

const testIdentity: X509Identity = {
  credentials: {
    certificate:
      '-----BEGIN CERTIFICATE-----\nMIICfzCCAiagAwIBAgIUS2qaFyRnPQRTbgTypEy9/wxJwNYwCgYIKoZIzj0EAwIw\naDELMAkGA1UEBhMCVVMxFzAVBgNVBAgTDk5vcnRoIENhcm9saW5hMRQwEgYDVQQK\nEwtIeXBlcmxlZGdlcjEPMA0GA1UECxMGRmFicmljMRkwFwYDVQQDExBmYWJyaWMt\nY2Etc2VydmVyMB4XDTIyMTAyNzE0MDgwMFoXDTIzMTAyODA1MDIwMFowRjEwMAsG\nA1UECxMEb3JnMTANBgNVBAsTBmNsaWVudDASBgNVBAsTC2RlcGFydG1lbnQxMRIw\nEAYDVQQDEwlhcHBVc2VyNTAwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAAQuo1+G\nxAjxkDCPaMX5c23UfetKdU4+pq6Grf4L106EGqzOJ7qjWMIMdMWi/MND8wwxo5DN\nv9T0F9njHzVBDVqIo4HPMIHMMA4GA1UdDwEB/wQEAwIHgDAMBgNVHRMBAf8EAjAA\nMB0GA1UdDgQWBBQNNQ2JaO21HGQ072boyi0ZF7J6szAfBgNVHSMEGDAWgBRrg4I0\nyRbVVm3we/R5QJv3l5es4zBsBggqAwQFBgcIAQRgeyJhdHRycyI6eyJoZi5BZmZp\nbGlhdGlvbiI6Im9yZzEuZGVwYXJ0bWVudDEiLCJoZi5FbnJvbGxtZW50SUQiOiJh\ncHBVc2VyNTAiLCJoZi5UeXBlIjoiY2xpZW50In19MAoGCCqGSM49BAMCA0cAMEQC\nIFPtzx2NH74STS3BNHte3YjzrEpOQq9ny2Ypc1xXnC+sAiBKX1tgvlU6x9yrG84A\nz+xY9Xk9VuEBM3ilfbFAsUa33w==\n-----END CERTIFICATE-----\n',
    privateKey:
      '-----BEGIN PRIVATE KEY-----\r\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgFK73+emdEKYTf4sq\r\nd1cN+Ml0jB2Wg0UKvFrkD9YKYUmhRANCAAQuo1+GxAjxkDCPaMX5c23UfetKdU4+\r\npq6Grf4L106EGqzOJ7qjWMIMdMWi/MND8wwxo5DNv9T0F9njHzVBDVqI\r\n-----END PRIVATE KEY-----\r\n'
  },
  mspId: 'Org1MSP',
  type: 'X.509'
  // version: 1
};

const initContract = async (identity: X509Identity) => {
  try {
    // build an in memory object with the network configuration (also known as a connection profile)
    const ccp = buildCCPOrg1();

    // // build an instance of the fabric ca services client based on
    // // the information in the network configuration
    // const caClient = buildCAClient(ccp, 'ca.org1.example.com');

    // // setup the wallet to hold the credentials of the application user
    // const wallet = await buildWallet(walletPath);

    // // in a real application this would be done on an administrative flow, and only once
    // await enrollAdmin(caClient, wallet, mspOrg1);

    // // in a real application this would be done only when a new user was required to be added
    // // and would be part of an administrative flow
    // await registerAndEnrollUser(
    //   caClient,
    //   wallet,
    //   mspOrg1,
    //   org1UserId,
    //   'org1.department1'
    // );

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
    console.log(gateway);

    // Build a network instance based on the channel where the smart contract is deployed
    const network = await gateway.getNetwork(channelName);
    console.log('network');

    // Get the contract from the network.
    const contract = network.getContract(chaincodeName);
    console.log('contract');

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
  public async createProposal(proposalData: CreateProposalDto) {
    const contract = await initContract(testIdentity);
    const { appID, buyerID, proposedPrice, licenseDetails } = proposalData;
    const proposalID = uuidv4();
    const result = await contract.submitTransaction(
      'CreateProposal',
      proposalID,
      appID,
      buyerID,
      proposedPrice.toString(),
      licenseDetails
    );
    console.log(
      `Transaction has successfully created, result is: ${result.toString()}`
    );
    return result.toString();
  }

  public async acceptProposal(acceptProposalData: AcceptProposalDto) {
    const contract = await initContract(testIdentity);
    const { creatorID, proposalID } = acceptProposalData;
    const licenseID = uuidv4();
    const result = await contract.submitTransaction(
      'AcceptProposal',
      proposalID,
      licenseID,
      creatorID,
      proposalID
    );
    console.log(
      `Transaction has successfully created, result is: ${result.toString()}`
    );
    return result.toString();
  }

  public async getProposalsByAppID(appId: string) {
    const contract = await initContract(testIdentity);
    const result = await contract.evaluateTransaction(
      'QueryProposalsByAppID',
      appId
    );
    console.log(
      `Transaction has successfully created, result is: ${result.toString()}`
    );
    return JSON.parse(result.toString());
  }

  public async getProposalsByBuyerID(buyerId: string) {
    const contract = await initContract(testIdentity);
    const result = await contract.evaluateTransaction(
      'QueryProposalsByBuyerID',
      buyerId
    );
    console.log(
      `Transaction has successfully created, result is: ${result.toString()}`
    );
    return JSON.parse(result.toString());
  }
}

export default HLFService;
