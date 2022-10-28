export class CreateProposalDto {
  public appID: string;
  public buyerID: string;
  public proposedPrice: number;
  public licenseDetails: string;
}

export class AcceptProposalDto {
  public creatorID: string;
  public proposalID: string;
}
