import '../assets/css/ReleaseApp.css'
import React from 'react'
import { Checkbox } from 'antd';

const ReleaseApp = () => {
    const [count, setCount] = React.useState(0);
    return (
        <div className="Publish_Block">
            <div className='ReleaseTitle'>Upload an App</div>
            <div style={{ border: '1px solid #E3E3E3', position: 'relative', top: '50px' }}></div>
            <div style={{ position: 'relative', top: '80px', left: '50px', fontWeight: 900, fontSize: '16px', lineHeight: '19px', color: '#3A001E', }}>App Details</div>
            <div style={{ position: 'relative', top: '105px', left: '50px', fontWeight: 600, fontSize: '12px', lineHeight: '15px', color: '#3A001E', }}>App name</div>
            <div className='AppNameFill'>
                <input maxLength={50} onChange={e => setCount(e.target.value.length)}></input>
                <div style={{ position: 'relative', top: '89px', left: '150px', fontWeight: 600, fontSize: '11px', lineHeight: '11px', color: '#A3A3A3' }}>This is how your app will appear on Müss</div>
                <div className='count1'>{count}/50</div>
            </div>
            <div className='AppOrGame'>
                <div style={{ position: 'relative', top: '105px', left: '50px', fontWeight: 600, fontSize: '12px', lineHeight: '15px', color: '#3A001E', }}>App or game</div>
                <div style={{ position: 'relative', top: '92px', left: '150px', fontWeight: 600, fontSize: '11px', lineHeight: '11px', color: '#A3A3A3' }}>You can change this later</div>
                <label style={{ position: 'relative', top: '105px', left: '50px', fontWeight: 600, fontSize: '12px', lineHeight: '15px', color: '#3A001E', }}>
                    <input
                        type="radio"
                        name="react-tips"
                        value="app"
                        className="form-check-input1"
                    /><div className='AppBox'>App</div>
                    
                    <input
                        type="radio"
                        name="react-tips"
                        value="game"
                        className="form-check-input2"
                    />
                    <div className='GameBox'>Game</div>
                </label>
            </div>
        </div>
    );
};
export default ReleaseApp;