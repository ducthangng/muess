import { AppError } from '../models/Error';
import { User } from '../models/User';
import { stringify } from 'querystring';
import { Wallet } from '../models/Wallet';

const BASE_API = process.env.REACT_APP_BASE_API || 'http://localhost:8000';
const apiUrl = `${BASE_API}/users`;

/**
 * fetches for user data.
 */
export const userApi = {
  getWallet: async () => {
    const response = await fetch(`${apiUrl}/wallet`, {
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
        const wallet: Wallet = data.data;
        console.log('wallet: ', wallet);
        return wallet;
      });

    return response;
  },

  getInfoByUsername: async (username: string) => {
    const response = await fetch(
      `${apiUrl}/?` + new URLSearchParams({ username }),
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

        const users: User[] = data.data;
        return users;
      })
      .catch((err) => {
        return err;
      });

    return response;
  },

  getInfoById: async (id: string) => {
    const response = await fetch(`${apiUrl}/detail/${encodeURIComponent(id)}`, {
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
        const users: User = data.data;
        return users;
      });

    return response;
  },

  getInfoByFullname: async (fullname: string) => {
    const response = await fetch(
      `${apiUrl}?` + new URLSearchParams({ fullname }),
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

        const users: User[] = data.data;
        return users;
      })
      .catch((err) => {
        return err;
      });

    return response;
  },

  updateInfo: async (parameter: User) => {
    const payload = parameter;

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

        const response: number = data.data;
        return response;
      })
      .catch((err) => {
        return err;
      });

    return response;
  },

  /**
   * Get the info of the current user.
   *
   * @returns user data.
   */
  getCurrentUser: async () => {
    try {
      const response = await fetch(`${apiUrl}/current`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const resToJson = await response.json();
      const status = response.status;

      return { ...resToJson, status };
    } catch (err) {
      console.log(err);
    }
  }
};
