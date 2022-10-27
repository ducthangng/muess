import { Gateway, GatewayOptions, Contract, Wallets } from 'fabric-network';
import { buildCCPOrg1, buildWallet, prettyJSONString } from '../utils//AppUtil';
import {
  buildCAClient,
  enrollAdmin,
  registerAndEnrollUser
} from '../utils/CAUtil';
import * as path from 'path';
import { TextDecoder } from 'util';
import { License } from '@/interfaces/hlf.interface';

const utf8Decoder = new TextDecoder();
const assetId = `asset${Date.now()}`;

const temp_walletpath = path.join(process.cwd(), 'wallet');
const ccp = buildCCPOrg1();

class HLFService {
  public async createProposal(req: any, res: any) {
    try {
      const walletPath = path.join(process.cwd(), 'wallet');
      const wallet = await Wallets.newFileSystemWallet(walletPath);
      console.log(`Wallet path: ${walletPath}`);

      const gateway = new Gateway();
      await gateway.connect(ccp, {
        wallet,
        identity: 'appUser',
        discovery: { enabled: true, asLocalhost: true }
      });
      const network = await gateway.getNetwork('mychannel');
      const contract = network.getContract('muess', 'Contract');

      const result = await contract.submitTransaction(
        'CreateProposal',
        req.params.assetId,
        req.params.appID,
        req.params.buyerID,
        req.params.proposedPrice,
        req.params.licenseDetails
      );

      console.log(
        `Transaction has successfully created, result is: ${result.toString()}`
      );
      res.send(result.toString());

      await gateway.disconnect();
    } catch (error) {
      console.error(`Failed to create: ${error}`);
      res.send(error);
      process.exit(1);
    }
  }

  public async acceptProposal(req: any, res: any) {
    try {
      const walletPath = path.join(process.cwd(), 'wallet');
      const wallet = await Wallets.newFileSystemWallet(walletPath);
      console.log(`Wallet path: ${walletPath}`);

      const gateway = new Gateway();
      await gateway.connect(ccp, {
        wallet,
        identity: 'appUser',
        discovery: { enabled: true, asLocalhost: true }
      });
      const network = await gateway.getNetwork('mychannel');
      const contract = network.getContract('muess', 'Contract');
      const result = await contract.submitTransaction(
        'AcceptProposal',
        req.params.assetType,
        req.params.assetId,
        req.params.appID,
        req.params.proposedPrice,
        req.params.creatorID,
        req.params.licenseDetails
      );
      console.log(
        `Transaction has successfully created, result is: ${result.toString()}`
      );
      res.send(result.toString());
      await gateway.disconnect();
    } catch (error) {
      console.error(`Failed to create: ${error}`);
      res.send(error);
      process.exit(1);
    }
  }

  public async readAsset(req: any, res: any) {
    try {
      const walletPath = path.join(process.cwd(), 'wallet');
      const wallet = await Wallets.newFileSystemWallet(walletPath);
      console.log(`Wallet path: ${walletPath}`);

      const gateway = new Gateway();
      await gateway.connect(ccp, {
        wallet,
        identity: 'appUser',
        discovery: { enabled: true, asLocalhost: true }
      });
      const network = await gateway.getNetwork('mychannel');
      const contract = network.getContract('muess', 'Contract');
      const result = await contract.evaluateTransaction(
        'ReadAsset',
        req.params.assetId
      );
      console.log(
        `Transaction has successfully read, result is: ${result.toString()}`
      );
      res.send(result.toString());
      await gateway.disconnect();
    } catch (error) {
      console.error(`Asset ${req.params.assetId} does not exist: ${error}`);
      res.send(error);
      process.exit(1);
    }
  }

  // Ủa có cho xóa Asset nữa hở? Ý là trong chaincode vẫn
  // có nhưng tui không nghĩ nên cho user xóa asset

  // public async DeleteAsset(req: any, res: any) {
  //   try {
  //     const walletPath = path.join(process.cwd(), 'wallet');
  //     const wallet = await Wallets.newFileSystemWallet(walletPath);
  //     console.log(`Wallet path: ${walletPath}`);

  //     const gateway = new Gateway();
  //     await gateway.connect(ccp, {
  //       wallet,
  //       identity: 'appUser',
  //       discovery: { enabled: true, asLocalhost: true }
  //     });
  //     const network = await gateway.getNetwork('mychannel');
  //     const contract = network.getContract('muess', 'Contract');
  //     const result = await contract.submitTransaction(
  //       'DeleteAsset',
  //       req.params.assetId
  //     );
  //     console.log(
  //       `Transaction has successfully deleted, result is: ${result.toString()}`
  //     );
  //     res.send(result.toString());
  //     await gateway.disconnect();
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
