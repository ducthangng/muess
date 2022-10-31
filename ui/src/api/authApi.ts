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
    password: string;
    dob: string;
    email: string;
  }) => {
    try {
      const payload = parameter;

      const response = await fetch(`${apiUrl}/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const resToJson = await response.json();
      const status = response.status;

      return { ...resToJson, status };
    } catch (error) {
      console.log(error);
    }
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

    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const resToJson = await response.json();
      const status = response.status;

      return { ...resToJson, status };
    } catch (err) {
      console.log(err);
    }
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
  }
};
