import React, { useState, useEffect } from 'react';
import { Space, Table } from 'antd';
import style from '../assets/css/PurchaseTable.module.css';
import { useGlobalContext } from '../context/global/GlobalContext';
import { ratings } from '../consts/ratings';
import { userApi } from '../api/userApi';
import { proposalApi } from '../api/proposalApi';
import { appApi } from '../api/appApi';
import { Tag, Button } from 'antd';
import { identity, map, values } from 'lodash';
import { useNavigate } from 'react-router-dom';

interface DisplayTableWithAction {
  key: string;
  id: string;
  prodname: string;
  buyerName: string;
  price: number;
  details: string[];
  status: string;
}

interface Mapping {
  key: string;
  val: string;
}

const PurchaseListV2WithAction = () => {
  const { setIsLoading } = useGlobalContext();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [currentFolderData, setCurrentFolderData] = useState();
  const [currentSellerData, setCurrentSellerData] = useState();
  const [myMapping, setMapping] = useState<Mapping[]>([]);
  let mapping: Mapping[] = [];

  useEffect(() => {
    fetchData();
  }, []);

  const acceptProposal = async (proposalId) => {
    setIsLoading(true);
    const response = await proposalApi.acceptProposal(proposalId);
    if (response.status === 201) {
      fetchData();
    } else {
      console.log(response);
    }
    setIsLoading(false);
  };

  const rejectProposal = async (proposalId) => {
    setIsLoading(true);
    const response = await proposalApi.rejectProposal(proposalId);
    if (response.status === 201) {
      fetchData();
    } else {
      console.log(response);
    }
    setIsLoading(false);
  };

  const fetchData = async () => {
    setIsLoading(true);

    const currentUserResponse = await userApi.getCurrentUser();
    const sellerId = currentUserResponse.data._id;
    const proposals = await proposalApi.getProposalBySellerId(
      encodeURIComponent(sellerId)
    );

    Promise.all(
      proposals.data.map((proposal, index) => {
        return appApi
          .getAppById(proposal.appId)
          .then((result) => {
            mapping.push({
              key: result.Record.title,
              val: proposal.appId
            });

            console.log('pushed!');

            return {
              key: index,
              id: proposal.assetId,
              prodname: result.Record.title,
              buyer: proposal.buyerId,
              price: proposal.proposedPrice,
              details: proposal.licenseDetails,
              status: proposal.status
            };
          })
          .then((val) => {
            return userApi.getInfoById(val.buyer).then((result) => {
              const x: DisplayTableWithAction = {
                key: index,
                id: val.id,
                prodname: val.prodname,
                buyerName: result.fullname,
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
      setMapping(mapping);
    });
  };

  const redirectToApp = (val: string) => {
    console.log('mapping ne: ', myMapping);
    myMapping.forEach((item) => {
      if (item.key === val) {
        navigate(`/products/${item.val}`);
      }
    });
  };

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
        return (
          <Button
            style={{ borderColor: 'white', color: 'black' }}
            onClick={() => redirectToApp(product)}
          >
            {product}
          </Button>
        );
      }
    },
    {
      title: <b>Buyer</b>,
      dataIndex: 'buyerName',
      key: 'buyerName'
    },
    {
      title: <b>Proposed Price</b>,
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: <b>License</b>,
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
      title: <b>Action</b>,
      dataIndex: 'status',
      key: 'status',
      render: (status, row) => {
        if (status === 'pending') {
          return (
            <div>
              <Button
                style={{
                  backgroundColor: '#1990FF',
                  color: 'white',
                  borderColor: 'white'
                }}
                onClick={() => acceptProposal(row.id)}
              >
                ACCEPT
              </Button>
              <Button
                style={{
                  color: 'gray',
                  marginLeft: '1vw',
                  borderColor: 'gray'
                }}
                onClick={() => rejectProposal(row.id)}
              >
                REJECT
              </Button>
            </div>
          );
        } else {
          return <p>{status}</p>;
        }
      }
    }
  ];

  return (
    <div className={style.container}>
      <Table dataSource={data} columns={columns} />
    </div>
  );
};

export default PurchaseListV2WithAction;
