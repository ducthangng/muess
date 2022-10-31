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

  public async getLicenseByAppId(user: User, appId: string) {
    const contract = await initContract(JSON.parse(user.x509Identity));
    const result = await contract.submitTransaction(
      'QueryLicensesByAppId',
      appId
    );

    console.log(`Transaction QueryLicensesByAppId has successfully done.`);

    return result.toString();
  }

  public async getLicenseByOwnerId(user: User, ownerId: string) {
    const contract = await initContract(JSON.parse(user.x509Identity));
    const result = await contract.submitTransaction(
      'QueryLicensesByOwnerId',
      ownerId
    );

    console.log(`Transaction QueryLicensesByOwnerId has successfully done.`);

    return result.toString();
  }

  public async getLicenseByCreatorId(user: User, creatorId: string) {
    const contract = await initContract(JSON.parse(user.x509Identity));
    const result = await contract.submitTransaction(
      'QueryLicensesByCreatorId',
      creatorId
    );

    console.log(`Transaction QueryLicensesByOwnerId has successfully done.`);

    return result.toString();
  }

  // public async getLicenseByBuyerId(user: User, buyerId: string) {
  //   return sampleLicense;
  // }
}

export default LicenseService;
