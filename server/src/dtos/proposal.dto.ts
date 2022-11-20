import { IsNumber, IsString } from 'class-validator';

export class CreateProposalDto {
  @IsString()
  public appId: string;

  @IsNumber()
  public proposedPrice: number;

  @IsString()
  public licenseDetails: string;
}

export class CreateSecondhandProposalDto {
  @IsString()
  public licenseId: string;

  @IsNumber()
  public proposedPrice: number;
}

export class AcceptProposalDto {
  @IsString()
  public proposalId: string;
}

export class RejectProposalDto {
  @IsString()
  public proposalId: string;
}
