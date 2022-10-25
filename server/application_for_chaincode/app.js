/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/* HOW TO TEST CHAINCODE */
// go to ../test-network, run
//      ./network.sh down
//      ./network.sh up createChannel -ca -s couchdb
//      ./network.sh deployCC -ccn private -ccp ../chaincode/ -ccl go -ccep "OR('Org1MSP.peer','Org2MSP.peer')" -cccg ../chaincode/collections_config.json
// go to ../chaincode, change line 3 of go.mod to the version of go you're using
// then run these:
//      go mod tidy
//      go mod vendor
// at this folder, run:
//      npm install
//      node app.js
// if encounter error, delete folder ./wallet and try node app.js again

"use strict";

const { Gateway, Wallets } = require("fabric-network");
const FabricCAServices = require("fabric-ca-client");
const path = require("path");
const {
  buildCAClient,
  registerAndEnrollUser,
  enrollAdmin,
} = require("./CAUtil.js");
const {
  buildCCPOrg1,
  buildCCPOrg2,
  buildWallet,
} = require("./AppUtil.js");

const myChannel = "mychannel";
const myChaincodeName = "private";

const memberAssetCollectionName = "assetCollection";
const org1PrivateCollectionName = "Org1MSPPrivateCollection";
const org2PrivateCollectionName = "Org2MSPPrivateCollection";
const mspOrg1 = "Org1MSP";
const mspOrg2 = "Org2MSP";
const Org1UserId = "appUser1";
const Org2UserId = "appUser2";

const RED = "\x1b[31m\n";
const RESET = "\x1b[0m";

function prettyJSONString(inputString) {
  if (inputString) {
    return JSON.stringify(JSON.parse(inputString), null, 2);
  } else {
    return inputString;
  }
}

function doFail(msgString) {
  console.error(`${RED}\t${msgString}${RESET}`);
  process.exit(1);
}

function verifyAssetData(
  org,
  resultBuffer,
  expectedId,
  color,
  size,
  ownerUserId,
  appraisedValue
) {
  let asset;
  if (resultBuffer) {
    asset = JSON.parse(resultBuffer.toString("utf8"));
  } else {
    doFail("Failed to read asset");
  }
  console.log(`*** verify asset data for: ${expectedId}`);
  if (!asset) {
    doFail("Received empty asset");
  }
  if (expectedId !== asset.assetID) {
    doFail(`recieved asset ${asset.assetID} , but expected ${expectedId}`);
  }
  if (asset.color !== color) {
    doFail(
      `asset ${asset.assetID} has color of ${asset.color}, expected value ${color}`
    );
  }
  if (asset.size !== size) {
    doFail(
      `Failed size check - asset ${asset.assetID} has size of ${asset.size}, expected value ${size}`
    );
  }

  if (asset.owner.includes(ownerUserId)) {
    console.log(`\tasset ${asset.assetID} owner: ${asset.owner}`);
  } else {
    doFail(
      `Failed owner check from ${org} - asset ${asset.assetID} owned by ${asset.owner}, expected userId ${ownerUserId}`
    );
  }
  if (appraisedValue) {
    if (asset.appraisedValue !== appraisedValue) {
      doFail(
        `Failed appraised value check from ${org} - asset ${asset.assetID} has appraised value of ${asset.appraisedValue}, expected value ${appraisedValue}`
      );
    }
  }
}

function verifyAssetPrivateDetails(resultBuffer, expectedId, appraisedValue) {
  let assetPD;
  if (resultBuffer) {
    assetPD = JSON.parse(resultBuffer.toString("utf8"));
  } else {
    doFail("Failed to read asset private details");
  }
  console.log(`*** verify private details: ${expectedId}`);
  if (!assetPD) {
    doFail("Received empty data");
  }
  if (expectedId !== assetPD.assetID) {
    doFail(`recieved ${assetPD.assetID} , but expected ${expectedId}`);
  }

  if (appraisedValue) {
    if (assetPD.appraisedValue !== appraisedValue) {
      doFail(
        `Failed appraised value check - asset ${assetPD.assetID} has appraised value of ${assetPD.appraisedValue}, expected value ${appraisedValue}`
      );
    }
  }
}

async function initContractFromOrg1Identity() {
  console.log(
    "\n--> Fabric client user & Gateway init: Using Org1 identity to Org1 Peer"
  );
  // build an in memory object with the network configuration (also known as a connection profile)
  const ccpOrg1 = buildCCPOrg1();

  // build an instance of the fabric ca services client based on
  // the information in the network configuration
  const caOrg1Client = buildCAClient(
    FabricCAServices,
    ccpOrg1,
    "ca.org1.example.com"
  );

  // setup the wallet to cache the credentials of the application user, on the app server locally
  const walletPathOrg1 = path.join(__dirname, "wallet/org1");
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
    "org1.department1"
  );

  try {
    // Create a new gateway for connecting to Org's peer node.
    const gatewayOrg1 = new Gateway();
    //connect using Discovery enabled
    await gatewayOrg1.connect(ccpOrg1, {
      wallet: walletOrg1,
      identity: Org1UserId,
      discovery: { enabled: true, asLocalhost: true },
    });

    return gatewayOrg1;
  } catch (error) {
    console.error(`Error in connecting to gateway: ${error}`);
    process.exit(1);
  }
}

async function initContractFromOrg2Identity() {
  console.log(
    "\n--> Fabric client user & Gateway init: Using Org2 identity to Org2 Peer"
  );
  const ccpOrg2 = buildCCPOrg2();
  const caOrg2Client = buildCAClient(
    FabricCAServices,
    ccpOrg2,
    "ca.org2.example.com"
  );

  const walletPathOrg2 = path.join(__dirname, "wallet/org2");
  const walletOrg2 = await buildWallet(Wallets, walletPathOrg2);

  await enrollAdmin(caOrg2Client, walletOrg2, mspOrg2);
  await registerAndEnrollUser(
    caOrg2Client,
    walletOrg2,
    mspOrg2,
    Org2UserId,
    "org2.department1"
  );

  try {
    // Create a new gateway for connecting to Org's peer node.
    const gatewayOrg2 = new Gateway();
    await gatewayOrg2.connect(ccpOrg2, {
      wallet: walletOrg2,
      identity: Org2UserId,
      discovery: { enabled: true, asLocalhost: true },
    });

    return gatewayOrg2;
  } catch (error) {
    console.error(`Error in connecting to gateway: ${error}`);
    process.exit(1);
  }
}

// Main workflow : usecase details at asset-transfer-private-data/chaincode-go/README.md
// This app uses fabric-samples/test-network based setup and the companion chaincode
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
      collectionNames: [memberAssetCollectionName, org1PrivateCollectionName],
    });

    /** ~~~~~~~ Fabric client init: Using Org2 identity to Org2 Peer ~~~~~~~ */
    const gatewayOrg2 = await initContractFromOrg2Identity();
    const networkOrg2 = await gatewayOrg2.getNetwork(myChannel);
    const contractOrg2 = networkOrg2.getContract(myChaincodeName);
    contractOrg2.addDiscoveryInterest({
      name: myChaincodeName,
      collectionNames: [memberAssetCollectionName, org2PrivateCollectionName],
    });
    try {
      // Sample transactions are listed below
      // Add few sample Assets & transfers one of the asset from Org1 to Org2 as the new owner
      let randomNumber = Math.floor(Math.random() * 1000) + 1;
      // use a random key so that we can run multiple times
      let assetID1 = `asset0`;
      let assetID2 = `asset1`;
      const assetType = "ValuableAsset";
      let result;

      // Add asset1
        console.log("\n**************** As Org1 Client ****************");
        console.log(
          "Adding Assets to work with:\n--> Submit Transaction: CreateAsset " +
            assetID1
        );
        await contractOrg1.submitTransaction("CreateAsset", assetID1, "GPL");
        console.log("*** Result: committed");

        //Add asset2
        console.log("\n**************** As Org1 Client ****************");
        console.log("\n--> Submit Transaction: CreateAsset " + assetID2);
        await contractOrg2.submitTransaction("CreateAsset", assetID2, "MIT");
        console.log("*** Result: committed");

        // GetAssetByRange returns assets on the ledger with ID in the range of startKey (inclusive) and endKey (exclusive)
        console.log("\n--> Evaluate Transaction: GetAssetsByRange asset0-asset9");
        result = await contractOrg1.evaluateTransaction(
          "GetAssetsByRange",
          "asset0",
          "asset9"
        );
        console.log(`<-- result: ${prettyJSONString(result.toString())}`);
        if (!result || result.length === 0) {
          doFail("received empty query list for GetAssetsByRange");
        }

      // ReadAsset returns asset on the ledger with the specified ID
      console.log("\n--> Evaluate Transaction: ReadAsset asset0");
      result = await contractOrg1.evaluateTransaction("ReadAsset", "asset0");
      console.log(`<-- result: ${prettyJSONString(result.toString())}`);
      if (!result || result.length === 0) {
        doFail("received empty query list for ReadAsset");
      }

      //   QueryAssetByOwnerID returns asset on the ledger with the specified assetType & ownerID
      // console.log(
      //   "\n--> Evaluate Transaction: QueryAssetByOwnerID asset, current user (appUser1)"
      // );
      // result = await contractOrg1.evaluateTransaction(
      //   "QueryAssetByOwnerID",
      //   "asset",
      //   "x509::CN=appUser1,OU=org1+OU=client+OU=department1::CN=fabric-ca-server,OU=Fabric,O=Hyperledger,ST=North Carolina,C=US"
      // );
      // console.log(`<-- result: ${prettyJSONString(result.toString())}`);
      // if (!result || result.length === 0) {
      //   doFail("received empty query list for ReadAsset");
      // }

      // //   QueryAssetByCreatorID returns asset on the ledger with the specified assetType & ownerID
      // console.log(
      //   "\n--> Evaluate Transaction: QueryAssetByCreatorID asset, appUser2"
      // );
      // result = await contractOrg1.evaluateTransaction(
      //   "QueryAssetByCreatorID",
      //   "asset",
      //   "x509::CN=appUser2,OU=org2+OU=client+OU=department1::CN=fabric-ca-server,OU=Fabric,O=Hyperledger,ST=North Carolina,C=US"
      // );
      // console.log(`<-- result: ${prettyJSONString(result.toString())}`);
      // if (!result || result.length === 0) {
      //   doFail("received empty query list for ReadAsset");
      // }

      // Attempt Transfer the asset to Org2 , without Org2 adding AgreeToTransfer //
      // Transaction should return an error: "failed transfer verification ..."
      //   try {
      //     console.log(
      //       "\n--> Attempt Submit Transaction: TransferAsset " +
      //         assetID1 +
      //         "to buyerMSP " +
      //         mspOrg2
      //     );
      //     await contractOrg1.submitTransaction(
      //       "TransferAsset",
      //       assetID1,
      //       mspOrg2
      //     );
      //     console.log(
      //       "******** FAILED: above operation expected to return an error"
      //     );
      //   } catch (error) {
      //     console.log(`   Successfully caught the error: \n    ${error}`);
      //   }

      //   console.log('\n~~~~~~~~~~~~~~~~ As Org2 Client ~~~~~~~~~~~~~~~~');
      //   console.log('\n--> Evaluate Transaction: ReadAsset ' + assetID1);
      //   result = await contractOrg2.evaluateTransaction('ReadAsset', assetID1);
      //   console.log(`<-- result: ${prettyJSONString(result.toString())}`);
      //   verifyAssetData(mspOrg2, result, assetID1, 'green', 20, Org1UserId);

      let statefulTxn;
      let tmapData;

      // Owner from Org1 agrees to sell the asset assetID1 //
      let dataForOwnerAgreement = { assetID: assetID1, appraisedValue: 100 };
      console.log(
        "\n--> Submit Transaction: AgreeToTransfer payload " +
          JSON.stringify(dataForOwnerAgreement)
      );
      statefulTxn = contractOrg1.createTransaction("AgreeToTransfer");
      tmapData = Buffer.from(JSON.stringify(dataForOwnerAgreement));
      statefulTxn.setTransient({
        asset_value: tmapData,
      });
      result = await statefulTxn.submit();

      // Buyer from Org2 agrees to buy the asset assetID1 //
      // To purchase the asset, the buyer needs to agree to the same value as the asset owner
      let dataForBuyerAgreement = { assetID: assetID1, appraisedValue: 100 };
      console.log(
        "\n--> Submit Transaction: AgreeToTransfer payload " +
          JSON.stringify(dataForBuyerAgreement)
      );
      statefulTxn = contractOrg2.createTransaction("AgreeToTransfer");
      tmapData = Buffer.from(JSON.stringify(dataForBuyerAgreement));
      statefulTxn.setTransient({
        asset_value: tmapData,
      });
      result = await statefulTxn.submit();

      // Attempt Transfer the asset to Org2, with different appraised value as the owner Org1
      // Transaction should return an error: "failed transfer verification ..."
      try {
        console.log(
          "\n--> Attempt Submit Transaction: TransferAsset " +
            assetID1 +
            "to buyerMSP " +
            mspOrg2
        );
        await contractOrg1.submitTransaction(
          "TransferAsset",
          assetID1,
          mspOrg2
        );
        console.log(
          "******** FAILED: above operation expected to return an error"
        );
      } catch (error) {
        console.log(`Successfully caught the error: \n    ${error}`);
      }

      // ReadAsset returns asset on the ledger with the specified ID
      console.log("\n--> Evaluate Transaction: ReadAsset asset0");
      result = await contractOrg1.evaluateTransaction("ReadAsset", assetID1);
      console.log(`<-- result: ${prettyJSONString(result.toString())}`);
      if (!result || result.length === 0) {
        doFail("received empty query list for ReadAsset");
      }

      //Buyer can withdraw the Agreement, using DeleteTranferAgreement
      /*statefulTxn = contractOrg2.createTransaction('DeleteTranferAgreement');
      statefulTxn.setEndorsingOrganizations(mspOrg2);
      let dataForDeleteAgreement = { assetID: assetID1 };
      tmapData = Buffer.from(JSON.stringify(dataForDeleteAgreement));
      statefulTxn.setTransient({
          agreement_delete: tmapData
      });
      result = await statefulTxn.submit();*/

      // console.log('\n--> Evaluate Transaction: ReadAssetPrivateDetails from ' + org1PrivateCollectionName);
      // // ReadAssetPrivateDetails reads data from Org's private collection. Args: collectionName, assetID
      // result = await contractOrg1.evaluateTr ansaction('ReadAssetPrivateDetails', org1PrivateCollectionName, assetID1);
      // console.log(`<-- result: ${prettyJSONString(result.toString())}`);
      // verifyAssetPrivateDetails(result, assetID1, 100);

      // // Org2 cannot ReadAssetPrivateDetails from Org1's private collection due to Collection policy
      // //    Will fail: await contractOrg2.evaluateTransaction('ReadAssetPrivateDetails', org1PrivateCollectionName, assetID1);

      // console.log('\n**************** As Org1 Client ****************');
      // // All members can send txn ReadTransferAgreement, set by Org2 above
      // console.log('\n--> Evaluate Transaction: ReadTransferAgreement ' + assetID1);
      // result = await contractOrg1.evaluateTransaction('ReadTransferAgreement', assetID1);
      // console.log(`<-- result: ${prettyJSONString(result.toString())}`);

      // // Transfer the asset to Org2 //
      // // To transfer the asset, the owner needs to pass the MSP ID of new asset owner, and initiate the transfer
      // console.log('\n--> Submit Transaction: TransferAsset ' + assetID1);

      // statefulTxn = contractOrg1.createTransaction('TransferAsset');
      // tmapData = Buffer.from(JSON.stringify(buyerDetails));
      // statefulTxn.setTransient({
      //     asset_owner: tmapData
      // });
      // result = await statefulTxn.submit();

      // //Again ReadAsset : results will show that the buyer identity now owns the asset:
      // console.log('\n--> Evaluate Transaction: ReadAsset ' + assetID1);
      // result = await contractOrg1.evaluateTransaction('ReadAsset', assetID1);
      // console.log(`<-- result: ${prettyJSONString(result.toString())}`);
      // verifyAssetData(mspOrg1, result, assetID1, 'green', 20, Org2UserId);

      // //Confirm that transfer removed the private details from the Org1 collection:
      // console.log('\n--> Evaluate Transaction: ReadAssetPrivateDetails');
      // // ReadAssetPrivateDetails reads data from Org's private collection: Should return empty
      // result = await contractOrg1.evaluateTransaction('ReadAssetPrivateDetails', org1PrivateCollectionName, assetID1);
      // console.log(`<-- result: ${prettyJSONString(result.toString())}`);
      // if (result && result.length > 0) {
      //     doFail('Expected empty data from ReadAssetPrivateDetails');
      // }
      // console.log('\n--> Evaluate Transaction: ReadAsset ' + assetID2);
      // result = await contractOrg1.evaluateTransaction('ReadAsset', assetID2);
      // console.log(`<-- result: ${prettyJSONString(result.toString())}`);
      // verifyAssetData(mspOrg1, result, assetID2, 'blue', 35, Org1UserId);

      // console.log('\n********* Demo deleting asset **************');
      // let dataForDelete = { assetID: assetID2 };
      // try {
      //     //Non-owner Org2 should not be able to DeleteAsset. Expect an error from DeleteAsset
      //     console.log('--> Attempt Transaction: as Org2 DeleteAsset ' + assetID2);
      //     statefulTxn = contractOrg2.createTransaction('DeleteAsset');
      //     tmapData = Buffer.from(JSON.stringify(dataForDelete));
      //     statefulTxn.setTransient({
      //         asset_delete: tmapData
      //     });
      //     result = await statefulTxn.submit();
      //     console.log('******** FAILED : expected to return an error');
      // } catch (error) {
      //     console.log(`  Successfully caught the error: \n    ${error}`);
      // }
      // // Delete Asset2 as Org1
      // console.log('--> Submit Transaction: as Org1 DeleteAsset ' + assetID2);
      // statefulTxn = contractOrg1.createTransaction('DeleteAsset');
      // tmapData = Buffer.from(JSON.stringify(dataForDelete));
      // statefulTxn.setTransient({
      //     asset_delete: tmapData
      // });
      // result = await statefulTxn.submit();

      // console.log('\n--> Evaluate Transaction: ReadAsset ' + assetID2);
      // result = await contractOrg1.evaluateTransaction('ReadAsset', assetID2);
      // console.log(`<-- result: ${prettyJSONString(result.toString())}`);
      // if (result && result.length > 0) {
      //     doFail('Expected empty read, after asset is deleted');
      // }

      // console.log('\n~~~~~~~~~~~~~~~~ As Org2 Client ~~~~~~~~~~~~~~~~');
      // // Org2 can ReadAssetPrivateDetails: Org2 is owner, and private details exist in new owner's Collection
      // console.log('\n--> Evaluate Transaction as Org2: ReadAssetPrivateDetails ' + assetID1 + ' from ' + org2PrivateCollectionName);
      // result = await contractOrg2.evaluateTransaction('ReadAssetPrivateDetails', org2PrivateCollectionName, assetID1);
      // console.log(`<-- result: ${prettyJSONString(result.toString())}`);
      // verifyAssetPrivateDetails(result, assetID1, 100);
    } finally {
      // Disconnect from the gateway peer when all work for this client identity is complete
      gatewayOrg1.disconnect();
      gatewayOrg2.disconnect();
    }
  } catch (error) {
    console.error(`Error in transaction: ${error}`);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

main();
