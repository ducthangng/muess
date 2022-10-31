import { IsNumber, IsString } from 'class-validator';

export class CreateProposalDto {
  @IsString()
  public appId: string;

  @IsNumber()
  public proposedPrice: number;

  @IsString()
  public licenseDetails: string;
}

export class AcceptProposalDto {
  @IsString()
  public proposalId: string;
}

export class RejectProposalDto {
  @IsString()
  public proposalId: string;
}
