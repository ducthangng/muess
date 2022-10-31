import { v4 as uuidv4 } from 'uuid';
import { LicenseDto } from '@/dtos/hlf.dto';

import { initContract } from '@/utils/hlfUtils';
//import { X509Identity } from 'fabric-network';
import { User } from '@/interfaces/users.interface';

const sampleLicense: LicenseDto[] = [
  {
    appId: '1',
    title: 'Sample App 1',
    appIconURL: 'https://picsum.photos/200',
    description: 'Sample App 1 Description',
    license: 'Sample License 1'
  },
  {
    appId: '2',
    title: 'Sample App 2',
    appIconURL: 'https://picsum.photos/200',
    description: 'Sample App 2 Description',
    license: 'Sample License 2'
  },
  {
    appId: '3',
    title: 'Sample App 3',
    appIconURL: 'https://picsum.photos/200',
    description: 'Sample App 3 Description',
    license: 'Sample License 3'
  },
  {
    appId: '4',
    title: 'Sample App 4',
    appIconURL: 'https://picsum.photos/200',
    description: 'Sample App 4 Description',
    license: 'Sample License 4'
  }
];

class LicenseService {
  public async getLicenseByBuyerId(user: User, buyerId: string) {
    return sampleLicense;
  }
}

export default LicenseService;
