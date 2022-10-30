import { AppError } from '../models/Error';
import { User } from '../models/User';

const BASE_API = process.env.REACT_APP_BASE_API || 'http://localhost:8000';
const apiUrl = `${BASE_API}/auth`;

/**
 * functions that related to authentication/authorization.
 */
export const authApi = {
  register: async (parameter: {
    fullname: string;
    username: string;
    password: string;
    dob: string;
    email: string;
  }) => {
    const payload = parameter;

    const response = await fetch(`${apiUrl}/register`, {
      method: 'POST',
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
        // const err: AppError = data.error;
        // if (err.errorMsg.length !== 0) {
        //   alert(err.errorMsg);
        //   throw new Error(err.errorMsg + ' ++ ' + err.errorField);
        // }

        const user: User = data.data;
        return user;
      });

    return response;
  },
  /**
   * Login Function.
   *
   * @param username string
   * @param password string
   *
   * @returns userIndentity when success & Error otherwise.
   */
  login: async (parameter: { email: string; password: string }) => {
    const payload = {
      email: parameter.email,
      password: parameter.password
    };

    const response = await fetch(`${apiUrl}/login`, {
      method: 'POST',
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
        const user: User = data.data;
        return user;
      })
      .catch((err) => {
        return err;
      });

    return response;
  },
  /**
   * Logout Function.
   *
   * @returns null when success & Error otherwise.
   */
  logout: async () => {
    const response = await fetch(`${apiUrl}/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (res.ok) {
          console.log(res);
          return res.json();
        }

        throw new Error('Network response was not ok.');
      })
      .then((data) => {
        // const err: AppError = data.error;
        // if (err.errorCode) {
        //   return null;
        // }

        const response: number = data.data;
        return response;
      });
    // .catch((err) => {
    //   return err;
    // });

    return response;
  },

  /**
   * Check if user is logged in.
   *
   * @returns true if user is logged in, false otherwise.
   */
  getId: async () => {
    const response = await fetch(`${apiUrl}/ID`, {
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
        // const err: AppError = data.error;
        // if (err.errorCode) {
        //   return null;
        // }

        const user: User = data.data;
        return user;
      });
    // .catch((error) => {
    //   return error;
    // });

    return response;
  }
};
