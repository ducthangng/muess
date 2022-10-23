import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../assets/css/Wallet.css'
import Import from '../components/TestData/fake_monthly_imports_data.json'
import Export from '../components/TestData/fake_monthly_sales_data.json'
import ImportYearly from '../components/TestData/fake_yearly_imports_data.json'
import ExportYearly from '../components/TestData/fake_yearly_sales_data.json'
import LineChart from '../components/LineChart/LineChart';
import Purchased from '../assets/images/purchased.gif';
import Sold from '../assets/images/sold.gif';
import Income from '../assets/images/income.gif';
import Balance from '../assets/images/balance.gif';
import { Link } from 'react-router-dom';
import SideMenu from '../components/Header/SideMenu';

function Wallet() {
    const [selected, setSelected] = useState("Monthly progress");
    const [userData, setUserData] = useState({
        labels: [...Import].map((data) => data.day),
        datasets: [
            {
                label: "Purchased",
                data: [...Import].map((data) => data.value),
                backgroundColor: [
                    "#FB7F4B",
                ],
                borderColor: "#FB7F4B",
                borderWidth: 2,
            },
            {
                label: "Income",
                data: [...Export].map((data) => data.value),
                backgroundColor: [
                    "#C4515F",
                ],
                borderColor: "#C4515F",
                borderWidth: 2,
            }
        ],
    });

    useEffect(() => {
        console.log(selected)
        if (selected === "Monthly progress") {
            changeToMonthly();
        }
        else if (selected === "Yearly progress") {
            changeToYearly();
        }
    }, [selected])



    const changeToYearly = async () => setUserData({
        labels: [...ImportYearly].map((data) => data.month),
        datasets: [
            {
                label: "Purchased",
                data: [...ImportYearly].map((data) => data.value),
                backgroundColor: [
                    "#FB7F4B",
                ],
                borderColor: "#FB7F4B",
                borderWidth: 2,
            },
            {
                label: "Income",
                data: [...ExportYearly].map((data) => data.value),
                backgroundColor: [
                    "#C4515F",
                ],
                borderColor: "#C4515F",
                borderWidth: 2,
            }
        ],


    });

    const changeToMonthly = async () => setUserData({
        labels: [...Import].map((data) => data.day),
        datasets: [
            {
                label: "Purchased",
                data: [...Import].map((data) => data.value),
                backgroundColor: [
                    "#FB7F4B",
                ],
                borderColor: "#FB7F4B",
                borderWidth: 2,
            },
            {
                label: "Income",
                data: [...Export].map((data) => data.value),
                backgroundColor: [
                    "#C4515F",
                ],
                borderColor: "#C4515F",
                borderWidth: 2,
            }
        ],


    });


    return (
        <>
            <SideMenu />
            <div className='wallet-container' style={{
                position: 'relative',
                display: 'flex',
                width: '70vw',
                height: '75vh',
                backgroundColor: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0 auto',
                top: '10vh',
            }}>
                <div className='card-container'>
                    <div className='purchased-container'>
                        <div className='purchased-header'>Total purchased</div>
                        <div style={{ display: 'flex' }}>
                            <img className='purchased-img' src={Purchased} style={{width: '40%'}}></img>
                            <div className='purchased-data'>
                                <div className='purchased-data-info'>1,234 $</div>
                                <div className='purchased-data-data'>+10% this week</div>
                            </div>
                        </div>
                    </div>
                    <div className='sold-container'>
                        <div className='sold-header'>Total Sold Product</div>
                        <div style={{ display: 'flex' }}>
                            <img className='sold-img' src={Sold} style={{width: '40%'}}></img>
                            <div className='sold-data'>
                                <div className='sold-data-info'>275</div>
                                <div className='sold-data-data'>+10% this week</div>
                            </div>
                        </div>
                    </div>
                    <div className='income-container'>
                        <div className='income-header'>Total Income</div>
                        <div style={{ display: 'flex' }}>
                            <img className='income-img' src={Income} style={{width: '40%'}}></img>
                            <div className='income-data'>
                                <div className='income-data-info'>50,057</div>
                                <div className='income-data-data'>VND</div>
                            </div>
                        </div>
                    </div>
                    <div className='balance-container'>
                        <div className='balance-header'>Total Balance</div>
                        <div style={{ display: 'flex' }}>
                            <img className='balance-img' src={Balance} style={{width: '40%'}}></img>
                            <div className='balance-data'>
                                <div className='balance-data-info'>50,057</div>
                                <div className='balance-data-data'>VND</div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='graph'
                    style={{
                        display: 'flex',
                        height: '350px',
                        width: '95%',
                        backgroundColor: '#FFF8F2',
                        left: '3%',
                        bottom: '3%'
                    }}
                >
                    <div className="dropdown">
                        <select onChange={(event) => {
                            setSelected(event.target.value);
                        }} value={selected} className='dropdown'>
                            <option value="Monthly progress">Monthly progress</option>
                            <option value="Yearly progress">Yearly progress</option>
                            <option value="3">Lifetime progress</option>
                        </select>
                    </div>
                    <LineChart
                        chartData={userData} />
                </div>
            </div>
        </>
    )
}

export default Wallet
