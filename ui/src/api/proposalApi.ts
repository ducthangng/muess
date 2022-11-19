import { AppError } from '../models/Error';

const BASE_API = process.env.REACT_APP_BASE_API || 'http://localhost:8000';
const apiUrl = `${BASE_API}/proposal`;

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

  return response;
};

export const proposalApi = {
  createProposal: async (params: {
    appId: string;
    proposedPrice: number;
    licenseDetails: string;
  }) => {
    const response = SENDPOST(`${apiUrl}`, params)
      .then((data) => {
        const x: string = data.message;
        console.log('received: ', x);
        return x;
      })
      .catch((err) => {
        return err;
      });

    return response;
  },

  createSecondhandProposal: async (data: {
    licenseId: string;
    proposedPrice: number;
  }) => {
    try {
      const response = await fetch(`${apiUrl}/secondhand`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const resToJson = await response.json();
      const status = response.status;

      return { ...resToJson, status };
    } catch (error) {
      console.log(error);
    }
  },

  getProposalByBuyerId: async (BuyerId: string) => {
    try {
      const response = await fetch(`${apiUrl}/buyer/${BuyerId}`, {
        method: 'GET',
        credentials: 'include'
      });

      const resToJson = await response.json();
      const status = response.status;

      return { ...resToJson, status };
    } catch (error) {
      console.log(error);
    }
  },

  getProposalBySellerId: async (BuyerId: string) => {
    try {
      const response = await fetch(`${apiUrl}/seller/${BuyerId}`, {
        method: 'GET',
        credentials: 'include'
      });

      const resToJson = await response.json();
      const status = response.status;

      return { ...resToJson, status };
    } catch (error) {
      console.log(error);
    }
  },

  acceptProposal: async (proposalId: string) => {
    try {
      const response = await fetch(`${apiUrl}/accept`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ proposalId: proposalId })
      });

      const resToJson = await response.json();
      const status = response.status;

      return { ...resToJson, status };
    } catch (error) {
      console.log(error);
    }
  },

  rejectProposal: async (proposalId: string) => {
    try {
      const response = await fetch(`${apiUrl}/reject`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ proposalId: proposalId })
      });

      const resToJson = await response.json();
      const status = response.status;

      return { ...resToJson, status };
    } catch (error) {
      console.log(error);
    }
  }
};
