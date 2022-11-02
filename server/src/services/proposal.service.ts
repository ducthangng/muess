import { v4 as uuidv4 } from 'uuid';

import { initContract } from '@/utils/hlfUtils';
import { X509Identity } from 'fabric-network';
import { User } from '@/interfaces/users.interface';
import { App } from '../interfaces/apps.interface';
import { Proposal } from '@/interfaces/hlf.interface';
import { AcceptProposalDto, CreateProposalDto } from '@/dtos/proposal.dto';
import { ChaincodeProposal } from '../interfaces/hlf.interface';
import mongoose from 'mongoose';
import proposalModel from '../models/proposal.models';

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
    try {
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

      const chaincodeProposal: ChaincodeProposal = JSON.parse(
        result.toString()
      );

      const mresult = await this.proposals.create({
        assetType: 'proposal',
        assetId: proposalId,
        appId: proposalData.appId,
        buyerId: user._id,
        sellerId: '',
        proposedPrice: proposalData.proposedPrice,
        licenseDetails: proposalData.licenseDetails,
        status: 'pending'
      });

      console.log(mresult);

      return result.toString();
    } catch (error) {
      console.log(error);
      throw new Error('Submit Transaction Failed');
    }
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
    const contract = await initContract(JSON.parse(user.x509Identity));
    const result = await contract.evaluateTransaction(
      'QueryProposalsByAppId',
      appId
    );
    console.log(`Transaction has successfully created`);
    return JSON.parse(result.toString());
  }

  public async getProposalsByBuyerId(user: User, buyerId: string) {
    const contract = await initContract(JSON.parse(user.x509Identity));
    const result = await contract.evaluateTransaction(
      'QueryProposalsByBuyerId',
      buyerId
    );
    console.log(`Transaction has successfully created`);
    return JSON.parse(result.toString());
  }

  public async getProposalsBySellerId(user: User, sellerId: string) {
    const contract = await initContract(JSON.parse(user.x509Identity));
    const result = await contract.evaluateTransaction(
      'QueryProposalsBySellerId',
      sellerId
    );
    console.log(`Transaction has successfully created`);
    return JSON.parse(result.toString());
  }
}

export default proposalService;
