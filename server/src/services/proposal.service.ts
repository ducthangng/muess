import { v4 as uuidv4 } from 'uuid';
import {
  AcceptProposalDto,
  CreateAppDto,
  CreateProposalDto
} from '@/dtos/hlf.dto';

import { initContract } from '@/utils/hlfUtils';
import { X509Identity } from 'fabric-network';
import { User } from '@/interfaces/users.interface';
import { App } from '../interfaces/apps.interface';

const sampleProposal: CreateProposalDto[] = [
  {
    appId: '1',
    proposedPrice: 100,
    licenseDetails: '1'
  },
  {
    appId: '2',
    proposedPrice: 200,
    licenseDetails: '2'
  },
  {
    appId: '3',
    proposedPrice: 300,
    licenseDetails: '3'
  },
  {
    appId: '3',
    proposedPrice: 300,
    licenseDetails: '3'
  },
  {
    appId: '3',
    proposedPrice: 300,
    licenseDetails: '3'
  }
];

class ProposalService {
  public async createProposal(user: User, proposalData: CreateProposalDto) {
    try {
      console.log('inside createProposal service');
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
      console.log(
        `Transaction has successfully created, result is: ${result.toString()}`
      );
      return result;
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
    console.log(
      `Transaction has successfully created, result is: ${result.toString()}`
    );
    return result.toString();
  }

  public async rejectProposal(
    user: User,
    rejectProposalData: AcceptProposalDto
  ) {
    const contract = await initContract(JSON.parse(user.x509Identity));
    const { proposalId } = rejectProposalData;
    const result = await contract.submitTransaction(
      'AcceptProposal',
      proposalId
    );
    console.log(
      `Transaction has successfully created, result is: ${result.toString()}`
    );
    return result.toString();
  }

  public async getProposalsByAppId(user: User, appId: string) {
    const contract = await initContract(JSON.parse(user.x509Identity));
    const result = await contract.evaluateTransaction(
      'QueryProposalsByAppId',
      appId
    );
    console.log(
      `Transaction has successfully created, result is: ${result.toString()}`
    );
    return JSON.parse(result.toString());
  }

  public async getProposalsBySellerId(user: User, buyerId: string) {
    const contract = await initContract(JSON.parse(user.x509Identity));
    const result = await contract.evaluateTransaction(
      'QueryProposalsByBuyerId',
      buyerId
    );
    console.log(
      `Transaction has successfully created, result is: ${result.toString()}`
    );
    return JSON.parse(result.toString());
  }

  public async getProposalsByBuyerId(user: User, sellerId: string) {
    return sampleProposal;
  }
}

export default ProposalService;
