import { TextDecoder } from 'util';
import { License } from '@/interfaces/hlf.interface';

import { Gateway, GatewayOptions, Contract } from 'fabric-network';
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
const org1UserId = 'appUser1';

const initContract = async () => {
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
    const gatewayOpts: GatewayOptions = {
      wallet,
      identity: org1UserId,
      discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
    };

    // setup the gateway instance
    // The user will now be able to create connections to the fabric network and be able to
    // submit transactions and query. All transactions submitted by this gateway will be
    // signed by this user using the credentials stored in the wallet.

    await gateway.connect(ccp, gatewayOpts);

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
  private contract;

  constructor() {
    initContract().then((_contract) => {
      this.contract = _contract;
    });
  }

  public async createProposal(proposalData: CreateProposalDto) {
    const { appID, buyerID, proposedPrice, licenseDetails } = proposalData;
    const proposalID = uuidv4();
    const result = await this.contract.submitTransaction(
      'CreateProposal',
      proposalID,
      appID,
      buyerID,
      proposedPrice,
      licenseDetails
    );
    console.log(
      `Transaction has successfully created, result is: ${result.toString()}`
    );
    return result.toString();
  }

  public async acceptProposal(acceptProposalData: AcceptProposalDto) {
    const { creatorID, proposalID } = acceptProposalData;
    const licenseID = uuidv4();
    const result = await this.contract.submitTransaction(
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
    const result = await this.contract.evaluateTransaction(
      'QueryProposalsByAppID',
      appId
    );
    console.log(
      `Transaction has successfully created, result is: ${result.toString()}`
    );
    return result.toString();
  }

  // public async readAsset(req: any, res: any) {
  //   try {
  //     const result = await this.contract.evaluateTransaction(
  //       'ReadAsset',
  //       req.params.assetId
  //     );
  //     console.log(
  //       `Transaction has successfully read, result is: ${result.toString()}`
  //     );
  //     res.send(result.toString());
  //   } catch (error) {
  //     console.error(`Asset ${req.params.assetId} does not exist: ${error}`);
  //     res.send(error);
  //     process.exit(1);
  //   }
  // }

  /* MẤY HÀM DƯỚI NÀY BỊ LỖI */

  // public async GetAssetByRange(req: any, res: any) {
  //   const data = getSingleton()
  //     .then(async (gateway) => {
  //       console.log(
  //         '\n--> Evaluate Transaction: GetAssetByRange, function returns all the current assets on the ledger'
  //       );

  //       const contract = gateway.network.getContract('muess');

  //       const resultBytes = await contract.evaluateTransaction(
  //         'GetAssetByRange',
  //         req.params.startKey,
  //         req.params.endKey
  //       );
  //       const resultJson = utf8Decoder.decode(resultBytes);
  //       const result: SampleAsset[] = JSON.parse(resultJson);

  //       return result;
  //     })
  //     .then((result) => result);

  //   return data;
  // }

  // public async queryProposalsByAppID(req: any, res: any) {
  //   const data = getSingleton()
  //     .then(async (gateway) => {
  //       console.log(
  //         '\n--> Evaluate Transaction: QueryProposalsByAppID, function returns all the current assets on the ledger'
  //       );

  //       const contract = gateway.network.getContract('muess');

  //       const resultBytes = await contract.evaluateTransaction(
  //         'QueryProposalsByAppID',
  //         req.params.appID
  //       );
  //       const resultJson = utf8Decoder.decode(resultBytes);
  //       const result: SampleAsset[] = JSON.parse(resultJson);

  //       return result;
  //     })
  //     .then((result) => result);

  //   return data;
  // }
}

export default HLFService;
