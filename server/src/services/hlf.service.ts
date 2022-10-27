import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';
import {
  connect,
  Contract,
  Identity,
  Signer,
  signers
} from '@hyperledger/fabric-gateway';
import { TextDecoder } from 'util';
import { getSingleton } from '@/config/hyper-ledger';
import { SampleAsset } from '@/models/hlf.model';

const utf8Decoder = new TextDecoder();
const assetId = `asset${Date.now()}`;

// const express = require('express');
// const bodyParser = require('body-parser');

// setting for Hyperledger Fabric
// const { Wallets, Gateway } = require('fabric-network');
// const fs = require('fs');
// const path = require('path');
// const ccpPath = path.resolve(__dirname, '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
// let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

// const app = express();
// app.use(bodyParser.json());

const temp_walletpath = path.join(process.cwd(), 'wallet');
class HLFService {
  // examples of GetAllAssets
  public async getAllAssets(): Promise<SampleAsset[]> {
    const data = getSingleton()
      .then(async (gateway) => {
        console.log(
          '\n--> Evaluate Transaction: GetAllAssets, function returns all the current assets on the ledger'
        );

        const contract = gateway.network.getContract('basic');

        const resultBytes = await contract.evaluateTransaction('GetAllAssets');
        const resultJson = utf8Decoder.decode(resultBytes);
        const result: SampleAsset[] = JSON.parse(resultJson);

        return result;
      })
      .then((result) => result);

    return data;
  }

  public async CreateProposal(req: any, res: any) {
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
      // const network = await gateway.getNetwork('mychannel');
      // const contract = network.getContract('muess', 'Contract');
      // const exists = await contract.AssetExists('CreateProposal', req.body.id);
      // {
      //   if (exists) {
      //     console.log('An asset with the given ID already exists');
      //     return;
      //   }
      // }
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

  public async AcceptProposal(req: any, res: any) {
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

  public async ReadAsset(req: any, res: any) {
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

  public async DeleteAsset(req: any, res: any) {
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
        'DeleteAsset',
        req.params.assetId
      );
      console.log(
        `Transaction has successfully deleted, result is: ${result.toString()}`
      );
      res.send(result.toString());
      await gateway.disconnect();
    } catch (error) {
      console.error(`Asset ${req.params.assetId} does not exist: ${error}`);
      res.send(error);
      process.exit(1);
    }
  }

  public async GetAssetByRange(req: any, res: any) {
    const data = getSingleton()
      .then(async (gateway) => {
        console.log(
          '\n--> Evaluate Transaction: GetAssetByRange, function returns all the current assets on the ledger'
        );

        const contract = gateway.network.getContract('muess');

        const resultBytes = await contract.evaluateTransaction(
          'GetAssetByRange',
          req.params.startKey,
          req.params.endKey
        );
        const resultJson = utf8Decoder.decode(resultBytes);
        const result: SampleAsset[] = JSON.parse(resultJson);

        return result;
      })
      .then((result) => result);

    return data;
  }

  public async QueryProposalsByAppID(req: any, res: any) {
    const data = getSingleton()
      .then(async (gateway) => {
        console.log(
          '\n--> Evaluate Transaction: QueryProposalsByAppID, function returns all the current assets on the ledger'
        );

        const contract = gateway.network.getContract('muess');

        const resultBytes = await contract.evaluateTransaction(
          'QueryProposalsByAppID',
          req.params.appID
        );
        const resultJson = utf8Decoder.decode(resultBytes);
        const result: SampleAsset[] = JSON.parse(resultJson);

        return result;
      })
      .then((result) => result);

    return data;
  }
}

export default HLFService;
