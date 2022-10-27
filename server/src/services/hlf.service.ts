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
      transientData: { asset_properties: JSON.stringify(license) }
    });

    console.log('*** Result:', result.toString());
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

  public async agreeToTransfer(
    contract: Contract,
    license: License
  ): Promise<string> {
    // Buyer from Org2 agrees to buy the asset//
    // To purchase the asset, the buyer needs to agree to the same value as the asset owner

    const dataForAgreement = { license };
    console.log(
      '\n--> Submit Transaction: AgreeToTransfer, payload:',
      dataForAgreement
    );

    const x = await contract.submit('AgreeToTransfer', {
      transientData: { asset_value: JSON.stringify(dataForAgreement) }
    });

    return x.toString();
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

  public async deleteAsset(
    contract: Contract,
    lisenceId: string
  ): Promise<string> {
    console.log('\n--> Submit Transaction: DeleteAsset, ID:', lisenceId);
    const dataForDelete = { lisenceId };
    const x = await contract.submit('DeleteAsset', {
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
