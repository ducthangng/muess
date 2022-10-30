import { v4 as uuidv4 } from 'uuid';
import {
  AcceptProposalDto,
  CreateAppDto,
  CreateProposalDto
} from '@/dtos/hlf.dto';

import { initContract } from '@/utils/hlfUtils';
import { X509Identity } from 'fabric-network';
import { User } from '@/interfaces/users.interface';
import { Proposal } from '@/interfaces/hlf.interface';

class HLFService {
  public async createApp(user: User, appData: CreateAppDto) {
    const contract = await initContract(JSON.parse(user.x509Identity));
    const {
      title,
      description,
      rating,
      appType,
      paymentMethod,
      appTags,
      appIconURL
    } = appData;
    const appId = uuidv4();
    const result = await contract.submitTransaction(
      'CreateApp',
      appId,
      title,
      description,
      rating,
      appType,
      paymentMethod,
      appTags.toString(),
      appIconURL
    );
    console.log(
      `Transaction has successfully submitted, result is: ${result.toString()}`
    );
    return result.toString();
  }

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
      console.log(
        `Transaction has successfully submitted, result is: ${result.toString()}`
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
      `Transaction has successfully submitted, result is: ${result.toString()}`
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
      'RejectProposal',
      proposalId
    );
    console.log(
      `Transaction has successfully submitted, result is: ${result.toString()}`
    );
    return result.toString();
  }

  public async getAppsByCreatorId(user: User, creatorId: string) {
    const contract = await initContract(JSON.parse(user.x509Identity));
    const decodedCreatorId = decodeURIComponent(creatorId);
    const result = await contract.evaluateTransaction(
      'QueryAppsByCreatorId',
      decodedCreatorId
    );
    console.log(
      `Transaction has successfully submitted, result is: ${result.toString()}`
    );
    return JSON.parse(result.toString());
  }

  public async getProposalsByAppId(user: User, appId: string) {
    const contract = await initContract(JSON.parse(user.x509Identity));
    const result = await contract.evaluateTransaction(
      'QueryProposalsByAppId',
      appId
    );
    console.log(
      `Transaction has successfully submitted, result is: ${result.toString()}`
    );
    return JSON.parse(result.toString());
  }

  public async getProposalsByBuyerId(user: User, buyerId: string) {
    const contract = await initContract(JSON.parse(user.x509Identity));
    const result = await contract.evaluateTransaction(
      'QueryProposalsByBuyerId',
      buyerId
    );
    console.log(
      `Transaction has successfully submitted, result is: ${result.toString()}`
    );
    return JSON.parse(result.toString());
  }

  public async getAssetHistory(): Promise<Proposal[]> {
    const mockResult: Proposal[] = [
      {
        assetType: 'proposal',
        assetId: 'proposal1',
        appId: 'app1',
        buyerId: 'johnsmith',
        sellerId: 'sarahbrown',
        proposedPrice: 100,
        licenseDetails: 'copyleft',
        status: 'accepted'
      },
      {
        assetType: 'proposal',
        assetId: 'proposal2',
        appId: 'app2',
        buyerId: 'johnsmith',
        sellerId: 'sarahbrown',
        proposedPrice: 120,
        licenseDetails: 'copyleft',
        status: 'accepted'
      },
      {
        assetType: 'proposal',
        assetId: 'proposal3',
        appId: 'app3',
        buyerId: 'johnsmith',
        sellerId: 'sarahbrown',
        proposedPrice: 270,
        licenseDetails: 'copyleft',
        status: 'accepted'
      }
    ];

    return mockResult;
  }

  public async getProposalsByBuyerID(buyerId: string) {
    return 'hello';
  }

  public async denyProposal(proposalId: string) {
    return 'hello';
  }
}

export default HLFService;
