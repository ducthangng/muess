export class CreateAppDto {
  public title: string;
  public description: string;
  public rating: string;
  public appType: string;
  public paymentMethod: string;
  public appTags: string[];
  public appCategories: string[];
  public appIconURL: string;
}

export class CreateProposalDto {
  public appId: string;
  public proposedPrice: number;
  public licenseDetails: string;
}

export class AcceptProposalDto {
  public proposalId: string;
}

export class RejectProposalDto {
  public proposalId: string;
}

export class LicenseDto {
  public appId: string;
  public title: string;
  public appIconURL: string;
  public description: string;
  public license: string;
}
