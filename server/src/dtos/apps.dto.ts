import { IsArray, IsString } from 'class-validator';

export class CreateAppDto {
  @IsString()
  public title: string;

  @IsString()
  public description: string;

  @IsString()
  public appType: string;

  @IsString()
  public rating: string;

  @IsString()
  public paymentMethod: string;

  @IsArray()
  public appTags: string;

  @IsArray()
  public appCategories: string;

  @IsString()
  public appIconURL: string;
}
