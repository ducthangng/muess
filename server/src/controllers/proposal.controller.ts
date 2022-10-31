import { NextFunction, Request, Response } from 'express';
import HLFService from '@/services/proposal.service';
import { User } from '@/interfaces/users.interface';
import { RequestWithUser } from '@/interfaces/auth.interface';
import ProposalService from '../services/proposal.service';
import {
  AcceptProposalDto,
  CreateProposalDto,
  RejectProposalDto
} from '@/dtos/proposal.dto';

class ProposalController {
  public proposalService = new ProposalService();

  /**
   * Contributed: Loc Bui
   * @param req
   * @param res
   * @param next
   */
  public createProposal = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      console.log('inside createProposal controller');
      const proposalData: CreateProposalDto = req.body;
      const user: User = req.user;
      const result: any = await this.proposalService.createProposal(
        user,
        proposalData
      );

      res
        .status(201)
        .json({ data: result, message: 'Successfully created new proposal' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Contributed: Loc Bui
   * @param req
   * @param res
   * @param next
   */
  public acceptProposal = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user: User = req.user;
      const acceptProposalData: AcceptProposalDto = req.body;
      const result: any = await this.proposalService.acceptProposal(
        user,
        acceptProposalData
      );

      res
        .status(201)
        .json({ data: result, message: 'Successfully accepted proposal' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Contributed: Loc Bui
   * @param req
   * @param res
   * @param next
   */
  public rejectProposal = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user: User = req.user;
      const rejectProposalData: RejectProposalDto = req.body;
      const result: any = await this.proposalService.rejectProposal(
        user,
        rejectProposalData
      );

      res
        .status(201)
        .json({ data: result, message: 'Successfully rejected proposal' });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Contributor: Loc Bui
   * @param req
   * @param res
   * @param next
   */
  public getProposalsByAppId = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user: User = req.user;
      const appId: string = req.params.appId;
      const proposalsData: any = await this.proposalService.getProposalsByAppId(
        user,
        appId
      );

      res.status(200).json({
        data: proposalsData,
        message: 'Successfully retrieved list of proposals'
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Contributor: Loc Bui
   * @param req
   * @param res
   * @param next
   */
  public getProposalsByBuyerId = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user: User = req.user;
      const buyerId: string = req.params.buyerId;
      const proposalsData: any =
        await this.proposalService.getProposalsByBuyerId(user, buyerId);

      res.status(200).json({
        data: proposalsData,
        message: 'Successfully retrieved list of proposals'
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Contributor: Loc Bui
   * @param req
   * @param res
   * @param next
   */
  public getProposalsBySellerId = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user: User = req.user;
      const sellerId: string = req.params.sellerId;
      const proposalsData: any =
        await this.proposalService.getProposalsBySellerId(user, sellerId);

      res.status(200).json({
        data: proposalsData,
        message: 'Successfully retrieved list of proposals'
      });
    } catch (error) {
      next(error);
    }
  };
}

export default ProposalController;
