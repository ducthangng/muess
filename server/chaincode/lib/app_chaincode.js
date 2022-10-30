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

const { Contract } = require('fabric-contract-api');

class Chaincode extends Contract {
  async CreateApp(
    ctx,
    assetId,
    title,
    description,
    rating,
    appType,
    paymentMethod,
    appTags,
    appCategories,
    appIconURL
  ) {
    const exists = await this.AssetExists(ctx, assetId);
    if (exists) {
      throw new Error(`The assetId ${assetId} already exists`);
    }

    const clientId = ctx.clientIdentity.getID();

    // ==== Create asset object and marshal to JSON ====
    let asset = {
      assetType: 'app',
      assetId: assetId,
      title: title,
      creatorId: clientId,
      description: description,
      rating: rating,
      appType: appType,
      paymentMethod: paymentMethod,
      appTags: appTags.split(','),
      appCategories: appCategories.split(','),
      appIconURL: appIconURL
    };

    // === Save asset to state ===
    await ctx.stub.putState(assetId, Buffer.from(JSON.stringify(asset)));
  }

  // CreateProposal - create a new proposal, store into chaincode state
  async CreateProposal(ctx, assetId, appId, proposedPrice, licenseDetails) {
    const assetIdExists = await this.AssetExists(ctx, assetId);
    if (assetIdExists) {
      throw new Error(
        `The assetId ${assetId} already exists, find another one for the proposal`
      );
    }

    const appBytes = await ctx.stub.getState(appId);
    if (!appBytes) {
      throw new Error(`There is no app with assetId ${appId} exists`);
    }

    const app = JSON.parse(appBytes.toString());
    if (!app) {
      throw new Error("Can't JSON parse appBytes");
    }

    const clientId = ctx.clientIdentity.getID();

    // ==== Create asset object and marshal to JSON ====
    let asset = {
      assetType: 'proposal',
      assetId: assetId,
      appId: appId,
      buyerId: clientId,
      sellerId: app.creatorId,
      proposedPrice: proposedPrice,
      licenseDetails: licenseDetails,
      status: 'pending'
    };

    // === Save asset to state ===
    await ctx.stub.putState(assetId, Buffer.from(JSON.stringify(asset)));
  }

  async AcceptProposal(ctx, assetId, proposalId) {

    const proposalBytes = await ctx.stub.getState(proposalId);
    if (!proposalBytes) {
      throw new Error('No such proposal exists');
    }

    const proposal = JSON.parse(proposalBytes.toString());
    if (!proposal) {
      throw new Error("Can't JSON parse proposalBytes");
    }

    const clientId = ctx.clientIdentity.getID();
    if (clientId != proposal.sellerId) {
      throw new Error("You must be the owner to accept this proposal.");
    }

    // create new asset
    let asset = {
      assetType: 'license',
      assetId: assetId,
      appId: proposal.appId,
      licenseDetails: proposal.licenseDetails,
      creatorId: proposal.sellerId,
      ownerId: proposal.buyerId
    };
    await ctx.stub.putState(assetId, Buffer.from(JSON.stringify(asset)));

    // set proposal status to "accepted"
    proposal.status = 'accepted';
    await ctx.stub.putState(
      proposal.assetId,
      Buffer.from(JSON.stringify(proposal))
    );
  }

  async RejectProposal(ctx, proposalId) {
    const proposalBytes = await ctx.stub.getState(proposalId);
    if (!proposalBytes) {
      throw new Error('No such proposal exists');
    }

    const proposal = JSON.parse(proposalBytes.toString());
    if (!proposal) {
      throw new Error("Can't JSON parse proposalBytes");
    }

    // set proposal status to "rejected"
    proposal.status = 'rejected';
    await ctx.stub.putState(
      proposal.assetId,
      Buffer.from(JSON.stringify(proposal))
    );
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
  // async DeleteAsset(ctx, id) {
  //   if (!id) {
  //     throw new Error('Asset name must not be empty');
  //   }

  //   let exists = await this.AssetExists(ctx, id);
  //   if (!exists) {
  //     throw new Error(`Asset ${id} does not exist`);
  //   }

  //   let valAsbytes = await ctx.stub.getState(id); // get the asset from chaincode state
  //   let jsonResp = {};
  //   if (!valAsbytes) {
  //     jsonResp.error = `Asset does not exist: ${id}`;
  //     throw new Error(jsonResp);
  //   }
  //   let assetJSON;
  //   try {
  //     assetJSON = JSON.parse(valAsbytes.toString());
  //   } catch (err) {
  //     jsonResp = {};
  //     jsonResp.error = `Failed to decode JSON of: ${id}`;
  //     throw new Error(jsonResp);
  //   }
  //   await ctx.stub.deleteState(id); //remove the asset from chaincode state
  // }

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

  // Queries for Apps
  async GetAllApps(ctx) {
    let queryString = {};
    queryString.selector = {};
    queryString.selector.assetType = 'app';
    return await this.GetQueryResultForQueryString(
      ctx,
      JSON.stringify(queryString)
    );
  }
  async QueryAppsByCreatorId(ctx, creatorId) {
    let queryString = {};
    queryString.selector = {};
    queryString.selector.assetType = 'app';
    queryString.selector.creatorId = creatorId;
    return await this.GetQueryResultForQueryString(
      ctx,
      JSON.stringify(queryString)
    );
  }

  // Queries for Proposals
  async QueryProposalsByAppId(ctx, appId) {
    let queryString = {};
    queryString.selector = {};
    queryString.selector.assetType = 'proposal';
    queryString.selector.appId = appId;
    return await this.GetQueryResultForQueryString(
      ctx,
      JSON.stringify(queryString)
    );
  }
  async QueryProposalsByBuyerId(ctx, buyerId) {
    let queryString = {};
    queryString.selector = {};
    queryString.selector.assetType = 'proposal';
    queryString.selector.buyerId = buyerId;
    return await this.GetQueryResultForQueryString(
      ctx,
      JSON.stringify(queryString)
    );
  }
  async QueryProposalsBySellerId(ctx, sellerId) {
    let queryString = {};
    queryString.selector = {};
    queryString.selector.assetType = 'proposal';
    queryString.selector.sellerId = sellerId;
    return await this.GetQueryResultForQueryString(
      ctx,
      JSON.stringify(queryString)
    );
  }

  // Queries for Licenses
  async QueryLicensesByAppId(ctx, appId) {
    let queryString = {};
    queryString.selector = {};
    queryString.selector.assetType = 'license';
    queryString.selector.appId = appId;
    return await this.GetQueryResultForQueryString(
      ctx,
      JSON.stringify(queryString)
    );
  }
  async QueryLicensesByOwnerId(ctx, ownerId) {
    let queryString = {};
    queryString.selector = {};
    queryString.selector.assetType = 'license';
    queryString.selector.ownerId = ownerId;
    return await this.GetQueryResultForQueryString(
      ctx,
      JSON.stringify(queryString)
    );
  }
  async QueryLicensesByCreatorId(ctx, creatorId) {
    let queryString = {};
    queryString.selector = {};
    queryString.selector.assetType = 'license';
    queryString.selector.creatorId = creatorId;
    return await this.GetQueryResultForQueryString(
      ctx,
      JSON.stringify(queryString)
    );
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

  // AssetExists returns true when asset with given Id exists in world state
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

  async GetClientIdentity(ctx) {
    const clientId = ctx.clientIdentity.getID();

    return clientId;
  }
}

module.exports = Chaincode;
