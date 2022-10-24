import { IsString } from "class-validator";

export class CreateAppDto {
    @IsString()
    public name: string;

    @IsString()
    public desc: string;

    @IsString()
    public apptype: string;

    @IsString()
    public payoption: string;

    @IsString()
    public category: string;

    @IsString()
    public tags: string;
}