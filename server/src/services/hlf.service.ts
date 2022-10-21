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

class HLFService {
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
}

export default HLFService;
