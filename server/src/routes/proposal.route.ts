import { Router } from 'express';
import ProposalController from '@controllers/proposal.controller';
import { CreateUserDto, LoginUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import {
  AcceptProposalDto,
  CreateProposalDto,
  RejectProposalDto
} from '@/dtos/hlf.dto';

class ProposalRoute implements Routes {
  public path = '/proposal';
  public router = Router();
  public proposalController = new ProposalController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/`,
      // validationMiddleware(CreateProposalDto, 'body'),
      authMiddleware,
      this.proposalController.createProposal
    );
    this.router.post(
      `${this.path}/accept`,
      validationMiddleware(AcceptProposalDto, 'body'),
      this.proposalController.acceptProposal
    );
    this.router.post(
      `${this.path}/reject`,
      validationMiddleware(RejectProposalDto, 'body'),
      this.proposalController.rejectProposal
    );
    this.router.get(
      `${this.path}/buyer/ID`,
      authMiddleware,
      this.proposalController.getProposalsByBuyerId
    );
    this.router.get(
      `${this.path}/seller/ID`,
      authMiddleware,
      this.proposalController.getProposalsBySellerID
    );
  }
}

export default ProposalRoute;
