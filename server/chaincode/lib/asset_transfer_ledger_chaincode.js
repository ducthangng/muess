/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-licenseDetails-Identifier: Apache-2.0
 */

// ====CHAINCODE EXECUTION SAMPLES (CLI) ==================

// ==== Invoke assets ====
// peer chaincode invoke -C CHANNEL_NAME -n asset_transfer -c '{"Args":["CreateAsset","asset1","blue","35","Tom","100"]}'
// peer chaincode invoke -C CHANNEL_NAME -n asset_transfer -c '{"Args":["CreateAsset","asset2","red","50","Tom","150"]}'
// peer chaincode invoke -C CHANNEL_NAME -n asset_transfer -c '{"Args":["CreateAsset","asset3","blue","70","Tom","200"]}'
// peer chaincode invoke -C CHANNEL_NAME -n asset_transfer -c '{"Args":["TransferAsset","asset2","jerry"]}'
// peer chaincode invoke -C CHANNEL_NAME -n asset_transfer -c '{"Args":["TransferAssetByColor","blue","jerry"]}'
// peer chaincode invoke -C CHANNEL_NAME -n asset_transfer -c '{"Args":["DeleteAsset","asset1"]}'

// ==== Query assets ====
// peer chaincode query -C CHANNEL_NAME -n asset_transfer -c '{"Args":["ReadAsset","asset1"]}'
// peer chaincode query -C CHANNEL_NAME -n asset_transfer -c '{"Args":["GetAssetsByRange","asset1","asset3"]}'
// peer chaincode query -C CHANNEL_NAME -n asset_transfer -c '{"Args":["GetAssetHistory","asset1"]}'

// Rich Query (Only supported if CouchDB is used as state database):
// peer chaincode query -C CHANNEL_NAME -n asset_transfer -c '{"Args":["QueryAssetsByownerID","Tom"]}' output issue
// peer chaincode query -C CHANNEL_NAME -n asset_transfer -c '{"Args":["QueryAssets","{\"selector\":{\"ownerID\":\"Tom\"}}"]}'

// Rich Query with Pagination (Only supported if CouchDB is used as state database):
// peer chaincode query -C CHANNEL_NAME -n asset_transfer -c '{"Args":["QueryAssetsWithPagination","{\"selector\":{\"ownerID\":\"Tom\"}}","3",""]}'

// INDEXES TO SUPPORT COUCHDB RICH QUERIES
//
// Indexes in CouchDB are required in order to make JSON queries efficient and are required for
// any JSON query with a sort. Indexes may be packaged alongside
// chaincode in a META-INF/statedb/couchdb/indexes directory. Each index must be defined in its own
// text file with extension *.json with the index definition formatted in JSON following the
// CouchDB index JSON syntax as documented at:
// http://docs.couchdb.org/en/2.3.1/api/database/find.html#db-index
//
// This asset transfer ledger example chaincode demonstrates a packaged
// index which you can find in META-INF/statedb/couchdb/indexes/indexownerID.json.
//
// If you have access to the your peer's CouchDB state database in a development environment,
// you may want to iteratively test various indexes in support of your chaincode queries.  You
// can use the CouchDB Fauxton interface or a command line curl utility to create and update
// indexes. Then once you finalize an index, include the index definition alongside your
// chaincode in the META-INF/statedb/couchdb/indexes directory, for packaging and deployment
// to managed environments.
//
// In the examples below you can find index definitions that support asset transfer ledger
// chaincode queries, along with the syntax that you can use in development environments
// to create the indexes in the CouchDB Fauxton interface or a curl command line utility.
//

// Index for docType, ownerID.
//
// Example curl command line to define index in the CouchDB channel_chaincode database
// curl -i -X POST -H "Content-Type: application/json" -d "{\"index\":{\"fields\":[\"docType\",\"ownerID\"]},\"name\":\"indexownerID\",\"ddoc\":\"indexownerIDDoc\",\"type\":\"json\"}" http://hostname:port/myc1_assets/_index
//

// Index for docType, ownerID, size (descending order).
//
// Example curl command line to define index in the CouchDB channel_chaincode database
// curl -i -X POST -H "Content-Type: application/json" -d "{\"index\":{\"fields\":[{\"size\":\"desc\"},{\"docType\":\"desc\"},{\"ownerID\":\"desc\"}]},\"ddoc\":\"indexSizeSortDoc\", \"name\":\"indexSizeSortDesc\",\"type\":\"json\"}" http://hostname:port/myc1_assets/_index

// Rich Query with index design doc and index name specified (Only supported if CouchDB is used as state database):
//   peer chaincode query -C CHANNEL_NAME -n ledger -c '{"Args":["QueryAssets","{\"selector\":{\"docType\":\"asset\",\"ownerID\":\"Tom\"}, \"use_index\":[\"_design/indexownerIDDoc\", \"indexownerID\"]}"]}'

// Rich Query with index design doc specified only (Only supported if CouchDB is used as state database):
//   peer chaincode query -C CHANNEL_NAME -n ledger -c '{"Args":["QueryAssets","{\"selector\":{\"docType\":{\"$eq\":\"asset\"},\"ownerID\":{\"$eq\":\"Tom\"},\"size\":{\"$gt\":0}},\"fields\":[\"docType\",\"ownerID\",\"size\"],\"sort\":[{\"size\":\"desc\"}],\"use_index\":\"_design/indexSizeSortDoc\"}"]}'

'use strict';

const { Contract } = require('fabric-contract-api');

// internal util functions that lie outside the contract
const getCollectionName = async (ctx) => {
  try {
    const clientMSPID = await ctx.clientIdentity.getMSPID();
    const orgCollection = clientMSPID + 'PrivateCollection';
    return orgCollection;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const verifyClientOrgMatchesPeerOrg = async (ctx) => {
  try {
    const clientMSPID = await ctx.clientIdentity.getMSPID();
    const peerMSPID = await ctx.stub.getMspID();
    if (clientMSPID !== peerMSPID) {
      throw new Error(
        `client from org ${clientMSPID} is not authorized to read or write private data from an org ${peerMSPID} peer`
      );
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const getSubmittingClientIdentity = async (ctx) => {
  try {
    const base64ID = ctx.clientIdentity.getID();
    const buffer = Buffer.from(base64ID, 'base64');
    const decodeID = buffer.toString('ascii');
    return decodeID;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const verifyAgreement = async (ctx, licenseID, ownerID, buyerMSP) {
  // Check 1: verify that the transfer is being initiatied by the owner

  // Get ID of submitting client identity
  const clientID = await getSubmittingClientIdentity(ctx);
  if (clientID!=ownerID) {
    throw new Error("error: submitting client identity does not own asset");
  }

  // Check 2: verify that the buyer has agreed to the appraised value

  // Get collection names
  ownerCollection = getCollectionName(ctx); // get owner collection from caller identity
  buyerCollection = buyerMSP + "PrivateCollection"; //get buyer collection

  // Get hash of owner's agreed to value
  const ownerPriceHash = ctx.stub.getPrivateDataHash(ownerCollection, licenseID);
  if (!ownerPriceHash) {
    throw new Error(`Hash of price for ${licenseID} does not exist in collection ${ownerCollection}. AgreeToTransfer must be called by the owner first`);
  }

  // Get hash of buyer's agreed to value
  const buyerPriceHash = ctx.stub.getPrivateDataHash(buyerCollection, licenseID);
  if (!buyerPriceHash) {
    throw new Error(`Hash of price for ${licenseID} does not exist in collection ${buyerCollection}. AgreeToTransfer must be called by the owner first`);
  }

  // Check if ownerPriceHash and buyerPriceHash is equal
  if (ownerPriceHash!=buyerPriceHash) {
    throw new Error(`Hash of owner's agreed price (${ownerPriceHash} is diffent from hash of buyer's agreed price (${buyerPriceHash}))`);
  }
}

// contract
class Chaincode extends Contract {
  // CreateAsset - create a new asset, store into chaincode state
  async CreateAsset(ctx, licenseID, appID, licenseDetails, creatorID, ownerID) {
    const exists = await this.AssetExists(ctx, licenseID);
    if (exists) {
      throw new Error(`The asset ${licenseID} already exists`);
    }

    // ==== Create asset object and marshal to JSON ====
    let asset = {
      licenseID: licenseID,
      appID: appID,
      licenseDetails: licenseDetails,
      creatorID: creatorID,
      ownerID: ownerID
    };

    // === Save asset to state ===
    await ctx.stub.putState(licenseID, Buffer.from(JSON.stringify(asset)));
    let indexName = 'creatorID~name';
    let creatorIDNameIndexKey = await ctx.stub.createCompositeKey(indexName, [
      asset.creatorID,
      asset.licenseID
    ]);

    //  Save index entry to state. Only the key name is needed, no need to store a duplicate copy of the marble.
    //  Note - passing a 'nil' value will effectively delete the key from state, therefore we pass null character as value
    await ctx.stub.putState(creatorIDNameIndexKey, Buffer.from('\u0000'));
  }

  // ReadAsset returns the asset stored in the world state with given id.
  async ReadAsset(ctx, id) {
    const assetJSON = await ctx.stub.getState(id); // get the asset from chaincode state
    if (!assetJSON || assetJSON.length === 0) {
      throw new Error(`Asset ${id} does not exist`);
    }

    return assetJSON.toString();
  }

  // delete - remove a asset key/value pair from state
  async DeleteAsset(ctx, id) {
    if (!id) {
      throw new Error('Asset name must not be empty');
    }

    let exists = await this.AssetExists(ctx, id);
    if (!exists) {
      throw new Error(`Asset ${id} does not exist`);
    }

    // to maintain the color~name index, we need to read the asset first and get its color
    let valAsbytes = await ctx.stub.getState(id); // get the asset from chaincode state
    let jsonResp = {};
    if (!valAsbytes) {
      jsonResp.error = `Asset does not exist: ${id}`;
      throw new Error(jsonResp);
    }
    let assetJSON;
    try {
      assetJSON = JSON.parse(valAsbytes.toString());
    } catch (err) {
      jsonResp = {};
      jsonResp.error = `Failed to decode JSON of: ${id}`;
      throw new Error(jsonResp);
    }
    await ctx.stub.deleteState(id); //remove the asset from chaincode state

    // delete the index
    let indexName = 'creatorID~name';
    let creatorIDNameIndexKey = ctx.stub.createCompositeKey(indexName, [
      assetJSON.creatorID,
      assetJSON.licenseID
    ]);
    if (!creatorIDNameIndexKey) {
      throw new Error(' Failed to create the createCompositeKey');
    }
    //  Delete index entry to state.
    await ctx.stub.deleteState(creatorIDNameIndexKey);
  }

  // TransferAsset transfers an asset by setting a new ownerID name on the asset
  async TransferAsset(ctx, assetName, newownerID) {
    let assetAsBytes = await ctx.stub.getState(assetName);
    if (!assetAsBytes || !assetAsBytes.toString()) {
      throw new Error(`Asset ${assetName} does not exist`);
    }
    let assetToTransfer = {};
    try {
      assetToTransfer = JSON.parse(assetAsBytes.toString()); //unmarshal
    } catch (err) {
      let jsonResp = {};
      jsonResp.error = 'Failed to decode JSON of: ' + assetName;
      throw new Error(jsonResp);
    }
    assetToTransfer.ownerID = newownerID; //change the ownerID

    let assetJSONasBytes = Buffer.from(JSON.stringify(assetToTransfer));
    await ctx.stub.putState(assetName, assetJSONasBytes); //rewrite the asset
  }

  // GetAssetsByRange performs a range query based on the start and end keys provided.
  // Read-only function results are not typically submitted to ordering. If the read-only
  // results are submitted to ordering, or if the query is used in an update transaction
  // and submitted to ordering, then the committing peers will re-execute to guarantee that
  // result sets are stable between endorsement time and commit time. The transaction is
  // invalidated by the committing peers if the result set has changed between endorsement
  // time and commit time.
  // Therefore, range queries are a safe option for performing update transactions based on query results.
  async GetAssetsByRange(ctx, startKey, endKey) {
    let resultsIterator = await ctx.stub.getStateByRange(startKey, endKey);
    let results = await this._GetAllResults(resultsIterator, false);

    return JSON.stringify(results);
  }

  // TransferAssetByColor will transfer assets of a given color to a certain new ownerID.
  // Uses a GetStateByPartialCompositeKey (range query) against color~name 'index'.
  // Committing peers will re-execute range queries to guarantee that result sets are stable
  // between endorsement time and commit time. The transaction is invalidated by the
  // committing peers if the result set has changed between endorsement time and commit time.
  // Therefore, range queries are a safe option for performing update transactions based on query results.
  // Example: GetStateByPartialCompositeKey/RangeQuery
  //   async TransferAssetByColor(ctx, color, newownerID) {
  //     // Query the color~name index by color
  //     // This will execute a key range query on all keys starting with 'color'
  //     let coloredAssetResultsIterator =
  //       await ctx.stub.getStateByPartialCompositeKey("color~name", [color]);

  //     // Iterate through result set and for each asset found, transfer to newownerID
  //     let responseRange = await coloredAssetResultsIterator.next();
  //     while (!responseRange.done) {
  //       if (!responseRange || !responseRange.value || !responseRange.value.key) {
  //         return;
  //       }

  //       let objectType;
  //       let attributes;
  //       ({ objectType, attributes } = await ctx.stub.splitCompositeKey(
  //         responseRange.value.key
  //       ));

  //       console.log(objectType);
  //       let returnedAssetName = attributes[1];

  //       // Now call the transfer function for the found asset.
  //       // Re-use the same function that is used to transfer individual assets
  //       await this.TransferAsset(ctx, returnedAssetName, newownerID);
  //       responseRange = await coloredAssetResultsIterator.next();
  //     }
  //   }

  // QueryAssetsByownerID queries for assets based on a passed in ownerID.
  // This is an example of a parameterized query where the query logic is baked into the chaincode,
  // and accepting a single query parameter (ownerID).
  // Only available on state databases that support rich query (e.g. CouchDB)
  // Example: Parameterized rich query
  async QueryAssetsByOwnerID(ctx, ownerID) {
    let queryString = {};
    queryString.selector = {};
    queryString.selector.ownerID = ownerID;
    return await this.GetQueryResultForQueryString(
      ctx,
      JSON.stringify(queryString)
    ); //shim.success(queryResults);
  }
  async QueryAssetsByCreatorID(ctx, creatorID) {
    let queryString = {};
    queryString.selector = {};
    queryString.selector.creatorID = creatorID;
    return await this.GetQueryResultForQueryString(
      ctx,
      JSON.stringify(queryString)
    ); //shim.success(queryResults);
  }
  async QueryAssetsByAppID(ctx, appID) {
    let queryString = {};
    queryString.selector = {};
    queryString.selector.appID = appID;
    return await this.GetQueryResultForQueryString(
      ctx,
      JSON.stringify(queryString)
    ); //shim.success(queryResults);
  }

  // Example: Ad hoc rich query
  // QueryAssets uses a query string to perform a query for assets.
  // Query string matching state database syntax is passed in and executed as is.
  // Supports ad hoc queries that can be defined at runtime by the client.
  // If this is not desired, follow the QueryAssetsForownerID example for parameterized queries.
  // Only available on state databases that support rich query (e.g. CouchDB)
  async QueryAssets(ctx, queryString) {
    return await this.GetQueryResultForQueryString(ctx, queryString);
  }

  // GetQueryResultForQueryString executes the passed in query string.
  // Result set is built and returned as a byte array containing the JSON results.
  async GetQueryResultForQueryString(ctx, queryString) {
    let resultsIterator = await ctx.stub.getQueryResult(queryString);
    let results = await this._GetAllResults(resultsIterator, false);

    return JSON.stringify(results);
  }

  // Example: Pagination with Range Query
  // GetAssetsByRangeWithPagination performs a range query based on the start & end key,
  // page size and a bookmark.
  // The number of fetched records will be equal to or lesser than the page size.
  // Paginated range queries are only valid for read only transactions.
  async GetAssetsByRangeWithPagination(
    ctx,
    startKey,
    endKey,
    pageSize,
    bookmark
  ) {
    const { iterator, metadata } = await ctx.stub.getStateByRangeWithPagination(
      startKey,
      endKey,
      pageSize,
      bookmark
    );
    let results = {};

    results.results = await this._GetAllResults(iterator, false);

    results.fetchedRecordsCount = metadata.fetchedRecordsCount;

    results.bookmark = metadata.bookmark;

    return JSON.stringify(results);
  }

  // Example: Pagination with Ad hoc Rich Query
  // QueryAssetsWithPagination uses a query string, page size and a bookmark to perform a query
  // for assets. Query string matching state database syntax is passed in and executed as is.
  // The number of fetched records would be equal to or lesser than the specified page size.
  // Supports ad hoc queries that can be defined at runtime by the client.
  // If this is not desired, follow the QueryAssetsForownerID example for parameterized queries.
  // Only available on state databases that support rich query (e.g. CouchDB)
  // Paginated queries are only valid for read only transactions.
  async QueryAssetsWithPagination(ctx, queryString, pageSize, bookmark) {
    const { iterator, metadata } = await ctx.stub.getQueryResultWithPagination(
      queryString,
      pageSize,
      bookmark
    );
    let results = {};

    results.results = await this._GetAllResults(iterator, false);

    results.fetchedRecordsCount = metadata.fetchedRecordsCount;

    results.bookmark = metadata.bookmark;

    return JSON.stringify(results);
  }

  // GetAssetHistory returns the chain of custody for an asset since issuance.
  async GetAssetHistory(ctx, assetName) {
    let resultsIterator = await ctx.stub.getHistoryForKey(assetName);
    let results = await this._GetAllResults(resultsIterator, true);

    return JSON.stringify(results);
  }

  // AssetExists returns true when asset with given ID exists in world state
  async AssetExists(ctx, assetName) {
    // ==== Check if asset already exists ====
    let assetState = await ctx.stub.getState(assetName);
    return assetState && assetState.length > 0;
  }

  // This is JavaScript so without Funcation Decorators, all functions are assumed
  // to be transaction functions
  //
  // For internal functions... prefix them with _
  async _GetAllResults(iterator, isHistory) {
    let allResults = [];
    let res = await iterator.next();
    while (!res.done) {
      if (res.value && res.value.value.toString()) {
        let jsonRes = {};
        console.log(res.value.value.toString('utf8'));
        if (isHistory && isHistory === true) {
          jsonRes.TxId = res.value.txId;
          jsonRes.Timestamp = res.value.timestamp;
          try {
            jsonRes.Value = JSON.parse(res.value.value.toString('utf8'));
          } catch (err) {
            console.log(err);
            jsonRes.Value = res.value.value.toString('utf8');
          }
        } else {
          jsonRes.Key = res.value.key;
          try {
            jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
          } catch (err) {
            console.log(err);
            jsonRes.Record = res.value.value.toString('utf8');
          }
        }
        allResults.push(jsonRes);
      }
      res = await iterator.next();
    }
    iterator.close();
    return allResults;
  }

  // InitLedger creates sample assets in the ledger
  async InitLedger(ctx) {
    const assets = [
      {
        licenseID: 'asset1',
        appID: 'app1',
        licenseDetails: 'rent for 5 days',
        creatorID: 'Tom',
        ownerID: 'Tom'
      },
      {
        licenseID: 'asset2',
        appID: 'app1',
        licenseDetails:
          'buy with rights to modify code for non-commercial purposes',
        creatorID: 'Brad',
        ownerID: 'Brad'
      },
      {
        licenseID: 'asset3',
        appID: 'app2',
        licenseDetails: 'MIT',
        creatorID: 'Jin Soo',
        ownerID: 'Jin Soo'
      },
      {
        licenseID: 'asset4',
        appID: 'app2',
        licenseDetails: 'MIT',
        creatorID: 'Max',
        ownerID: 'Max'
      },
      {
        licenseID: 'asset5',
        appID: 'app3',
        licenseDetails: 'fair use',
        creatorID: 'Adriana',
        ownerID: 'Adriana'
      },
      {
        licenseID: 'asset6',
        appID: 'app3',
        licenseDetails: 'AGPL',
        creatorID: 'Michel',
        ownerID: 'Michel'
      }
    ];

    for (const asset of assets) {
      await this.CreateAsset(
        ctx,
        asset.licenseID,
        asset.appID,
        asset.licenseDetails,
        asset.creatorID,
        asset.ownerID
      );
    }
  }

  // put client's expected price into their private collection
  async AgreeToTransfer(ctx, licenseID, price) {
    try {
      // Get ID of submitting client identity
      // const clientID = getSubmittingClientIdentity(ctx);
      // const transientMap = ctx.stub.getTransient();
      // const valueJSONasBytes = transientMap["asset_value"];
      const assetPrivateDetails = {
        licenseID: licenseID,
        price: price,
      }
      const orgCollection = await getCollectionName(ctx);
      // check if asset already exists
      const assetAsBytes = await ctx.stub.getPrivateData(orgCollection, licenseID);
      if (assetAsBytes) {
        throw new Error("There's already a transfer agreement existed for this license");
      }
      
      await verifyClientOrgMatchesPeerOrg(ctx);
      ctx.stub.putPrivateData(orgCollection, licenseID, assetPrivateDetails);
    }
    catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  // async TransferAsset(ctx) {
  //   const transientMap = ctx.stub.getTransient();
  // }
}

module.exports = Chaincode;
