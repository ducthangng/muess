import { v4 as uuidv4 } from 'uuid';
import { LicenseDto } from '@/dtos/hlf.dto';

import { initContract } from '@/utils/hlfUtils';
//import { X509Identity } from 'fabric-network';
import { User } from '@/interfaces/users.interface';
import { IsEmpty } from 'class-validator';
import { isEmpty } from '@utils/util';
import { HttpException } from '@/exceptions/HttpException';
import userModel from '@/models/users.model';

//LicenseDto in hlf.dto
const sampleLicense: LicenseDto[] = [
  {
    appId: '1',
    creatorId: 'A',
    ownerId: 'B',
    licenseId: '12345',
    licenseDetails: 'Sample License 1'
  },
  {
    appId: '2',
    creatorId: 'B',
    ownerId: 'C',
    licenseId: '123',
    licenseDetails: 'Sample License 2'
  },
  {
    appId: '3',
    creatorId: 'AB',
    ownerId: 'BC',
    licenseId: '1',
    licenseDetails: 'Sample License 1A'
  }
];

class LicenseService {
  public users = userModel;

  public async findAllUser(): Promise<User[]> {
    const users: User[] = await this.users.find();
    return users;
  }

  public async getLicenseByBuyerId(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty');

    const findUser: User = await this.users.findOne({ _id: userId });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return;
  }

  // public async getLicenseByBuyerId(user: User, buyerId: string) {
  //   return sampleLicense;
  // }
}

export default LicenseService;
