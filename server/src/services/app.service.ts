import { v4 as uuidv4 } from 'uuid';
import { CreateAppDto } from '@/dtos/hlf.dto';
import { initContract } from '@/utils/hlfUtils';
import { User } from '@/interfaces/users.interface';
import { App } from '../interfaces/apps.interface';
import appModel from '@/models/apps.model';

class AppService {
  public apps = appModel;
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

    const r = this.apps.create({
      id: assetId,
      assetId: assetId,
      title,
      description,
      rating,
      appType,
      paymentMethod,
      appTags,
      appCategories: appCategories.join(','),
      appIconURL,
      creatorId: user._id
    });

    console.log('result: ', r);
    console.log(`Transaction has successfully created`);
    return result.toString();
  }

  public async getAllApps(user: User) {
    // const contract = await initContract(JSON.parse(user.x509Identity));
    // const result = await contract.submitTransaction('GetAllApps');

    const result = await this.apps.find({});

    console.log(`Transaction GetAllApps has successfully created`);
    return result;
  }

  public async getAppsByCreatorId(user: User, creatorId: string) {
    // const contract = await initContract(JSON.parse(user.x509Identity));
    // const result = await contract.submitTransaction(
    //   'QueryAppsByCreatorId',
    //   creatorId
    // );
    // console.log(`Transaction getAppsByCreatorId has successfully created`);

    const result = await this.apps.find({ creatorId });

    return result;
  }
}

export default AppService;
