import React from 'react';
import '../assets/css/PurchasePopup.css';
import useCollapse from 'react-collapsed';
import Checkbox from './Checkbox';
import MultiSelectDetails from '../components/MultiSelectDetail';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PurchasePopup(props) {
  const notify = () =>
    toast.success(
      'Your offer has been accepted. You will be redirect shortly...',
      {
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      }
    );

  let navigate = useNavigate();

  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  return props.trigger ? (
    <div
      className="purchase-popup"
      style={{
        position: 'fixed',
        zIndex: '999',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.2)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div
        className="purchase-popup-inner"
        style={{
          position: 'relative',
          padding: '20px',
          width: '50%',
          height: '80%',
          marginTop: '3rem',
          backgroundColor: '#fff',
          borderRadius: '10px',
          boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)',
          overflowY: 'auto'
        }}
      >
        <button
          className="close-button"
          onClick={() => props.setTrigger(false)}
          style={{
            background: '#DCE1EE',
            color: '#2E384D',
            fontWeight: 400,
            fontSize: '12px',
            height: '20px',
            width: '20px',
            borderRadius: '50%',
            position: 'relative',
            float: 'right',
            top: '5%',
            right: '5%'
          }}
        >
          X
        </button>
        {props.children}

        <form>
          <div className="purchase-popup-container">
            <div
              className="purchase-popup-container-header"
              style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#3A001E'
              }}
            >
              Order Summary
            </div>
            <div
              className="purchase-popup-container-subheader"
              style={{
                fontSize: '1rem',
                fontWeight: '500',
                color: '#A3A3A3'
              }}
            >
              Please confirm your order before placing.
            </div>
            <div
              style={{
                borderTop: '1px solid #E3E3E3',
                position: 'relative',
                marginTop: '1rem'
              }}
            ></div>
            <div
              className="purchase-popup-container-body"
              style={{
                marginTop: '1rem'
              }}
            >
              <div
                className="purchase-popup-container-body-app-name"
                style={{
                  display: 'flex',
                  marginTop: '1rem'
                }}
              >
                <div
                  className="purchase-popup-container-body-app-name-label"
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: '#3A001E'
                  }}
                >
                  App Name:
                </div>
                <div
                  className="purchase-popup-container-body-app-name-value"
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    marginLeft: '0.5rem',
                    color: '#FB7F4B'
                  }}
                >
                  App 1
                </div>
              </div>
              <div
                className="purchase-popup-container-body-app-author"
                style={{
                  display: 'flex',
                  marginTop: '1rem'
                }}
              >
                <div
                  className="purchase-popup-container-body-app-author-label"
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: '#3A001E'
                  }}
                >
                  App Author:
                </div>
                <div
                  className="purchase-popup-container-body-app-author-value"
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    marginLeft: '0.5rem',
                    color: '#FB7F4B'
                  }}
                >
                  Nha cai uy tin
                </div>
              </div>
              <div
                className="purchase-popup-container-body-app-desired-price"
                style={{
                  display: 'flex',
                  marginTop: '0.5rem'
                }}
              >
                <div
                  className="purchase-popup-container-body-app-desired-price-label"
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: '#3A001E',
                    padding: '0.5rem 0'
                  }}
                >
                  Enter your desired price (in $):
                </div>
                <div className="purchase-popup-container-body-app-desired-price-value">
                  <input
                    className="purchase-popup-container-body-app-desired-price-value-input"
                    type="number"
                    defaultValue={0}
                    max={100}
                    min="0"
                    style={{
                      width: '3rem',
                      height: '2.5rem',
                      borderRadius: '10px',
                      marginLeft: '0.5rem',
                      fontSize: '1.25rem',
                      border: '1px solid #FB7F4B'
                    }}
                    required
                  />
                </div>
              </div>
              <div
                className="purchase-popup-container-body-app-desired-serive"
                style={{ marginTop: '1rem' }}
              >
                <div
                  className="purchase-popup-container-body-app-desired-serive-label"
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: '#3A001E'
                  }}
                >
                  Please select the service you want to be provided:
                </div>
                <div className="purchase-popup-container-body-app-desired-serive-value">
                  <MultiSelectDetails />
                </div>
              </div>
              <div className="purchase-popup-container-body-app-policy">
                <div
                  className="purchase-popup-container-body-app-policy-label"
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: '#3A001E',
                    marginTop: '1rem'
                  }}
                >
                  Please read and accept our policy before buy:
                </div>
                <div className="purchase-popup-container-body-app-policy-content">
                  <div
                    className="policy"
                    style={{
                      backgroundColor: '#dddddd',
                      fontSize: '1.25rem',
                      fontWeight: 'bold',
                      padding: '1rem',
                      cursor: 'pointer',
                      marginTop: '0.5rem'
                    }}
                    {...getToggleProps()}
                  >
                    {isExpanded ? 'Policy of Services' : 'Policy of Services'}
                  </div>
                  <div {...getCollapseProps()}>
                    <div
                      className="policy-content1"
                      style={{
                        padding: '1.5rem 1rem 1rem 1rem',
                        backgroundColor: '#eeeeee',
                        fontSize: '1.15rem',
                        fontWeight: 'bold',
                        color: '#FB7F4B'
                      }}
                    >
                      Agreement to Terms
                    </div>
                    <div
                      className="policy-content2"
                      style={{
                        padding: '0 1rem 1rem 1rem',
                        backgroundColor: '#eeeeee'
                      }}
                    >
                      By using the Game and/or Services, you agree to be bound
                      by these Terms and the Privacy Policy (available at{' '}
                      <a
                        style={{ display: 'inline' }}
                        href="https://www.recroom.com/privacy-policy"
                        target="_blank"
                        rel="noreferrer"
                      >
                        https://www.recroom.com/privacy-policy
                      </a>{' '}
                      ) (the "Privacy Policy") that is incorporated by reference
                      into these Terms. If you don't agree to be bound by these
                      Terms, do not use the Game or Services. If you are
                      accessing or using the Game or Services on behalf of a
                      company (such as your employer) or other legal entity, you
                      represent and warrant that you have the authority to bind
                      that company or other legal entity to these Terms. In that
                      case, "you" and "your" will refer to that company or other
                      legal entity. Otherwise, "you" and "your" will refer to
                      you, individually.
                    </div>
                    <div
                      className="policy-content3"
                      style={{
                        padding: '1rem',
                        backgroundColor: '#eeeeee',
                        fontSize: '1.15rem',
                        fontWeight: 'bold',
                        color: '#FB7F4B'
                      }}
                    >
                      Grant of License
                    </div>
                    <div
                      className="policy-content4"
                      style={{
                        padding: '0 1rem 1rem 1rem',
                        backgroundColor: '#eeeeee'
                      }}
                    >
                      Subject to these Terms, Munich Software as Service Inc
                      grants you a nonexclusive, non-sublicensable, limited
                      right and license to use one copy of the Game for your
                      personal non-commercial use for gameplay. The term of your
                      license begins on the date that you install or otherwise
                      use the Game and ends on the earlier date of either your
                      disposal of the Game or Munich Software as Service Inc's
                      termination of this Agreement. Your license terminates
                      immediately if you attempt to circumvent any technical
                      protection measures used in connection with the Game or if
                      you violate these Terms. The Game is being licensed to you
                      and you hereby acknowledge that no title or ownership in
                      the Game is being transferred or assigned and these Terms
                      should not be construed as a sale of any rights in the
                      Game. All rights not specifically granted under these
                      Terms are reserved by Munich Software as Service Inc.
                    </div>
                  </div>
                  <div
                    className="purchase-popup-container-body-app-policy-checkbox"
                    style={{ marginTop: '1rem' }}
                  >
                    <Checkbox label="I have read and accept the policy." />
                  </div>
                </div>
              </div>
              <div
                className="purchase-popup-container-body-app-button"
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginTop: '1rem'
                }}
              >
                <button
                  type="submit"
                  className="placeorder_button"
                  style={{
                    background: '#FB7F4B',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: '16px',
                    lineHeight: '15px',
                    height: '2.5rem',
                    width: '20%',
                    borderRadius: '5px',
                    position: 'relative',
                    marginTop: '1.2rem',
                    margin: '0 auto'
                  }}
                  // onClick={() => {
                  //   notify
                  // }}
                >
                  {' '}
                  Place order
                </button>
                <ToastContainer
                  position="bottom-left"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  ) : null;
}

export default PurchasePopup;
