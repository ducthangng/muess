import { v4 as uuidv4 } from 'uuid';
import { LicenseDto } from '@/dtos/hlf.dto';

import { initContract } from '@/utils/hlfUtils';
//import { X509Identity } from 'fabric-network';
import { User } from '@/interfaces/users.interface';

const sampleLicense: LicenseDto[] = [
  {
    appId: '1',
    creatorId: 'A',
    ownerId: 'B',
    licenseDetail: 'Sample License 1'
  },
  {
    appId: '2',
    creatorId: 'B',
    ownerId: 'C',
    licenseDetail: 'Sample License 2'
  },
  {
    appId: '3',
    creatorId: 'AB',
    ownerId: 'BC',
    licenseDetail: 'Sample License 1A'
  }
];

class LicenseService {
  public async getLicenseByBuyerId(user: User, buyerId: string) {
    return sampleLicense;
  }
}

export default LicenseService;
