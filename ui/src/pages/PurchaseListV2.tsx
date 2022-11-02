import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import style from '../assets/css/PurchaseTable.module.css';
import { useGlobalContext } from '../context/global/GlobalContext';
import { ratings } from '../consts/ratings';
import { userApi } from '../api/userApi';
import { proposalApi } from '../api/proposalApi';
import { appApi } from '../api/appApi';
import { Tag } from 'antd';

interface DisplayTable {
  key: string;
  id: string;
  prodname: string;
  provider: string;
  price: number;
  details: string[];
  status: string;
}

const dataSource = [
  {
    key: '1',
    id: 'Pacman',
    prodname: 'Mike',
    provider: 'ducthang',
    price: 10,
    details: 'Pro;Pro',
    status: 'accepted'
  }
];

const columns = [
  {
    title: <b>Proposal ID</b>,
    dataIndex: 'id',
    key: 'id',
    render: (id) => id.slice(0, 5)
  },
  {
    title: <b>Product Name</b>,
    dataIndex: 'prodname',
    key: 'prodname',
    render: (product) => {
      return <a>{product}</a>;
    }
  },
  {
    title: <b>Provider</b>,
    dataIndex: 'provider',
    key: 'provider'
  },
  {
    title: <b>Price</b>,
    dataIndex: 'price',
    key: 'price'
  },
  {
    title: <b>License Detail</b>,
    dataIndex: 'details',
    key: 'details',
    render: (details) => (
      <>
        {details.map((t) => {
          let color = 'green';
          if (t === 'resell') {
            color = 'blue';
          }
          if (t === 'commercial_use') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={t}>
              {t.toUpperCase()}
            </Tag>
          );
        })}
      </>
    )
  },
  {
    title: <b>Status</b>,
    dataIndex: 'status',
    key: 'status',
    render: (status) => {
      let color = '#f50';
      if (status === 'accepted') {
        color = '#87d068';
      }
      if (status === 'pending') {
        color = 'geekblue';
      }

      return <Tag color={color}>{status}</Tag>;
    }
  }
];

const PurchaseListV2 = () => {
  const { setIsLoading } = useGlobalContext();
  const [data, setData] = useState([]);
  const [currentFolderData, setCurrentFolderData] = useState();
  const [currentSellerData, setCurrentSellerData] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);

    const currentUserResponse = await userApi.getCurrentUser();
    const buyerId = currentUserResponse.data._id;
    const proposals = await proposalApi.getProposalByBuyerId(
      encodeURIComponent(buyerId)
    );

    console.log('proposal: ', proposals);

    Promise.all(
      proposals.data.map((proposal, index) => {
        return appApi
          .getAppById(proposal.Record.appId)
          .then((result) => {
            console.log('title: ', result.Record.title);
            return {
              key: index,
              id: proposal.Record.assetId,
              prodname: result.Record.title,
              provider: proposal.Record.sellerId,
              price: proposal.Record.proposedPrice,
              details: proposal.Record.licenseDetails,
              status: proposal.Record.status
            };
          })
          .then((val) => {
            return userApi.getInfoById(val.provider).then((result) => {
              const x: DisplayTable = {
                key: index,
                id: val.id,
                prodname: val.prodname,
                provider: result.fullname,
                price: val.price,
                details: val.details.split(';'),
                status: val.status
              };

              return x;
            });
          });
      })
    ).then((val) => {
      setData(val as []);
      setIsLoading(false);
    });
  };

  return (
    <div className={style.container}>
      <Table dataSource={data} columns={columns} />
    </div>
  );
};

export default PurchaseListV2;
