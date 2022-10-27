import * as grpc from '@grpc/grpc-js';
import {
  connect,
  Contract,
  Identity,
  Signer,
  signers
} from '@hyperledger/fabric-gateway';
import * as crypto from 'crypto';
import { promises as fs } from 'fs';
import * as path from 'path';
import { TextDecoder } from 'util';
import { Gateway } from '../../node_modules/@hyperledger/fabric-gateway/dist/gateway.d';
import { Network } from '../../node_modules/@hyperledger/fabric-gateway/dist/network.d';

const channelName = envOrDefault('CHANNEL_NAME', 'munich');
const chaincodeName = envOrDefault('CHAINCODE_NAME', 'basic');
const mspId = envOrDefault('MSP_ID', 'Org1MSP');

// Path to crypto materials.
const cryptoPath = envOrDefault(
  'CRYPTO_PATH',
  path.resolve(
    __dirname,
    '..',
    '..',
    'test-network',
    'organizations',
    'peerOrganizations',
    'org1.example.com'
  )
);

// Path to user private key directory.
const keyDirectoryPath = envOrDefault(
  'KEY_DIRECTORY_PATH',
  path.resolve(cryptoPath, 'users', 'User1@org1.example.com', 'msp', 'keystore')
);

// Path to user certificate.
const certPath = envOrDefault(
  'CERT_PATH',
  path.resolve(
    cryptoPath,
    'users',
    'User1@org1.example.com',
    'msp',
    'signcerts',
    'cert.pem'
  )
);

// Path to peer tls certificate.
const tlsCertPath = envOrDefault(
  'TLS_CERT_PATH',
  path.resolve(cryptoPath, 'peers', 'peer0.org1.example.com', 'tls', 'ca.crt')
);

// Gateway peer endpoint.
const peerEndpoint = envOrDefault('PEER_ENDPOINT', 'localhost:7051');

// Gateway peer SSL host name override.
const peerHostAlias = envOrDefault('PEER_HOST_ALIAS', 'peer0.org1.example.com');

/**
 * envOrDefault() will return the value of an environment variable, or a default value if the variable is undefined.
 */
function envOrDefault(key: string, defaultValue: string): string {
  return process.env[key] || defaultValue;
}

// export const myNetwork = Promise.resolve(initHyperledgerFabric()).then();
export type MyGateway = {
  network: Network;
  gateway: Gateway;
  client: grpc.Client;
};

export const singletoninitHyperledgerFabric = (function () {
  let instance: MyGateway;
  async function init(): Promise<MyGateway> {
    await displayInputParameters();

    // The gRPC client connection should be shared by all Gateway connections to this endpoint.
    const client = await newGrpcConnection();

    const gateway = connect({
      client,
      identity: await newIdentity(),
      signer: await newSigner(),
      // Default timeouts for different gRPC calls
      evaluateOptions: () => {
        return { deadline: Date.now() + 5000 }; // 5 seconds
      },
      endorseOptions: () => {
        return { deadline: Date.now() + 15000 }; // 15 seconds
      },
      submitOptions: () => {
        return { deadline: Date.now() + 5000 }; // 5 seconds
      },
      commitStatusOptions: () => {
        return { deadline: Date.now() + 60000 }; // 1 minute
      }
    });

    let resulNetwork: Network;
    let resultContract: Contract;

    try {
      resulNetwork = gateway.getNetwork(channelName);

      // Get the smart contract from the network.
      resultContract = resulNetwork.getContract(chaincodeName);

      // Initialize a set of asset data on the ledger using the chaincode 'InitLedger' function.
      await initLedger(resultContract);
    } catch (e) {
      console.error(e);
    }

    return { network: resulNetwork, gateway: gateway, client: client };
  }

  return {
    getInstance: async function () {
      if (!instance) {
        instance = await init();
      }
      return instance;
    }
  };
})();

export async function getSingleton(): Promise<MyGateway> {
  const data: MyGateway = await singletoninitHyperledgerFabric
    .getInstance()
    .then((res) => {
      return res;
    });

  return data;
  // console.log('network app: ', data.network);
  // console.log('gateway app: ', data.gateway);
  // console.log('client app: ', data.client);
}

async function newGrpcConnection(): Promise<grpc.Client> {
  console.log('tls: ', tlsCertPath);
  const tlsRootCert = await fs.readFile(tlsCertPath);
  const tlsCredentials = grpc.credentials.createSsl(tlsRootCert);
  return new grpc.Client(peerEndpoint, tlsCredentials, {
    'grpc.ssl_target_name_override': peerHostAlias
  });
}

async function newIdentity(): Promise<Identity> {
  const credentials = await fs.readFile(certPath);
  return { mspId, credentials };
}

async function newSigner(): Promise<Signer> {
  const files = await fs.readdir(keyDirectoryPath);
  const keyPath = path.resolve(keyDirectoryPath, files[0]);
  const privateKeyPem = await fs.readFile(keyPath);
  const privateKey = crypto.createPrivateKey(privateKeyPem);
  return signers.newPrivateKeySigner(privateKey);
}

/**
 * This type of transaction would typically only be run once by an application the first time it was started after its
 * initial deployment. A new version of the chaincode deployed later would likely not need to run an "init" function.
 */
async function initLedger(contract: Contract): Promise<void> {
  console.log(
    '\n--> Submit Transaction: InitLedger, function creates the initial set of assets on the ledger'
  );

  await contract.submitTransaction('InitLedger');

  console.log('*** Transaction committed successfully');
}

/**
 * displayInputParameters() will print the global scope parameters used by the main driver routine.
 */
async function displayInputParameters(): Promise<void> {
  console.log(`dirname:           ${cryptoPath}`);
  console.log(`channelName:       ${channelName}`);
  console.log(`chaincodeName:     ${chaincodeName}`);
  console.log(`mspId:             ${mspId}`);
  console.log(`cryptoPath:        ${cryptoPath}`);
  console.log(`keyDirectoryPath:  ${keyDirectoryPath}`);
  console.log(`certPath:          ${certPath}`);
  console.log(`tlsCertPath:       ${tlsCertPath}`);
  console.log(`peerEndpoint:      ${peerEndpoint}`);
  console.log(`peerHostAlias:     ${peerHostAlias}`);
}
