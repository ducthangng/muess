import { v4 as uuidv4 } from 'uuid';
import {
  AcceptProposalDto,
  CreateAppDto,
  CreateProposalDto
} from '@/dtos/hlf.dto';

import { initContract } from '@/utils/hlfUtils';

class HLFService {
  public async createApp(appData: CreateAppDto) {
    const contract = await initContract();
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
      `Transaction has successfully created, result is: ${result.toString()}`
    );
    return result.toString();
  }

  public async createProposal(proposalData: CreateProposalDto) {
    try {
      const contract = await initContract();
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

  public async acceptProposal(acceptProposalData: AcceptProposalDto) {
    const contract = await initContract();
    const { creatorId, proposalId } = acceptProposalData;
    const licenseId = uuidv4();
    const result = await contract.submitTransaction(
      'AcceptProposal',
      proposalId,
      licenseId,
      creatorId,
      proposalId
    );
    console.log(
      `Transaction has successfully created, result is: ${result.toString()}`
    );
    return result.toString();
  }

  public async getAppsByCreatorId(creatorId: string) {
    const contract = await initContract();
    const result = await contract.evaluateTransaction(
      'QueryAppsByCreatorId',
      creatorId
    );
    console.log(
      `Transaction has successfully created, result is: ${result.toString()}`
    );
    return JSON.parse(result.toString());
  }

  public async getProposalsByAppId(appId: string) {
    const contract = await initContract();
    const result = await contract.evaluateTransaction(
      'QueryProposalsByAppId',
      appId
    );
    console.log(
      `Transaction has successfully created, result is: ${result.toString()}`
    );
    return JSON.parse(result.toString());
  }

  public async getProposalsByBuyerId(buyerId: string) {
    const contract = await initContract();
    const result = await contract.evaluateTransaction(
      'QueryProposalsByBuyerId',
      buyerId
    );
    console.log(
      `Transaction has successfully created, result is: ${result.toString()}`
    );
    return JSON.parse(result.toString());
  }
}

export default HLFService;
