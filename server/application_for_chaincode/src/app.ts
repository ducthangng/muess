/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/* HOW TO TEST CHAINCODE */
// go to ../chaincode, change line 3 of go.mod to the version of go you're using
// then run these:
//      go mod tidy
//      go mod vendor
// go to ../test-network, run
//  ./network.sh down
//  ./network.sh up createChannel -ca -s couchdb
//  ./network.sh deployCC -ccn private -ccp ../chaincode/ -ccl go -ccep "OR('Org1MSP.peer','Org2MSP.peer')" -cccg ../chaincode/collections_config.json
// at this folder, run:
//      npm run prepare
//      npm run start

/* COMMON ERRORS AND HOW TO FIX THEM */
// "cannot overwrite files..." --> delete folder ./dist and try npm run prepare again
// "appUser1 not found" --> change OrgUserID below to different number

'use strict';

/* IMPORTS */
import { Gateway, Wallets, Contract } from 'fabric-network';
import FabricCAServices from 'fabric-ca-client';
import path from 'path';
import {
  buildCAClient,
  registerAndEnrollUser,
  enrollAdmin
} from '../CAUtil.js';
import { buildCCPOrg1, buildCCPOrg2, buildWallet } from '../AppUtil.js';

/* CONSTANTS */
const myChannel = 'mychannel';
const myChaincodeName = 'private';

const memberAssetCollectionName = 'assetCollection';
const org1PrivateCollectionName = 'Org1MSPPrivateCollection';
const org2PrivateCollectionName = 'Org2MSPPrivateCollection';
const mspOrg1 = 'Org1MSP';
const mspOrg2 = 'Org2MSP';
const Org1UserId = 'appUser1';
const Org2UserId = 'appUser2';

const RED = '\x1b[31m\n';
const RESET = '\x1b[0m';

/* UTIL FUNCTIONS */
function prettyJSONString(inputString: string) {
  if (inputString) {
    return JSON.stringify(JSON.parse(inputString), null, 2);
  } else {
    return inputString;
  }
}

function doFail(msgString: string) {
  console.error(`${RED}\t${msgString}${RESET}`);
  process.exit(1);
}

/* CONTRACT INITIALIZATION FUNCTIONS */
async function initContractFromOrg1Identity() {
  console.log(
    '\n--> Fabric client user & Gateway init: Using Org1 identity to Org1 Peer'
  );
  // build an in memory object with the network configuration (also known as a connection profile)
  const ccpOrg1 = buildCCPOrg1();

  // build an instance of the fabric ca services client based on
  // the information in the network configuration
  const caOrg1Client = buildCAClient(
    FabricCAServices,
    ccpOrg1,
    'ca.org1.example.com'
  );

  // setup the wallet to cache the credentials of the application user, on the app server locally
  const walletPathOrg1 = path.join(__dirname, 'wallet/org1');
  const walletOrg1 = await buildWallet(Wallets, walletPathOrg1);

  // in a real application this would be done on an administrative flow, and only once
  // stores admin identity in local wallet, if needed
  await enrollAdmin(caOrg1Client, walletOrg1, mspOrg1);
  // register & enroll application user with CA, which is used as client identify to make chaincode calls
  // and stores app user identity in local wallet
  // In a real application this would be done only when a new user was required to be added
  // and would be part of an administrative flow
  await registerAndEnrollUser(
    caOrg1Client,
    walletOrg1,
    mspOrg1,
    Org1UserId,
    'org1.department1'
  );

  try {
    // Create a new gateway for connecting to Org's peer node.
    const gatewayOrg1 = new Gateway();
    //connect using Discovery enabled
    await gatewayOrg1.connect(ccpOrg1, {
      wallet: walletOrg1,
      identity: Org1UserId,
      discovery: { enabled: true, asLocalhost: true }
    });

    return gatewayOrg1;
  } catch (error) {
    console.error(`Error in connecting to gateway: ${error}`);
    process.exit(1);
  }
}

async function initContractFromOrg2Identity() {
  console.log(
    '\n--> Fabric client user & Gateway init: Using Org2 identity to Org2 Peer'
  );
  const ccpOrg2 = buildCCPOrg2();
  const caOrg2Client = buildCAClient(
    FabricCAServices,
    ccpOrg2,
    'ca.org2.example.com'
  );

  const walletPathOrg2 = path.join(__dirname, 'wallet/org2');
  const walletOrg2 = await buildWallet(Wallets, walletPathOrg2);

  await enrollAdmin(caOrg2Client, walletOrg2, mspOrg2);
  await registerAndEnrollUser(
    caOrg2Client,
    walletOrg2,
    mspOrg2,
    Org2UserId,
    'org2.department1'
  );

  try {
    // Create a new gateway for connecting to Org's peer node.
    const gatewayOrg2 = new Gateway();
    await gatewayOrg2.connect(ccpOrg2, {
      wallet: walletOrg2,
      identity: Org2UserId,
      discovery: { enabled: true, asLocalhost: true }
    });

    return gatewayOrg2;
  } catch (error) {
    console.error(`Error in connecting to gateway: ${error}`);
    process.exit(1);
  }
}

/* FUNCTIONS FOR CALLING TRANSACTIONS */
// tested
const createAsset = async (
  contract: Contract,
  assetID: string,
  licenseDetails: string
) => {
  console.log(`Submit Transaction: CreateAsset(${assetID}, ${licenseDetails})`);
  await contract.submitTransaction('CreateAsset', assetID, licenseDetails);
  console.log('*** Result: committed');
};

// tested
const readAsset = async (contract: Contract, assetID: string) => {
  // ReadAsset returns asset on the ledger with the specified ID
  console.log(`\n--> Evaluate Transaction: ReadAsset ${assetID}`);
  const result = await contract.evaluateTransaction('ReadAsset', assetID);
  return result;
};

const getAssetsByRange = async (
  contract: Contract,
  startKey: string,
  endKey: string
) => {
  // GetAssetByRange returns assets on the ledger with ID in the range of startKey (inclusive) and endKey (exclusive)
  console.log(`Evaluate Transaction: GetAssetsByRange ${startKey}-${endKey}`);
  const result = await contract.evaluateTransaction(
    'GetAssetsByRange',
    startKey,
    endKey
  );
  return result;
  // console.log(`<-- result: ${prettyJSONString(result.toString())}`);
  // if (!result || result.length === 0) {
  //   doFail("received empty query list for GetAssetsByRange");
  // }
};

const queryAssetByOwnerID = async (contract: Contract, ownerID: string) => {
  //   QueryAssetByOwnerID returns asset on the ledger with the specified assetType & ownerID
  console.log(`\nEvaluate Transaction: QueryAssetByOwnerID asset, ${ownerID}`);
  const result = await contract.evaluateTransaction(
    'QueryAssetByOwnerID',
    'asset',
    ownerID
  );
  return result;
};

const queryAssetByCreatorID = async (contract: Contract, creatorID: string) => {
  //   QueryAssetByOwnerID returns asset on the ledger with the specified assetType & ownerID
  console.log(
    `\nEvaluate Transaction: QueryAssetByCreatorID asset, ${creatorID}`
  );
  const result = await contract.evaluateTransaction(
    'QueryAssetByCreatorID',
    'license',
    creatorID
  );
  return result;
};

// tested
const agreeToTransfer = async (
  contract: Contract,
  assetID: string,
  expectedValue: number
) => {
  const dataForAgreement = { assetID: assetID, expectedValue: expectedValue };
  console.log(
    '\nSubmit Transaction: AgreeToTransfer payload ' +
      JSON.stringify(dataForAgreement)
  );
  const statefulTxn = contract.createTransaction('AgreeToTransfer');
  const tmapData = Buffer.from(JSON.stringify(dataForAgreement));
  statefulTxn.setTransient({
    asset_value: tmapData
  });
  const result = await statefulTxn.submit();
  return result;
};

// tested
const readTransferAgreement = async (contract: Contract, assetID: string) => {
  console.log('\nEvaluate Transaction: ReadTransferAgreement ' + assetID);
  const result = await contract.evaluateTransaction(
    'ReadTransferAgreement',
    assetID
  );
  return result;
};

const deleteTransferAgreement = async (contract: Contract, assetID: string) => {
  console.log('\nSubmit Transaction: DeleteTransferAgreement ' + assetID);
  //Buyer can withdraw the Agreement, using DeleteTranferAgreement
  const result = contract.submitTransaction('DeleteTranferAgreement', assetID);
  // statefulTxn.setEndorsingOrganizations(mspOrg2);
  // statefulTxn.setTransient({
  //   agreement_delete: tmapData
  // });
  // const result = await statefulTxn.submit();
  return result;
};

const transferAssert = async (
  contract: Contract,
  assetID: string,
  buyerMSP: string
) => {
  try {
    console.log(
      '\nAttempt Submit Transaction: TransferAsset ' +
        assetID +
        'to buyerMSP ' +
        buyerMSP
    );
    await contract.submitTransaction('TransferAsset', assetID, buyerMSP);
  } catch (error) {
    console.log(`Successfully caught the error: \n    ${error}`);
  }
};

const readAssetPrivateDetails = async (
  contract: Contract,
  privateCollectionName: string,
  assetID: string
) => {
  console.log(
    '\n--> Evaluate Transaction: ReadAssetPrivateDetails from ' +
      privateCollectionName
  );
  // ReadAssetPrivateDetails reads data from Org's private collection. Args: collectionName, assetID
  const result = await contract.evaluateTransaction(
    'ReadAssetPrivateDetails',
    privateCollectionName,
    assetID
  );
};

// For this usecase illustration, we will use both Org1 & Org2 client identity from this same app
// In real world the Org1 & Org2 identity will be used in different apps to achieve asset transfer.
async function main() {
  try {
    /** ******* Fabric client init: Using Org1 identity to Org1 Peer ********** */
    const gatewayOrg1 = await initContractFromOrg1Identity();
    const networkOrg1 = await gatewayOrg1.getNetwork(myChannel);
    const contractOrg1 = networkOrg1.getContract(myChaincodeName);
    // Since this sample chaincode uses, Private Data Collection level endorsement policy, addDiscoveryInterest
    // scopes the discovery service further to use the endorsement policies of collections, if any
    contractOrg1.addDiscoveryInterest({
      name: myChaincodeName,
      collectionNames: [memberAssetCollectionName, org1PrivateCollectionName]
    });

    /** ~~~~~~~ Fabric client init: Using Org2 identity to Org2 Peer ~~~~~~~ */
    const gatewayOrg2 = await initContractFromOrg2Identity();
    const networkOrg2 = await gatewayOrg2.getNetwork(myChannel);
    const contractOrg2 = networkOrg2.getContract(myChaincodeName);
    contractOrg2.addDiscoveryInterest({
      name: myChaincodeName,
      collectionNames: [memberAssetCollectionName, org2PrivateCollectionName]
    });
    try {
      // Sample transactions are listed below
      // Add few sample Assets & transfers one of the asset from Org1 to Org2 as the new owner
      const randomNumber = Math.floor(Math.random() * 1000) + 1;
      // use a random key so that we can run multiple times
      const assetID1 = `asset${randomNumber}`;
      const assetID2 = `asset11${randomNumber + 1}`;
      let result;

      // Org1 Client adds new asset
      await createAsset(contractOrg1, assetID1, 'GPL');

      // Org2 Client adds new asset
      await createAsset(contractOrg2, assetID2, 'MIT');

      // Org1 Client reads asset with assetID1, receives result
      result = await readAsset(contractOrg1, assetID1);
      console.log(`<-- result: ${prettyJSONString(result.toString())}`);

      // Owner from Org1 agrees to sell the asset assetID1 with price 100 //
      result = await agreeToTransfer(contractOrg1, assetID1, 100);
      console.log(`<-- result: ${prettyJSONString(result.toString())}`);

      // To purchase the asset, the buyer needs to agree to the same value as the asset owner

      // Buyer from Org2 agrees to buy the asset assetID1 with price 110
      result = await agreeToTransfer(contractOrg2, assetID1, 110);
      console.log(`<-- result: ${prettyJSONString(result.toString())}`);

      // Buyer from Org2 deletes agreement
      result = await deleteTransferAgreement(contractOrg2, assetID1);
      console.log(`<-- result: ${prettyJSONString(result.toString())}`);

      // Buyer from Org2 agrees to buy the asset assetID1 again with new price 100
      result = await agreeToTransfer(contractOrg2, assetID1, 100);
      console.log(`<-- result: ${prettyJSONString(result.toString())}`);

      // All members can send txn ReadTransferAgreement, set by Org2 above
      result = await readTransferAgreement(contractOrg1, assetID1);
      console.log(`<-- result: ${prettyJSONString(result.toString())}`);

      // Org1 Client transfers asset to Org2 Client
      await transferAssert(contractOrg1, assetID1, mspOrg2);

      // Org1 Client reads asset with assetID1, check to see ownerID has changed
      result = await readAsset(contractOrg1, assetID1);
      console.log(`<-- result: ${prettyJSONString(result.toString())}`);
    } finally {
      // Disconnect from the gateway peer when all work for this client identity is complete
      gatewayOrg1.disconnect();
      gatewayOrg2.disconnect();
    }
  } catch (error) {
    console.error(`Error in transaction: ${error}`);
    if ((error as Error).stack) {
      console.error((error as Error).stack);
    }
    process.exit(1);
  }
}

main();
