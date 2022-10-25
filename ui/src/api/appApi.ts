import { AppError } from '../models/Error';
import { AppDetailData } from '../models/AppDetailData';
import { stringify } from 'querystring';

const BASE_API = process.env.REACT_APP_BASE_API || 'http://localhost:8080';
const apiUrl = `${BASE_API}/api/v1/app`;

/**
 * fetches for app data.
 */
export const appApi = {
  getAllApps: async () => {
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
        console.log(data);
        const err: AppError = data.error;
        if (err.errorCode !== 0) {
          throw new Error(err.errorMsg + ' ++ ' + err.errorField);
        }

        const apps: AppDetailData[] = data.data;
        return apps;
      })
      .catch((err) => {
        return err;
      });

    return response;
  },

  getInfoByName: async (Name: string) => {
    const response = await fetch(
      `${apiUrl}/?` + new URLSearchParams({ Name }),
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

        const apps: AppDetailData[] = data.data;
        return apps;
      })
      .catch((err) => {
        return err;
      });

    return response;
  },

  getInfoById: async (id: number) => {
    const response = await fetch(
      `${apiUrl}/?` + new URLSearchParams({ app_id: id.toString() }),
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

        const apps: AppDetailData[] = data.data;
        return apps;
      })
      .catch((err) => {
        return err;
      });

    return response;
  },

//   getInfoByFullname: async (fullname: string) => {
//     const response = await fetch(
//       `${apiUrl}?` + new URLSearchParams({ fullname }),
//       {
//         method: 'GET',
//         credentials: 'include'
//       }
//     )
//       .then((res) => {
//         if (res.ok) {
//           return res.json();
//         }

//         throw new Error('Network response was not ok.');
//       })
//       .then((data) => {
//         console.log(data);
//         const err: AppError = data.error;
//         if (err.errorCode !== 0) {
//           throw new Error(err.errorMsg + ' ++ ' + err.errorField);
//         }

//         const users: User[] = data.data;
//         return users;
//       })
//       .catch((err) => {
//         return err;
//       });

//     return response;
//   },

  getDesc: async (appId: number) => {
    const response = await fetch(
      `${apiUrl}/class?` + new URLSearchParams({ app_id: appId.toString() }),
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

        const desc: AppDetailData[] = data.description;
        return desc;
      })
      .catch((err) => {
        return err;
      });

    return response;
  },

  updateInfo: async (parameter: AppDetailData) => {
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

//   getAllTestResult: async (id: number) => {
//     const user_id = id.toString();

//     const response = await fetch(
//       `${apiUrl}/test_result?` + new URLSearchParams({ user_id }),
//       {
//         method: 'GET',
//         credentials: 'include'
//       }
//     )
//       .then((res) => {
//         if (res.ok) {
//           return res.json();
//         }

//         throw new Error('Network response was not ok.');
//       })
//       .then((data) => {
//         console.log(data);
//         const err: AppError = data.error;
//         if (err.errorCode !== 0) {
//           throw new Error(err.errorMsg + ' ++ ' + err.errorField);
//         }

//         const results: Result[] = data.data;
//         return results;
//       })
//       .catch((err) => {
//         return err;
//       });

//     return response;
//   }
};
