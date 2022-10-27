import { Contract } from '@hyperledger/fabric-gateway';

import { TextDecoder } from 'util';
import { License } from '@/interfaces/hlf.interface';

const utf8Decoder = new TextDecoder();
class HLFService {
  // examples of GetAllAssets
  public async createAssets(
    contract: Contract,
    license: License
  ): Promise<void> {
    const result = await contract.submit('CreateAsset', {
      transientData: {
        assetID: JSON.stringify(license.licenseId),
        licenseDetails: JSON.stringify(license)
      }
    });

    console.log('*** Result:', result.toString());
  }

  public async getAssetByOwnerId(
    contract: Contract,
    ownerId: string
  ): Promise<License[]> {
    console.log(
      `\n--> Evaluate Transaction: QueryAssetByOwnerID, OwnerID: ${ownerId}`
    );

    const resultBytes = await contract.evaluateTransaction(
      'QueryAssetByOwnerID',
      ownerId
    );

    const resultString = utf8Decoder.decode(resultBytes);
    if (!resultString) {
      this.doFail('Received empty result for ReadAsset');
    }
    const result: License[] = JSON.parse(resultString);

    return result;
  }

  public async readAssetByID(
    contract: Contract,
    licenseId: string
  ): Promise<License[]> {
    console.log(`\n--> Evaluate Transaction: ReadAsset, ID: ${licenseId}`);
    const resultBytes = await contract.evaluateTransaction(
      'ReadAsset',
      licenseId
    );

    const resultString = utf8Decoder.decode(resultBytes);
    if (!resultString) {
      this.doFail('Received empty result for ReadAsset');
    }
    const result: License[] = JSON.parse(resultString);

    return result;
  }

  public async readTransferAgreement(
    contract: Contract,
    assetID: string
  ): Promise<string> {
    console.log(
      `\n--> Evaluate Transaction: ReadTransferAgreement, ID: ${assetID}`
    );

    const resultBytes = await contract.evaluateTransaction(
      'ReadTransferAgreement',
      assetID
    );

    const resultString = utf8Decoder.decode(resultBytes);
    if (!resultString) {
      this.doFail('Received no result for ReadTransferAgreement');
    }
    // const result = JSON.parse(resultString);
    // console.log('*** Result:', resultString);

    return resultString;
  }

  public async transferAsset(
    contract: Contract,
    licenseId: string,
    buyerMSPID: string
  ): Promise<string> {
    console.log(`\n--> Submit Transaction: TransferAsset, ID: ${licenseId}`);

    const buyerDetails = { licenseId, buyerMSPID };
    const x = await contract.submit('TransferAsset', {
      transientData: { asset_owner: JSON.stringify(buyerDetails) }
    });

    return x.toString();
  }

  public async deleteTransferAgreement(
    contract: Contract,
    lisenceId: string
  ): Promise<string> {
    console.log('\n--> Submit Transaction: DeleteAsset, ID:', lisenceId);
    const dataForDelete = { lisenceId };
    const x = await contract.submit('DeleteTranferAgreement', {
      transientData: { asset_delete: JSON.stringify(dataForDelete) }
    });

    return x.toString();

    // console.log('*** Transaction committed successfully');
  }

  private doFail(msgString: string): never {
    // console.error(`${RED}\t${msgString}${RESET}`);
    throw new Error(msgString);
  }
}

export default HLFService;
