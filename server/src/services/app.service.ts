import { v4 as uuidv4 } from 'uuid';
import {
  AcceptProposalDto,
  CreateAppDto,
  CreateProposalDto
} from '@/dtos/hlf.dto';

import { initContract } from '@/utils/hlfUtils';
import { X509Identity } from 'fabric-network';
import { User } from '@/interfaces/users.interface';
import { App } from '../interfaces/apps.interface';

const samples: App[] = [
  {
    assetType: 'App',
    assetId: '1',
    creatorId: '1',
    title: 'test',
    description: 'test',
    appType: 'test',
    paymentMethod: 'visa',
    appTags: ['test'],
    appIconURL:
      'https://upload.wikimedia.org/wikipedia/fi/a/a7/Candy_Crush_Saga.png',
    rating: '09999999',
    appCategories: ['test']
  },
  {
    assetType: 'App',
    assetId: '2',
    creatorId: '1',
    title: 'xxxxx',
    description: 'xxxxx',
    appType: 'xxxxx',
    paymentMethod: 'visa',
    appTags: ['test'],
    appIconURL:
      'https://upload.wikimedia.org/wikipedia/en/b/bc/Candy_Crush_logo.png',
    rating: '10000',
    appCategories: ['xyz']
  }
];

class AppService {
  public async createApp(user: User, appData: CreateAppDto) {
    const contract = await initContract(JSON.parse(user.x509Identity));
    const {
      title,
      description,
      rating,
      appType,
      paymentMethod,
      appTags,
      appIconURL
    } = appData;
    const appId = uuidv4();
    const result = await contract.submitTransaction(
      'CreateApp',
      appId,
      title,
      description,
      rating,
      appType,
      paymentMethod,
      appTags.toString(),
      appIconURL
    );
    console.log(
      `Transaction has successfully created, result is: ${result.toString()}`
    );
    return result.toString();
  }

  public getAllApss() {
    return samples;
  }

  public getAppById(appId: string) {
    return samples;
  }
}

export default AppService;
