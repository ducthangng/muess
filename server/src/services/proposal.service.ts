import { v4 as uuidv4 } from 'uuid';

import { initContract } from '@/utils/hlfUtils';
import { X509Identity } from 'fabric-network';
import { User } from '@/interfaces/users.interface';
import { App } from '../interfaces/apps.interface';
import { Proposal } from '@/interfaces/hlf.interface';
import proposalModel from '../models/proposal.models';
import { ChaincodeProposal } from '../interfaces/hlf.interface';
import {
  CreateProposalDto,
  CreateSecondhandProposalDto,
  AcceptProposalDto
} from '@/dtos/proposal.dto';

const sampleProposal: Proposal[] = [
  {
    assetType: 'proposal',
    assetId: '1',
    appId: '1',
    buyerId: '1',
    sellerId: '2',
    proposedPrice: 100,
    licenseDetails: 'test',
    status: 'pending'
  },
  {
    assetType: 'proposal',
    assetId: '2',
    appId: '1',
    buyerId: '1',
    sellerId: '2',
    proposedPrice: 220,
    licenseDetails: 'test',
    status: 'accepted'
  },
  {
    assetType: 'proposal',
    assetId: '3',
    appId: '1',
    buyerId: '1',
    sellerId: '2',
    proposedPrice: 1,
    licenseDetails: 'test',
    status: 'rejected'
  }
];

const sampleProposal2: Proposal[] = [
  {
    assetType: 'proposal',
    assetId: '1',
    appId: '1',
    buyerId: '1',
    sellerId: '2',
    proposedPrice: 5000,
    licenseDetails: 'test',
    status: 'pending'
  },
  {
    assetType: 'proposal',
    assetId: '2',
    appId: '1',
    buyerId: '1',
    sellerId: '2',
    proposedPrice: 120,
    licenseDetails: 'test',
    status: 'accepted'
  },
  {
    assetType: 'proposal',
    assetId: '3',
    appId: '1',
    buyerId: '1',
    sellerId: '2',
    proposedPrice: 150,
    licenseDetails: 'test',
    status: 'accepted'
  }
];

class proposalService {
  public proposals = proposalModel;

  public async createProposal(user: User, proposalData: CreateProposalDto) {
    const contract = await initContract(JSON.parse(user.x509Identity));
    const { appId, proposedPrice, licenseDetails } = proposalData;
    const proposalId = uuidv4();

    const proposedPriceString = proposedPrice.toString();

    const result = await contract.submitTransaction(
      'CreateProposal',
      proposalId,
      appId,
      proposedPriceString,
      licenseDetails
    );

    const chaincodeProposal = JSON.parse(result.toString());

    console.log('chaincode key: ', chaincodeProposal.Key);
    console.log('chaincode record: ', chaincodeProposal.Record);
    console.log('chaincode: ', chaincodeProposal);

    const mongoResult = await this.proposals.create({
      assetType: 'proposal',
      assetId: proposalId,
      appId,
      buyerId: chaincodeProposal.buyerId,
      sellerId: chaincodeProposal.sellerId,
      proposedPrice,
      licenseDetails,
      status: 'pending'
    });

    console.log('result: ', mongoResult);

    console.log(
      `Transaction has successfully created, result is: ${result.toString()}`
    );
    return result.toString();
  }

  public async createSecondhandProposal(
    user: User,
    proposalData: CreateSecondhandProposalDto
  ) {
    const contract = await initContract(JSON.parse(user.x509Identity));
    const { licenseId, proposedPrice } = proposalData;
    const proposalId = uuidv4();

    const proposedPriceString = proposedPrice.toString();

    const result = await contract.submitTransaction(
      'CreateSecondhandProposal',
      proposalId,
      licenseId,
      proposedPriceString
    );
    console.log(
      `Transaction has successfully created, result is: ${result.toString()}`
    );
    return result.toString();
  }

  public async acceptProposal(
    user: User,
    acceptProposalData: AcceptProposalDto
  ) {
    const contract = await initContract(JSON.parse(user.x509Identity));
    const { proposalId } = acceptProposalData;
    const licenseId = uuidv4();
    const result = await contract.submitTransaction(
      'AcceptProposal',
      licenseId,
      proposalId
    );

    const updateProposal = await this.proposals.findOneAndUpdate(
      { assetId: proposalId },
      { status: 'accepted' }
    );

    console.log('accepted proposals: ', updateProposal);

    console.log(`Transaction has successfully created,  `);
    return result.toString();
  }

  public async rejectProposal(
    user: User,
    rejectProposalData: AcceptProposalDto
  ) {
    const contract = await initContract(JSON.parse(user.x509Identity));
    const { proposalId } = rejectProposalData;
    const result = await contract.submitTransaction(
      'RejectProposal',
      proposalId
    );
    const updateProposal = await this.proposals.findOneAndUpdate(
      { assetId: proposalId },
      { status: 'rejected' }
    );

    console.log('rejected proposals: ', updateProposal);

    console.log(`Transaction has successfully created`);
    return result.toString();
  }

  public async getProposalsByAppId(user: User, appId: string) {
    // const contract = await initContract(JSON.parse(user.x509Identity));
    // const result = await contract.evaluateTransaction(
    //   'QueryProposalsByAppId',
    //   appId
    // );

    const result: Proposal[] = await this.proposals.find({ appId });

    console.log(`Transaction has successfully created`);
    return result;
  }

  public async getProposalsByBuyerId(user: User, buyerId: string) {
    const result: Proposal[] = await this.proposals.find({ buyerId });
    // const contract = await initContract(JSON.parse(user.x509Identity));
    // const result = await contract.evaluateTransaction(
    //   'QueryProposalsByBuyerId',
    //   buyerId
    // );
    console.log(`Transaction has successfully created`);
    return result;
  }

  public async getProposalsBySellerId(user: User, sellerId: string) {
    const result: Proposal[] = await this.proposals.find({ sellerId });
    // const contract = await initContract(JSON.parse(user.x509Identity));
    // const result = await contract.evaluateTransaction(
    //   'QueryProposalsBySellerId',
    //   sellerId
    // );
    console.log(`Transaction has successfully created`);
    return result;
  }
}

export default proposalService;
