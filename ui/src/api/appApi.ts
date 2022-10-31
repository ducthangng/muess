import { AppError } from '../models/Error';
import { App, CreateAppData } from '../models/AppDetailData';

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
    const response = SENDPOST(`${apiUrl}`, params.app)
      .then((data) => {
        const x: number = data.data;
        return x === 1 ? true : false;
      })
      .catch((err) => {
        return err;
      });

    return response;
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
        const err: AppError = data.error;
        if (err.errorCode !== 0) {
          throw new Error(err.errorMsg + ' ++ ' + err.errorField);
        }

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
        const apps: App[] = data.data;
        console.log('app: ', data.data);
        return apps;
      });

    return response;
  },

  getOwnedApps: async () => {
    const response = await fetch(`${apiUrl}/all`, {
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
        const apps: App[] = data.data;
        console.log('owneddd: ', data.data);
        return apps;
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
    const response = await fetch(`${apiUrl}/${id}`, {
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
        const apps: App = data.data;
        return apps;
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
