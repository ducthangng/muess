import { IsString } from 'class-validator';

export class CreateAppDto {
  @IsString()
  public title: string;

  @IsString()
  public description: string;

  @IsString()
  public appType: string;
}
