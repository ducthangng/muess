import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../assets/css/Wallet.css'
import Import from '../components/TestData/fake_monthly_imports_data.json'
import Export from '../components/TestData/fake_monthly_sales_data.json'
import ImportYearly from '../components/TestData/fake_yearly_imports_data.json'
import ExportYearly from '../components/TestData/fake_yearly_sales_data.json'
import LineChart from '../components/LineChart/LineChart';
import Medicine from '../assets/images/medicine.png'
import Sold from '../assets/images/sold.png'
import Money from '../assets/images/money.png'
import { Link } from 'react-router-dom';
import SideMenu from '../components/Header/SideMenu';

function Reports() {
    const [selected, setSelected] = useState("Monthly progress");
    const [userData, setUserData] = useState({
        labels: [...Import].map((data) => data.day),
        datasets: [
            {
                label: "Import",
                data: [...Import].map((data) => data.value),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                ],
                borderColor: "rgba(75,192,192,1)",
                borderWidth: 2,
            },
            {
                label: "Export",
                data: [...Export].map((data) => data.value),
                backgroundColor: [
                    "#0A3C6C",
                ],
                borderColor: "#0A3C6C",
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
                label: "Import",
                data: [...ImportYearly].map((data) => data.value),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                ],
                borderColor: "rgba(75,192,192,1)",
                borderWidth: 2,
            },
            {
                label: "Export",
                data: [...ExportYearly].map((data) => data.value),
                backgroundColor: [
                    "#0A3C6C",
                ],
                borderColor: "#0A3C6C",
                borderWidth: 2,
            }
        ],


    });

    const changeToMonthly = async () => setUserData({
        labels: [...Import].map((data) => data.day),
        datasets: [
            {
                label: "Import",
                data: [...Import].map((data) => data.value),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                ],
                borderColor: "rgba(75,192,192,1)",
                borderWidth: 2,
            },
            {
                label: "Export",
                data: [...Export].map((data) => data.value),
                backgroundColor: [
                    "#0A3C6C",
                ],
                borderColor: "#0A3C6C",
                borderWidth: 2,
            }
        ],


    });


    return (
        <>
            <SideMenu />
            <div className='wallet-container' style={{ position: 'relative',
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
                    top: '10vh',}}>
                <div className='import-container'>
                    <div className='header'>Total purchased</div>
                    <img src={Medicine}></img>
                    <div className='import-data'>
                        <div className='import-data-info'>1,134 $</div>
                        <div className='import-data-data'>+10% this week</div>
                    </div>
                </div>
                <div className='export-container'>
                    <div className='header'>Total Sold Product</div>
                    <img src={Sold}></img>
                    <div className='export-data'>
                        <div className='export-data-info'>275 items</div>
                        <div className='export-data-data'>+10% this week</div>
                    </div>
                </div>
                <div className='earning-container'>
                    <div className='header'>Total Earning</div>
                    <img src={Money}></img>
                    <div className='earning-data'>
                        <div className='earning-data-info'>50,057</div>
                        <div className='earning-data-data'>VND</div>
                    </div>
                </div>
                <div className='graph' style={{display: 'flex', height: '350px',width:'95%', backgroundColor:'#FFF7F1', left: '3%', bottom: '3%'}}>
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
                        chartData={userData}/>
                </div>
            </div>

        </>
    )
}

export default Reports
