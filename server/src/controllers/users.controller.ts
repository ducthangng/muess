import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { GraphData, User, Wallet } from '@interfaces/users.interface';
import userService from '@services/users.service';
import { Proposal } from '@/interfaces/hlf.interface';
import proposalService from '../services/proposal.service';
import { RequestWithUser } from '../interfaces/auth.interface';

class UsersController {
  public userService = new userService();
  public proposalService = new proposalService();

  getTmr = (index: number) => {
    const today = new Date();
    const tmr = new Date().setDate(today.getDate() + index);
    return new Date(tmr).toISOString().slice(0, 10);
  };

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: User[] = await this.userService.findAllUser();

      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId: string = req.params.id;
      const findOneUserData: User = await this.userService.findUserById(userId);

      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public getUserApp = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId: string = req.params.id;
      const findOneUserData: User = await this.userService.findUserById(userId);

      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userData: CreateUserDto = req.body;
      const createUserData: User = await this.userService.createUser(userData);

      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId: string = req.params.id;
      const userData: CreateUserDto = req.body;
      const updateUserData: User = await this.userService.updateUser(
        userId,
        userData
      );

      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId: string = req.params.id;
      const deleteUserData: User = await this.userService.deleteUser(userId);

      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public getWallet = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userFromReq: User = req.user;
      const user: User = await this.userService.findUserById(userFromReq._id);

      if (user._id.length === 0) {
        res.status(404).json({ data: user, message: 'not found' });
        return;
      }

      const userBoughtProposal: Proposal[] =
        await this.proposalService.getProposalsByBuyerId(user, user._id);

      const userSoldProposal: Proposal[] =
        await this.proposalService.getProposalsBySellerId(user, user._id);

      const boughtProposal: Proposal[] = userBoughtProposal.filter(
        (proposal) => {
          return proposal.status === 'accepted';
        }
      );

      const soldProposal: Proposal[] = userSoldProposal.filter((proposal) => {
        return proposal.status === 'accepted';
      });

      const spending: GraphData[] = [];
      const income: GraphData[] = [];
      let sumSpending = 0;
      let sumIncome = 0;
      const today = new Date();

      boughtProposal.forEach((proposal, index) => {
        const graphData: GraphData = {
          unit: this.getTmr(index),
          amount: proposal.proposedPrice
        };

        spending.push(graphData);
        sumSpending += proposal.proposedPrice;
      });

      soldProposal.forEach((proposal, index) => {
        const graphData: GraphData = {
          unit: this.getTmr(index),
          amount: proposal.proposedPrice
        };

        income.push(graphData);
        sumIncome += proposal.proposedPrice;
      });

      const wallet: Wallet = {
        purchasedAppNumber: boughtProposal.length,
        soldAppNumber: soldProposal.length,
        spending: spending,
        income: income,
        moneySpend: sumSpending,
        moneyMade: sumIncome,
        totalBalance: sumIncome - sumSpending
      };

      res.status(200).json({ data: wallet });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
