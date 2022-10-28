/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
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
// peer chaincode query -C CHANNEL_NAME -n asset_transfer -c '{"Args":["QueryAssetsByOwner","Tom"]}' output issue
// peer chaincode query -C CHANNEL_NAME -n asset_transfer -c '{"Args":["QueryAssets","{\"selector\":{\"owner\":\"Tom\"}}"]}'

// Rich Query with Pagination (Only supported if CouchDB is used as state database):
// peer chaincode query -C CHANNEL_NAME -n asset_transfer -c '{"Args":["QueryAssetsWithPagination","{\"selector\":{\"owner\":\"Tom\"}}","3",""]}'

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
// index which you can find in META-INF/statedb/couchdb/indexes/indexOwner.json.
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

// Index for docType, owner.
//
// Example curl command line to define index in the CouchDB channel_chaincode database
// curl -i -X POST -H "Content-Type: application/json" -d "{\"index\":{\"fields\":[\"docType\",\"owner\"]},\"name\":\"indexOwner\",\"ddoc\":\"indexOwnerDoc\",\"type\":\"json\"}" http://hostname:port/myc1_assets/_index
//

// Index for docType, owner, size (descending order).
//
// Example curl command line to define index in the CouchDB channel_chaincode database
// curl -i -X POST -H "Content-Type: application/json" -d "{\"index\":{\"fields\":[{\"size\":\"desc\"},{\"docType\":\"desc\"},{\"owner\":\"desc\"}]},\"ddoc\":\"indexSizeSortDoc\", \"name\":\"indexSizeSortDesc\",\"type\":\"json\"}" http://hostname:port/myc1_assets/_index

// Rich Query with index design doc and index name specified (Only supported if CouchDB is used as state database):
//   peer chaincode query -C CHANNEL_NAME -n ledger -c '{"Args":["QueryAssets","{\"selector\":{\"docType\":\"asset\",\"owner\":\"Tom\"}, \"use_index\":[\"_design/indexOwnerDoc\", \"indexOwner\"]}"]}'

// Rich Query with index design doc specified only (Only supported if CouchDB is used as state database):
//   peer chaincode query -C CHANNEL_NAME -n ledger -c '{"Args":["QueryAssets","{\"selector\":{\"docType\":{\"$eq\":\"asset\"},\"owner\":{\"$eq\":\"Tom\"},\"size\":{\"$gt\":0}},\"fields\":[\"docType\",\"owner\",\"size\"],\"sort\":[{\"size\":\"desc\"}],\"use_index\":\"_design/indexSizeSortDoc\"}"]}'

"use strict";

const { Contract } = require("fabric-contract-api");

class Chaincode extends Contract {
  // CreateProposal - create a new proposal, store into chaincode state
  async CreateProposal(
    ctx,
    assetID,
    appID,
    proposedPrice,
    licenseDetails
  ) {
    const exists = await this.AssetExists(ctx, assetID);
    if (exists) {
      throw new Error(`The asset ${assetID} already exists`);
    }

    const clientID = ctx.clientIdentity.getID();

    // ==== Create asset object and marshal to JSON ====
    let asset = {
      assetType: "proposal",
      assetID: assetID,
      appID: appID,
      buyerID: clientID,
      proposedPrice: proposedPrice,
      licenseDetails: licenseDetails,
    };

    // === Save asset to state ===
    await ctx.stub.putState(assetID, Buffer.from(JSON.stringify(asset)));
  }

  async AcceptProposal(ctx, assetID, proposalID) {

    const clientID = ctx.clientIdentity.getID();

    const proposalBytes = await ctx.stub.getState(proposalID);
    if (!proposalBytes) {
      throw new Error("No such proposal exists");
    }

    const proposal = JSON.parse(proposalBytes.toString());
    if (!proposal) {
      throw new Error("Can't JSON parse proposalBytes");
    }

    let asset = {
      assetType: "license",
      assetID: assetID,
      appID: proposal.appID,
      licenseDetails: proposal.licenseDetails,
      creatorID: clientID,
      ownerID: proposal.buyerID,
    };

    await ctx.stub.putState(assetID, Buffer.from(JSON.stringify(asset)));
    await this.DeleteAsset(ctx, proposalID);
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
      throw new Error("Asset name must not be empty");
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

  // QueryAssetsByOwner queries for assets based on a passed in owner.
  // This is an example of a parameterized query where the query logic is baked into the chaincode,
  // and accepting a single query parameter (owner).
  // Only available on state databases that support rich query (e.g. CouchDB)
  // Example: Parameterized rich query

  async QueryProposalsByAppID(ctx, appID) {
    let queryString = {};
    queryString.selector = {};
    queryString.selector.assetType = "proposal";
    queryString.selector.appID = appID;
    return await this.GetQueryResultForQueryString(
      ctx,
      JSON.stringify(queryString)
    ); //shim.success(queryResults);
  }
  async QueryProposalsByBuyerID(ctx, buyerID) {
    let queryString = {};
    queryString.selector = {};
    queryString.selector.assetType = "proposal";
    queryString.selector.buyerID = buyerID;
    return await this.GetQueryResultForQueryString(
      ctx,
      JSON.stringify(queryString)
    ); //shim.success(queryResults);
  }
  async QueryLicensesByAppID(ctx, appID) {
    let queryString = {};
    queryString.selector = {};
    queryString.selector.assetType = "license";
    queryString.selector.appID = appID;
    return await this.GetQueryResultForQueryString(
      ctx,
      JSON.stringify(queryString)
    ); //shim.success(queryResults);
  }
  async QueryLicensesByOwnerID(ctx, ownerID) {
    let queryString = {};
    queryString.selector = {};
    queryString.selector.assetType = "license";
    queryString.selector.ownerID = ownerID;
    return await this.GetQueryResultForQueryString(
      ctx,
      JSON.stringify(queryString)
    ); //shim.success(queryResults);
  }
  async QueryLicensesByCreatorID(ctx, creatorID) {
    let queryString = {};
    queryString.selector = {};
    queryString.selector.assetType = "license";
    queryString.selector.creatorID = creatorID;
    return await this.GetQueryResultForQueryString(
      ctx,
      JSON.stringify(queryString)
    ); //shim.success(queryResults);
  }

  // Example: Ad hoc rich query
  // QueryAssets uses a query string to perform a query for assets.
  // Query string matching state database syntax is passed in and executed as is.
  // Supports ad hoc queries that can be defined at runtime by the client.
  // If this is not desired, follow the QueryAssetsForOwner example for parameterized queries.
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
  // If this is not desired, follow the QueryAssetsForOwner example for parameterized queries.
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
        console.log(res.value.value.toString("utf8"));
        if (isHistory && isHistory === true) {
          jsonRes.TxId = res.value.txId;
          jsonRes.Timestamp = res.value.timestamp;
          try {
            jsonRes.Value = JSON.parse(res.value.value.toString("utf8"));
          } catch (err) {
            console.log(err);
            jsonRes.Value = res.value.value.toString("utf8");
          }
        } else {
          jsonRes.Key = res.value.key;
          try {
            jsonRes.Record = JSON.parse(res.value.value.toString("utf8"));
          } catch (err) {
            console.log(err);
            jsonRes.Record = res.value.value.toString("utf8");
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
  //   async InitLedger(ctx) {
  //     const assets = [
  //       {
  //         assetID: "asset1",
  //         color: "blue",
  //         size: 5,
  //         owner: "Tom",
  //         appraisedValue: 100,
  //       },
  //       {
  //         assetID: "asset2",
  //         color: "red",
  //         size: 5,
  //         owner: "Brad",
  //         appraisedValue: 100,
  //       },
  //       {
  //         assetID: "asset3",
  //         color: "green",
  //         size: 10,
  //         owner: "Jin Soo",
  //         appraisedValue: 200,
  //       },
  //       {
  //         assetID: "asset4",
  //         color: "yellow",
  //         size: 10,
  //         owner: "Max",
  //         appraisedValue: 200,
  //       },
  //       {
  //         assetID: "asset5",
  //         color: "black",
  //         size: 15,
  //         owner: "Adriana",
  //         appraisedValue: 250,
  //       },
  //       {
  //         assetID: "asset6",
  //         color: "white",
  //         size: 15,
  //         owner: "Michel",
  //         appraisedValue: 250,
  //       },
  //     ];

  //     for (const asset of assets) {
  //       await this.CreateAsset(
  //         ctx,
  //         asset.assetID,
  //         asset.color,
  //         asset.size,
  //         asset.owner,
  //         asset.appraisedValue
  //       );
  //     }
  //   }
}

module.exports = Chaincode;
