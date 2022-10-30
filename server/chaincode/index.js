/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const CC = require('./lib/app_chaincode.js');

module.exports.CC = CC;
module.exports.contracts = [CC];
