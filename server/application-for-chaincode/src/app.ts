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
//    npm run start
// common errors:
//  - "appUser not found/already exists/Identity already registered"
//    -> change org1UserId below to sth else and retry npm run start
//  - "failed to register user/identity not found"
//    -> delete wallet folder and retry npm run start

'use strict';

import { Gateway, GatewayOptions, Contract } from 'fabric-network';
import * as path from 'path';
import {
  buildCCPOrg1,
  buildCCPOrg2,
  buildWallet,
  prettyJSONString
} from './utils//AppUtil';
import {
  buildCAClient,
  enrollAdmin,
  registerAndEnrollUser
} from './utils/CAUtil';

const channelName = 'mychannel';
const chaincodeName = 'muess';
const mspIdOrg1 = 'Org1MSP';
const mspIdOrg2 = 'Org2MSP';

const walletPath1 = path.join(__dirname, 'wallet', 'org1');
const walletPath2 = path.join(__dirname, 'wallet', 'org2');
const org1UserId = 'appUser009';
const org2UserId = 'appUser0010';

// functions to call on transactions
const createProposal = async (
  contract: Contract,
  proposalID: string,
  appID: string,
  proposedPrice: number,
  licenseDetails: string
) => {
  console.log('create a proposal');
  await contract.submitTransaction(
    'CreateProposal',
    proposalID,
    appID,
    proposedPrice.toString(),
    licenseDetails
  );
};

const acceptProposal = async (
  contract: Contract,
  licenseID: string,
  proposalID: string
) => {
  console.log('accept a proposal');
  await contract.submitTransaction('AcceptProposal', licenseID, proposalID);
};

const readAsset = async (contract: Contract, assetID: string) => {
  console.log('\nread asset');
  const result = await contract.evaluateTransaction('ReadAsset', assetID);
  // console.log(`*** Result: ${prettyJSONString(result.toString())}`);
  return result;
};

const queryLicensesByAppID = async (contract: Contract, appID: string) => {
  console.log('\n--> Evaluate Transaction: QueryLicensesByAppID');
  const result = await contract.evaluateTransaction(
    'QueryLicensesByAppID',
    appID
  );
  return result;
};

const queryLicensesByOwnerID = async (contract: Contract, ownerID: string) => {
  console.log('\n--> Evaluate Transaction: QueryLicensesByOwnerID');
  const result = await contract.evaluateTransaction(
    'QueryLicensesByOwnerID',
    ownerID
  );
  return result;
  // console.log(`*** Result: ${prettyJSONString(result.toString())}`);
};

const queryLicensesByCreatorID = async (
  contract: Contract,
  creatorID: string
) => {
  console.log('\n--> Evaluate Transaction: QueryLicensesByCreatorID');
  const result = await contract.evaluateTransaction(
    'QueryLicensesByCreatorID',
    creatorID
  );
  return result;
  // console.log(`*** Result: ${prettyJSONString(result.toString())}`);
};

const queryProposalsByAppID = async (contract: Contract, appID: string) => {
  console.log('\n--> Evaluate Transaction: QueryProposalsByAppID');
  const result = await contract.evaluateTransaction(
    'QueryProposalsByAppID',
    appID
  );
  return result;
};

const queryProposalsByBuyerID = async (contract: Contract, buyerID: string) => {
  console.log('\n--> Evaluate Transaction: QueryProposalsByBuyerID');
  const result = await contract.evaluateTransaction(
    'QueryProposalsByBuyerID',
    buyerID
  );
  return result;
};

async function main() {
  try {
    // build an in memory object with the network configuration (also known as a connection profile)
    const ccp1 = buildCCPOrg1();
    const ccp2 = buildCCPOrg2();

    // build an instance of the fabric ca services client based on
    // the information in the network configuration
    const caClient1 = buildCAClient(ccp1, 'ca.org1.example.com');
    const caClient2 = buildCAClient(ccp2, 'ca.org2.example.com');

    // setup the wallet to hold the credentials of the application user
    const wallet1 = await buildWallet(walletPath1);
    const wallet2 = await buildWallet(walletPath2);

    // in a real application this would be done on an administrative flow, and only once
    await enrollAdmin(caClient1, wallet1, mspIdOrg1);
    await enrollAdmin(caClient2, wallet2, mspIdOrg2);

    // in a real application this would be done only when a new user was required to be added
    // and would be part of an administrative flow
    await registerAndEnrollUser(
      caClient1,
      wallet1,
      mspIdOrg1,
      org1UserId,
      'org1.department1'
    );
    await registerAndEnrollUser(
      caClient2,
      wallet2,
      mspIdOrg2,
      org2UserId,
      'org2.department1'
    );

    // Create a new gateway instance for interacting with the fabric network.
    // In a real application this would be done as the backend server session is setup for
    // a user that has been verified.
    const gateway1 = new Gateway();
    const gateway1Opts: GatewayOptions = {
      wallet: wallet1,
      identity: org1UserId,
      discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
    };

    const gateway2 = new Gateway();
    const gateway2Opts: GatewayOptions = {
      wallet: wallet2,
      identity: org2UserId,
      discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
    };

    try {
      // setup the gateway instance
      // The user will now be able to create connections to the fabric network and be able to
      // submit transactions and query. All transactions submitted by this gateway will be
      // signed by this user using the credentials stored in the wallet.

      await gateway1.connect(ccp1, gateway1Opts);
      await gateway2.connect(ccp2, gateway2Opts);

      // Build a network instance based on the channel where the smart contract is deployed
      const network1 = await gateway1.getNetwork(channelName);
      const network2 = await gateway2.getNetwork(channelName);

      // Get the contract from the network.
      const contract1 = network1.getContract(chaincodeName);
      const contract2 = network2.getContract(chaincodeName);

      /* MODIFY THIS PART TO TEST OUT CHAINCODE */
      ///////////////////////////////////////////
      // some consts
      const proposalID = 'proposal4';
      const licenseID = 'license4';
      const appID = 'app4';
      const creatorID = 'billgates';
      const buyerID = 'nghihua';

      let result;

      await createProposal(contract2, proposalID, appID, 100, 'free use');

      // read proposal we just created
      result = await readAsset(contract2, proposalID);
      console.log(`*** Result: ${prettyJSONString(result.toString())}`);

      await acceptProposal(contract1, licenseID, proposalID);

      // read the proposal again, which will return an error
      // because the proposal is deleted once it has been accepted
      // result = await readAsset(contract, proposalID);
      // console.log(`*** Result: ${prettyJSONString(result.toString())}`);

      // read the license with appID specified above
      // result = await queryLicensesByAppID(contract, appID);
      // console.log(`*** Result: ${prettyJSONString(result.toString())}`);

      // read the license we just created
      result = await readAsset(contract1, licenseID);
      console.log(`*** Result: ${prettyJSONString(result.toString())}`);

      // read the license with appID specified above
      result = await queryLicensesByAppID(contract1, appID);
      console.log(`*** Result: ${prettyJSONString(result.toString())}`);

      console.log('*** all tests completed');
    } finally {
      // Disconnect from the gateway when the application is closing
      // This will close all connections to the network
      gateway1.disconnect();
      gateway2.disconnect();
    }
  } catch (error) {
    console.error(`******** FAILED to run the application: ${error}`);
  }

  console.log('*** application ending');
}

main();
