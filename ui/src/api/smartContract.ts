import { SmartContract } from '../models/hyperledger/smartContract';

const BASE_API = process.env.REACT_APP_BASE_API || 'http://localhost:8080';
const apiUrl = `${BASE_API}/api/v1/user`;

/**
 * fetches for user data.
 */
export const smartContractAPI = {
  getAllContract: async () => {
    const response = await fetch(`${apiUrl}/smartContract`, {
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
        const result: SmartContract[] = data.data;
        return result;
      })
      .catch((e) => {
        console.log(e);
      });

    return response;
  }
};
