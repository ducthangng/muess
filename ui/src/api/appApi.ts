import { AppError } from '../models/Error';
import { App, AppV2, CreateAppData } from '../models/AppDetailData';

const BASE_API = process.env.REACT_APP_BASE_API || 'http://localhost:8000';
const apiUrl = `${BASE_API}/apps`;

const SENDPOST = async (url: string, data: any) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(data)
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    throw new Error('Network response was not ok.');
  });

  return response.json();
};

/**
 * fetches for app data.
 */
export const appApi = {
  /**
   * create a new application.
   *
   * @param app details of the created app
   * @returns true if scuccess, false otherwise
   */
  releaseApp: async (params: { app: CreateAppData }) => {
    try {
      const response = await fetch(`${apiUrl}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params.app)
      });

      const resToJson = await response.json();
      const status = response.status;

      return { ...resToJson, status };
    } catch (err) {
      console.log(err);
    }
  },

  getAppByCreatorId: async (creatorId: string) => {
    const response = await fetch(
      `${apiUrl}/creator_app?creator_id=${creatorId}`,
      {
        method: 'GET',
        credentials: 'include'
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        throw new Error('Network response was not ok.');
      })
      .then((data) => {
        console.log(data);
        const x: App[] = data.data;

        return x;
      })
      .catch((err) => {
        return err;
      });

    return response;
  },

  /**
   * Get all available apps from database without considering the owner.
   *
   * @returns list of app
   */
  getAllApps: async () => {
    const response = await fetch(`${apiUrl}/all`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        throw new Error('Network response was not ok.');
      })
      .then((data) => {
        const apps: any[] = data.data;
        const result: any[] = apps.map((app) => {
          console.log(app.appCategories);
          return {
            Key: app.assetId,
            Record: {
              ...app,
              appCategories: app.appCategories.split(',')
            }
          };
        });

        console.log('result: ', result);
        return result;
      });

    return response;
  },

  getOwnedApps: async () => {
    const response = await fetch(`${apiUrl}/my-app`, {
      method: 'GET',
      credentials: 'include'
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        throw new Error('Network response was not ok.');
      })
      .then((data) => {
        const apps: AppV2[] = data.data;
        const result: App[] = apps.map((app) => {
          return {
            Key: app.assetId,
            Record: {
              ...app,
              appCategories: app.appCategories[0].split(',')
            }
          };
        });
        return result;
      });

    return response;
  },

  /**
   *  Returns app information of a specific app with the given app id.
   *
   * @param id id of the app
   * @returns app detail data
   */
  getAppById: async (id: string) => {
    const response = await fetch(`${apiUrl}/appId/${id}`, {
      method: 'GET',
      credentials: 'include'
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        throw new Error('Network response was not ok.');
      })
      .then((data) => {
        const result: any = data.data;
        const app: any = {
          Key: result.assetId,
          Record: {
            ...result,
            appCategories: result.appCategories.split(',')
          }
        };

        console.log('re sult: ', result);
        return app;
      })
      .catch((err) => {
        return err;
      });

    return response;
  },

  getAppByIdSimple: async (id: string) => {
    const response = await fetch(`${apiUrl}/simple/${id}`, {
      method: 'GET',
      credentials: 'include'
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        throw new Error('Network response was not ok.');
      })
      .then((data) => {
        const apps: AppV2 = data.data;
        const result: App = {
          Key: apps.assetId,
          Record: {
            ...apps,
            appCategories: apps.appCategories[0].split(',')
          }
        };
        console.log(apps.appCategories[0].split(','));
        return result;
      })
      .catch((err) => {
        return err;
      });

    return response;
  },

  /**
   *  Update an existed app inside database.
   *
   * @param app app detail of the updated app. Note: all fields are required.
   * @returns status: true if success, false if not.
   */
  updateApp: async (app: App): Promise<Boolean> => {
    const payload = app;

    const response = await fetch(`${apiUrl}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        throw new Error('Network response was not ok.');
      })
      .then((data) => {
        console.log(data);
        const err: AppError = data.error;
        if (err.errorCode !== 0) {
          throw new Error(err.errorMsg + ' ++ ' + err.errorField);
        }

        const x: number = data.data;

        if (x === 1) {
          return true;
        }

        return false;
      })
      .catch((err) => {
        return err;
      });

    return response;
  }
};
