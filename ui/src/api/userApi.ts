import { AppError } from '../models/Error';
import { User } from '../models/User';
import { stringify } from 'querystring';
import { Wallet } from '../models/Wallet';

const BASE_API = process.env.REACT_APP_BASE_API || 'http://localhost:8080';
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

  getInfoById: async (id: number) => {
    const response = await fetch(
      `${apiUrl}/?` + new URLSearchParams({ user_id: id.toString() }),
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
  }
};
