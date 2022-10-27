import React from 'react';

function PurchasePopup(props) {
    return (props.trigger) ? (
        <div className="purchase-popup"
        style = {{
            postion: 'fixed',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.2)',
            display:'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <div className="purchase-popup-inner"
                style={{
                    position: 'relative',
                    padding: '20px',
                    width: '70%',
                    height: '70%',
                    marginTop: '3rem',
                    backgroundColor: '#fff',
                    borderRadius: '10px',
                    boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)',
                }}>
                <button className="close-button"
                    onClick={() => props.setTrigger(false)}
                    style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                    }}>X</button>
                { props.children }
            </div>
        </div>
    ) :  null;
}

export default PurchasePopup;