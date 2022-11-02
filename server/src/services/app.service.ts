import { v4 as uuidv4 } from 'uuid';
import { CreateAppDto } from '@/dtos/hlf.dto';
import { initContract } from '@/utils/hlfUtils';
import { User } from '@/interfaces/users.interface';
import { App } from '../interfaces/apps.interface';

class AppService {
  public async createApp(user: User, appData: CreateAppDto) {
    console.log('user: ', user);
    const contract = await initContract(JSON.parse(user.x509Identity));
    const {
      title,
      description,
      rating,
      appType,
      paymentMethod,
      appTags,
      appIconURL,
      appCategories
    } = appData;
    const assetId = uuidv4();
    const result = await contract.submitTransaction(
      'CreateApp',
      assetId,
      title,
      description,
      rating,
      appType,
      paymentMethod,
      appTags.toString(),
      appCategories.toString(),
      appIconURL
    );
    console.log(`Transaction has successfully created`);
    return result.toString();
  }

  public async getAllApps(user: User) {
    const contract = await initContract(JSON.parse(user.x509Identity));
    const assetId = uuidv4();
    const result = await contract.submitTransaction('GetAllApps');
    console.log(`Transaction GetAllApps has successfully created`);
    return result.toString();
  }

  public async getAppsByCreatorId(user: User, creatorId: string) {
    const contract = await initContract(JSON.parse(user.x509Identity));
    const result = await contract.submitTransaction(
      'QueryAppsByCreatorId',
      creatorId
    );
    console.log(`Transaction getAppsByCreatorId has successfully created`);

    return result.toString();
  }
}

export default AppService;
