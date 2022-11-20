import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Wallet.css';
import Import from '../components/TestData/fake_monthly_imports_data.json';
import Export from '../components/TestData/fake_monthly_sales_data.json';
import ImportYearly from '../components/TestData/fake_yearly_imports_data.json';
import ExportYearly from '../components/TestData/fake_yearly_sales_data.json';
import LineChart from '../components/LineChart/LineChart';
import Purchased from '../assets/images/purchased.gif';
import Sold from '../assets/images/sold.gif';
import Income from '../assets/images/income.gif';
import Balance from '../assets/images/balance.gif';
import Spend from '../assets/images/spend.gif';
import { Link } from 'react-router-dom';
import SideMenu from '../components/Header/SideMenu';
import { userApi } from '../api/userApi';
import { GraphDisplay, UserDataForWalletDisplay } from '../models/User';
import { isNil, result } from 'lodash';
import { GraphData } from '../models/Wallet';
import { Wallet } from '../models/Wallet';
import { useGlobalContext } from '../context/global/GlobalContext';

function WalletOutline() {
  const { setIsLoading } = useGlobalContext();
  const [selected, setSelected] = useState('Monthly progress');
  const [wallet, SetWallet] = useState<Wallet>();
  const [userData, setUserData] = useState<UserDataForWalletDisplay>();
  const defaultData = {
    labels: [...Import].map((data) => data.day.toString()),
    datasets: [
      {
        label: 'Purchased',
        data: [...Import].map((data) => data.value),
        backgroundColor: ['#FB7F4B'],
        borderColor: '#FB7F4B',
        borderWidth: 2
      },
      {
        label: 'Income',
        data: [...Export].map((data) => data.value),
        backgroundColor: ['#C4515F'],
        borderColor: '#C4515F',
        borderWidth: 2
      }
    ]
  };

  const fetchWallet = async () => {
    setIsLoading(true);
    const res = await userApi.getWallet();
    SetWallet(res);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  useEffect(() => {
    if (!wallet) {
      return;
    }
    setIsLoading(true);
    let largerGraphData: GraphData[] =
      wallet.spending.length > wallet.income.length
        ? wallet.spending
        : wallet.income;

    const labels = largerGraphData.map((spending) => {
      return spending.unit;
    });

    // Merge wallet.spending and wallet.income then sort from small to big (date/unit: '2022-10-31')

    const purchased: GraphDisplay = {
      label: 'Purchased',
      data: wallet.spending.map((x) => {
        return x.amount;
      }),
      backgroundColor: ['#FB7F4B'],
      borderColor: '#FB7F4B',
      borderWidth: 2
    };

    const sold: GraphDisplay = {
      label: 'Income',
      data: wallet.income.map((x) => {
        return x.amount;
      }),
      backgroundColor: ['#C4515F'],
      borderColor: '#C4515F',
      borderWidth: 2
    };

    let sumDataSet: GraphDisplay[] = [purchased, sold];

    setUserData({
      datasets: sumDataSet,
      labels: labels
    });
    setIsLoading(false);
  }, [wallet]);

  // const changeToYearly = async () =>
  //   setUserData({
  //     labels: [...ImportYearly].map((data) => data.month),
  //     datasets: [
  //       {
  //         label: 'Purchased',
  //         data: [...ImportYearly].map((data) => data.value),
  //         backgroundColor: ['#FB7F4B'],
  //         borderColor: '#FB7F4B',
  //         borderWidth: 2
  //       },
  //       {
  //         label: 'Income',
  //         data: [...ExportYearly].map((data) => data.value),
  //         backgroundColor: ['#C4515F'],
  //         borderColor: '#C4515F',
  //         borderWidth: 2
  //       }
  //     ]
  //   });

  // const changeToMonthly = async () =>
  //   setUserData({
  //     labels: [...Import].map((data) => data.day),
  //     datasets: [
  //       {
  //         label: 'Purchased',
  //         data: [...Import].map((data) => data.value),
  //         backgroundColor: ['#FB7F4B'],
  //         borderColor: '#FB7F4B',
  //         borderWidth: 2
  //       },
  //       {
  //         label: 'Income',
  //         data: [...Export].map((data) => data.value),
  //         backgroundColor: ['#C4515F'],
  //         borderColor: '#C4515F',
  //         borderWidth: 2
  //       }
  //     ]
  //   });

  return (
    <>
      <SideMenu />
      <div
        className="wallet-container"
        style={{
          // position: 'relative',
          display: 'grid',
          width: '70vw',
          height: '75vh',
          backgroundColor: '#ffffff',
          border: 'none',
          borderRadius: '10px',
          boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0 auto',
          // top: '7.5rem'
          float: 'none',
          position: 'fixed',
          top: '53%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div
          className="card-container"
          style={{
            float: 'none',
            position: 'absolute',
            top: '15%',
            left: '48.61%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="purchased-container">
            <div className="purchased-header">Purchased</div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img
                className="purchased-img"
                src={Purchased}
                style={{ width: '40%' }}
              ></img>
              <div className="purchased-data">
                <div className="purchased-data-info">
                  {wallet?.purchasedAppNumber}
                </div>
                <div className="purchased-data-data" style={{ width: '65%' }}>
                  License(s)
                </div>
              </div>
            </div>
          </div>
          <div className="sold-container">
            <div className="sold-header">Sold</div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img
                className="sold-img"
                src={Sold}
                style={{ width: '40%' }}
              ></img>
              <div className="sold-data">
                <div className="sold-data-info">{wallet?.soldAppNumber}</div>
                <div className="sold-data-data" style={{ width: '65%' }}>
                  License(s)
                </div>
              </div>
            </div>
          </div>
          <div className="income-container">
            <div className="income-header">Money Made</div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img
                className="income-img"
                src={Income}
                style={{ width: '40%' }}
              ></img>
              <div className="income-data">
                <div className="income-data-info">{wallet?.moneyMade}</div>
                <div className="income-data-data" style={{ width: '65%' }}>
                  {' '}
                  USD
                </div>
              </div>
            </div>
          </div>
          <div className="balance-container">
            <div className="balance-header">Total Balance</div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img
                className="balance-img"
                src={Balance}
                style={{ width: '40%' }}
              ></img>
              <div className="balance-data">
                <div className="balance-data-info">{wallet?.totalBalance}</div>
                <div className="balance-data-data" style={{ width: '65%' }}>
                  USD
                </div>
              </div>
            </div>
          </div>
          <div className="purchased-container">
            <div className="purchased-header">Money Spend</div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img
                className="purchased-img"
                src={Spend}
                style={{ width: '40%' }}
              ></img>
              <div className="purchased-data">
                <div className="purchased-data-info">{wallet?.moneySpend}</div>
                <div className="purchased-data-data" style={{ width: '65%' }}>
                  USD
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="graph"
          style={{
            display: 'flex',
            height: '330px',
            width: '95%',
            backgroundColor: '#FFF8F2',
            // left: '3%',
            bottom: '3%',
            float: 'none',
            position: 'absolute',
            top: '64.5%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="dropdown">
            <select
              onChange={(event) => {
                setSelected(event.target.value);
              }}
              value={selected}
              className="dropdown"
            >
              <option value="Monthly progress">Daily progress</option>
              <option value="Yearly progress">Weekly progress</option>
              <option value="3">Lifetime progress</option>
            </select>
          </div>
          <LineChart chartData={isNil(userData) ? defaultData : userData} />
        </div>
      </div>
    </>
  );
}

export default WalletOutline;
