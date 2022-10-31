import { v4 as uuidv4 } from 'uuid';
import {
  AcceptProposalDto,
  CreateAppDto,
  CreateProposalDto
} from '@/dtos/hlf.dto';

import { initContract } from '@/utils/hlfUtils';
//import { X509Identity } from 'fabric-network';
import { User } from '@/interfaces/users.interface';

const sampleLicense: CreateProposalDto[] = [
  {
    appId: '1',
    proposedPrice: 100,
    licenseDetails: '1'
  },
  {
    appId: '2',
    proposedPrice: 200,
    licenseDetails: '2'
  },
  {
    appId: '3',
    proposedPrice: 300,
    licenseDetails: '3'
  },
  {
    appId: '3',
    proposedPrice: 300,
    licenseDetails: '3'
  },
  {
    appId: '3',
    proposedPrice: 300,
    licenseDetails: '3'
  }
];

class LicenseService {
  public async getLicensesByBuyerId() {
    return sampleLicense;
  }
}
