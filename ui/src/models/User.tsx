interface User {
  _id: string;
  email: string;
  fullname: string;
  username: string;
  password: string;
  identity: string;
}

interface UserDataForWalletDisplay {
  labels: string[];
  datasets: GraphDisplay[];
}

interface GraphDisplay {
  label: string;
  data: number[];
  backgroundColor: string[];
  borderColor: string;
  borderWidth: number;
}

export type { User, UserDataForWalletDisplay, GraphDisplay };
