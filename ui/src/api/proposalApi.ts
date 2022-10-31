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

  return response.json();
};

export const proposalApi = {
  createProposal: async (params: {
    appId: string;
    proposedPrice: number;
    licenseDetails: string;
  }) => {
    const response = SENDPOST(`${apiUrl}`, params)
      .then((data) => {
        const x: number = data.data;
        return x === 1 ? true : false;
      })
      .catch((err) => {
        return err;
      });

    return response;
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
    const response = await fetch(
      `${apiUrl}/seller/seller_proposal?buyer_id=${BuyerId}`,
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

        const proposals: any[] = data.data;
        return proposals;
      });

    return response;
  },

  acceptProposal: async (params: { proposalId: string }) => {
    const response = SENDPOST(`${apiUrl}/accept`, params)
      .then((data) => {
        const x: number = data.data;
        return x === 1 ? true : false;
      })
      .catch((err) => {
        return err;
      });

    return response;
  },

  rejectProposal: async (params: { proposalId: string }) => {
    const response = SENDPOST(`${apiUrl}/reject`, params)
      .then((data) => {
        const x: number = data.data;
        return x === 1 ? true : false;
      })
      .catch((err) => {
        return err;
      });

    return response;
  }
};
