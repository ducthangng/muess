import '../assets/css/ReleaseApp.css'
import React from 'react'
import { Checkbox, Select } from 'antd';
import { useState } from 'react';
import MultiSelect from '../components/MultiSelect'
import DragAndDrop from '../components/DragDrop'
import TextArea from 'antd/lib/input/TextArea';
import DragAndDropMulti from '../components/DragDropMulti'

const ReleaseApp = () => {
    const [selected, setSelected] = useState([]);
    const [count, setCount] = React.useState(0);
    const [count1, setCount1] = React.useState(0);
    const options = [
        { value: 'Educational', label: 'Educational' },
        { value: 'Lifestyle', label: 'Lifestyle' },
        { value: 'SocialMedia', label: 'Social media' },
        { value: 'Productivity', label: 'Productivity' },
        { value: 'Entertainment', label: 'Entertainment' },
        { value: 'Game', label: 'Game' },
    ]



    return (
        <div className="Publish_Block">
            <div className='ReleaseTitle'>Upload an App</div>
            <div style={{ border: '1px solid #E3E3E3', position: 'relative', top: '30px' }}></div>
            <div className="release-form-1">
                <div style={{ position: 'relative', top: '45px', left: '50px', fontWeight: 900, fontSize: '16px', lineHeight: '19px', color: '#3A001E', }}>App Details</div>
                <div style={{ position: 'relative', top: '70px', left: '50px', fontWeight: 600, fontSize: '12px', lineHeight: '15px', color: '#3A001E', }}>App name</div>
                <div className='AppNameFill'>
                    <input maxLength={50} onChange={e => setCount(e.target.value.length)}></input>
                    <div style={{ position: 'relative', top: '55px', left: '150px', fontWeight: 600, fontSize: '9px', lineHeight: '11px', color: '#A3A3A3' }}>This is how your app will appear on Müss</div>
                    <div className='count1'>{count}/50</div>
                </div>
                <div className='AppOrGame'>
                    <div style={{ position: 'relative', top: '50px', left: '50px', fontWeight: 600, fontSize: '12px', lineHeight: '15px', color: '#3A001E', }}>App or game</div>
                    <div style={{ position: 'relative', top: '38px', left: '150px', fontWeight: 600, fontSize: '9px', lineHeight: '11px', color: '#A3A3A3' }}>You can change this later</div>
                    <label style={{ position: 'relative', top: '50px', left: '50px', fontWeight: 600, fontSize: '9px', lineHeight: '15px', color: '#3A001E', }}>
                        <input
                            type="radio"
                            name="choices1"
                            value="app"
                            className="form-check-input1"
                        /><div className='AppBox'>App</div>

                        <input
                            type="radio"
                            name="choices1"
                            value="game"
                            className="form-check-input2"
                        />
                        <div className='GameBox'>Game</div>
                    </label>
                </div>
                <div className='FreeOrPaidOrRent'>
                    <div style={{ position: 'relative', top: '35px', left: '50px', fontWeight: 600, fontSize: '12px', lineHeight: '15px', color: '#3A001E', }}>Free, paid or rent</div>
                    <div style={{ position: 'relative', top: '23px', left: '150px', fontWeight: 600, fontSize: '9px', lineHeight: '11px', color: '#A3A3A3' }}>You can change this later</div>
                    <label style={{ position: 'relative', top: '35px', left: '50px', fontWeight: 600, fontSize: '9px', lineHeight: '15px', color: '#3A001E', }}>
                        <input
                            type="radio"
                            name="choices2"
                            value="free"
                            className="form-check-input3"
                        /><div className='FreeBox'>Free</div>

                        <input
                            type="radio"
                            name="choices2"
                            value="game"
                            className="form-check-input4"
                        />
                        <div className='PaidBox'>Paid</div>

                        <input
                            type="radio"
                            name="choices2"
                            value="game"
                            className="form-check-input5"
                        />
                        <div className='RentBox'>Rent</div>
                    </label>
                </div>

                <div className="Appcategories">
                    <div style={{ position: 'relative', top: '0px', left: '50px', fontWeight: 600, fontSize: '12px', lineHeight: '15px', color: '#3A001E', }}>App categories</div>
                    <div style={{ position: 'relative', top: '5px', left: '50px', fontWeight: 600, fontSize: '9px', lineHeight: '11px', color: '#A3A3A3' }}>
                        Choose categories and tags that best describe the content or main functions of your app. These help </div>
                </div>
                <div style={{position: 'relative',transform: 'rotate(90deg)', left: '375px',width:'300px',top:'-100px', borderTop: '2px solid #E3E3E3'}}/>
                <div style={{ position: 'relative', top: '5px', left: '50px', fontWeight: 600, fontSize: '9px', lineHeight: '11px', color: '#A3A3A3' }}>
                    customers discover apps </div>
                <div style={{ position: 'relative', top: '20px', left: '50px', fontWeight: 600, fontSize: '12px', lineHeight: '11px', color: '#A3A3A3' }} >Category</div>
                <div style={{ position: 'relative', top: '50px', left: '50px', fontWeight: 600, fontSize: '12px', lineHeight: '11px', color: '#A3A3A3' }} >Tags</div>
                <Select options={options} placeholder={'Select a category'} style={{ width: '325px', position: 'relative', left: '150px', top: '-25px' }}></Select>
                <MultiSelect />
                
                <div className='DescBox'>
                    <div style={{ position: 'relative',top:'22px',left:'-30px', fontWeight: 1000, fontSize: '12px', lineHeight: '15px', color: '#3A001E', }}>Description</div>
                    <TextArea
                        maxLength={1000} onChange={e => setCount1(e.target.value.length)}>
                    </TextArea>
                    <div className='count2'>{count1}/1000</div>
                </div>
                <div style={{ width: '310px', position: 'relative', left: '670px', top: '-360px' }}>
                    <div style={{position: 'relative',top:'28px',left:'-100px', fontWeight: 1000, fontSize: '12px', lineHeight: '15px', color: '#3A001E'}}>App icon</div>
                    <DragAndDrop />
                </div>
                <div style={{ width: '310px', position: 'relative', left: '670px', top: '-360px' }}>
                <div style={{position: 'relative',top:'28px',left:'-100px', fontWeight: 1000, fontSize: '12px', lineHeight: '15px', color: '#3A001E'}}>Images</div>
                    <DragAndDropMulti/>
                </div>
                <button style={{backgroundColor: '#FB7F4B', color:'white', fontSize:'15px',position: 'relative', top: '-370px', left:'485px', borderRadius: '5px', width: '80px', height: '30px'}}>Release</button>

            </div>
        </div>
    );
};
export default ReleaseApp;