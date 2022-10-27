/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// how to run this thing
// go to test-network, run
//    ./network.sh down
//    ./network.sh up createChannel -ca -s couchdb
//    ./network.sh deployCC -ccn muess -ccp ../chaincode/ -ccl javascript
// go to this directory (application-for-chaincode)
//    npm install
//    node app.js
// common errors:
//  - "appUser not found/already exists"
//    -> change userId below to sth else and retry node app.js
//  - "failed to register user/identity not found"
//    -> delete wallet folder and retry node app.js

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const path = require('path');
const {
  buildCAClient,
  registerAndEnrollUser,
  enrollAdmin
} = require('./CAUtil.js');
const { buildCCPOrg1, buildWallet } = require('./AppUtil.js');

const channelName = 'mychannel';
const chaincodeName = 'muess';
const mspOrg1 = 'Org1MSP';

const walletPath = path.join(__dirname, 'wallet');
const userId = 'appUser';

// utility functions
function prettyJSONString(inputString) {
  return JSON.stringify(JSON.parse(inputString), null, 2);
}

// functions to call on transactions
const createProposal = async (
  contract,
  proposalID,
  appID,
  buyerID,
  proposedPrice,
  licenseDetails
) => {
  console.log('create a proposal');
  await contract.submitTransaction(
    'CreateProposal',
    proposalID,
    appID,
    buyerID,
    proposedPrice,
    licenseDetails
  );
};

const acceptProposal = async (contract, licenseID, creatorID, proposalID) => {
  console.log('accept a proposal');
  await contract.submitTransaction(
    'AcceptProposal',
    licenseID,
    creatorID,
    proposalID
  );
};

const readAsset = async (contract, assetID) => {
  console.log('\nread asset');
  const result = await contract.evaluateTransaction('ReadAsset', assetID);
  // console.log(`*** Result: ${prettyJSONString(result.toString())}`);
  return result;
};

const queryLicensesByAppID = async (contract, appID) => {
  console.log('\n--> Evaluate Transaction: QueryLicensesByAppID');
  const result = await contract.evaluateTransaction(
    'QueryLicensesByAppID',
    appID
  );
  return result;
};

const queryLicensesByOwnerID = async (contract, ownerID) => {
  console.log('\n--> Evaluate Transaction: QueryLicensesByOwnerID');
  const result = await contract.evaluateTransaction(
    'QueryLicensesByOwnerID',
    ownerID
  );
  return result;
  // console.log(`*** Result: ${prettyJSONString(result.toString())}`);
};

const queryLicensesByCreatorID = async (contract, creatorID) => {
  console.log('\n--> Evaluate Transaction: QueryLicensesByCreatorID');
  const result = await contract.evaluateTransaction(
    'QueryLicensesByCreatorID',
    creatorID
  );
  return result;
  // console.log(`*** Result: ${prettyJSONString(result.toString())}`);
};

const queryProposalsByAppID = async (contract, appID) => {
  console.log('\n--> Evaluate Transaction: QueryProposalsByAppID');
  const result = await contract.evaluateTransaction(
    'QueryProposalsByAppID',
    appID
  );
  return result;
};

const queryProposalsByBuyerID = async (contract, buyerID) => {
  console.log('\n--> Evaluate Transaction: QueryProposalsByBuyerID');
  const result = await contract.evaluateTransaction(
    'QueryProposalsByBuyerID',
    buyerID
  );
  return result;
};

async function main() {
  let skipInit = false;
  if (process.argv.length > 2) {
    if (process.argv[2] === 'skipInit') {
      skipInit = true;
    }
  }

  try {
    // build an in memory object with the network configuration (also known as a connection profile)
    const ccp = buildCCPOrg1();

    // build an instance of the fabric ca services client based on
    // the information in the network configuration
    const caClient = buildCAClient(
      FabricCAServices,
      ccp,
      'ca.org1.example.com'
    );

    // setup the wallet to hold the credentials of the application user
    const wallet = await buildWallet(Wallets, walletPath);

    // in a real application this would be done on an administrative flow, and only once
    await enrollAdmin(caClient, wallet, mspOrg1);

    // in a real application this would be done only when a new user was required to be added
    // and would be part of an administrative flow
    await registerAndEnrollUser(
      caClient,
      wallet,
      mspOrg1,
      userId,
      'org1.department1'
    );

    // Create a new gateway instance for interacting with the fabric network.
    // In a real application this would be done as the backend server session is setup for
    // a user that has been verified.
    const gateway = new Gateway();

    try {
      // setup the gateway instance
      // The user will now be able to create connections to the fabric network and be able to
      // submit transactions and query. All transactions submitted by this gateway will be
      // signed by this user using the credentials stored in the wallet.
      await gateway.connect(ccp, {
        wallet,
        identity: userId,
        discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
      });

      // Build a network instance based on the channel where the smart contract is deployed
      const network = await gateway.getNetwork(channelName);

      // Get the contract from the network.
      const contract = network.getContract(chaincodeName);

      /* MODIFY THIS PART TO TEST OUT CHAINCODE */
      ///////////////////////////////////////////
      // some consts
      const proposalID = 'proposal3';
      const licenseID = 'license3';
      const appID = 'app3';
      const creatorID = 'billgates';
      const buyerID = 'nghihua';

      let result;

      await createProposal(
        contract,
        proposalID,
        appID,
        buyerID,
        100,
        'free use'
      );

      // read proposal we just created
      result = await readAsset(contract, proposalID);
      console.log(`*** Result: ${prettyJSONString(result.toString())}`);

      await acceptProposal(contract, licenseID, creatorID, proposalID);

      // read the proposal again, which will return an error
      // because the proposal is deleted once it has been accepted
      result = await readAsset(contract, proposalID);
      console.log(`*** Result: ${prettyJSONString(result.toString())}`);

      // read the license we just created
      result = await readAsset(contract, proposalID);
      console.log(`*** Result: ${prettyJSONString(result.toString())}`);

      // read the license with appID specified above
      result = await queryLicensesByAppID(contract, appID);
      console.log(`*** Result: ${prettyJSONString(result.toString())}`);

      console.log('*** all tests completed');
    } finally {
      // Disconnect from the gateway when the application is closing
      // This will close all connections to the network
      gateway.disconnect();
    }
  } catch (error) {
    console.error(`******** FAILED to run the application: ${error}`);
  }

  console.log('*** application ending');
}

main();
