import { License } from '../models/AppDetailData';

const BASE_API = process.env.REACT_APP_BASE_API || 'http://localhost:8000';
const apiUrl = `${BASE_API}/license`;

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

export const licenseApi = {
  getLicenseByOwnerId: async (id: string) => {
    const response = await fetch(
      `${apiUrl}` + new URLSearchParams({ user_id: id.toString() }),
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
        const license: License = data.data;
        return license;
      })
      .catch((err) => {
        return err;
      });

    return response;
  },

  getLicenseByCreatorId: async (id: string) => {
    const response = await fetch(
      `${apiUrl}` + new URLSearchParams({ user_id: id.toString() }),
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
        const license: License = data.data;
        return license;
      })
      .catch((err) => {
        return err;
      });

    return response;
  },

  getLicenseByAppId: async (id: string) => {
    const response = await fetch(
      `${apiUrl}` + new URLSearchParams({ user_id: id.toString() }),
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
        const license: License = data.data;
        return license;
      })
      .catch((err) => {
        return err;
      });

    return response;
  },

  getMyLicenseByAppId: async (appId: string) => {
    const response = await fetch(`${apiUrl}/my-app/${appId}`, {
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
        console.log('license raw: ', data);
        const license: License[] = data.data;
        console.log('license raw 2: ', license);
        return license;
      })
      .catch((err) => {
        return err;
      });

    return response;
  }
};
