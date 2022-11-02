import React, { useState } from 'react';
import '../assets/css/PurchasePopup.css';
import useCollapse from 'react-collapsed';
import Checkbox from './Checkbox';
import MultiSelectDetails from '../components/MultiSelectDetail';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginLogo from '../assets/images/logo.svg';
import MultiSelect from './MultiSelect';
import { App } from '../models/AppDetailData';
import { User } from '../models/User';
import { proposalApi } from '../api/proposalApi';
import { useGlobalContext } from '../context/global/GlobalContext';

function PurchasePopup(props) {
  const { setIsLoading } = useGlobalContext();
  const licenseDetailsOptions = [
    { value: 'noncommercial_use', label: 'Noncommercial Use' },
    { value: 'commercial_use', label: 'Commercial Use' },
    { value: 'resell', label: 'Resell license' },
    { value: 'read', label: 'Read Source Code' },
    { value: 'modify', label: 'Modify Source Code' },
    { value: 'derivative', label: 'Sell derivatives' }
  ];

  const app: App = props.AppDetails;
  const user: User = props.Creator;
  const [price, setPrice] = useState(0);
  const [checked, setCheck] = useState(false);
  const [details, setDetails] = useState([] as string[]);

  const handleLicenseDetailsChange = (value: string[]) => {
    console.log(`selected ${value}`);
    setDetails(value);
  };

  const notify = () =>
    toast.success(
      'Your offer has been sent to the creator. You will be redirect shortly...',
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

  const notifyFailure = () =>
    toast.error(
      'Your offer has not been accepted. Please review your proposal and rey again',
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

  const redirect = async () => {
    console.log('price: ', price);
    console.log('check: ', checked);
    console.log('details: ', details);

    if (price === 0 || details.length === 0) {
      notifyFailure();
      return;
    }

    setIsLoading(true);
    const result = await proposalApi.createProposal({
      appId: app.Record.assetId,
      proposedPrice: price,
      licenseDetails: details.toString()
    });
    setIsLoading(false);
    if (result === 'created') {
      notify();
      setTimeout(() => {
        navigate('/purchases');
      }, 6000);
    } else {
      notifyFailure();
    }
  };

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
          position: 'absolute',
          float: 'right',
          top: '10%',
          right: '10%'
        }}
      >
        X
      </button>
      {props.children}
      <div
        className="purchase-popup-inner"
        style={{
          position: 'relative',
          // padding: '20px',
          width: '80%',
          height: '80%',
          marginTop: '3rem',
          backgroundColor: '#fff',
          borderRadius: '5px',
          boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)',
          overflowY: 'auto'
        }}
      >
        <div
          className="header-section"
          style={{
            display: 'flex',
            position: 'relative',
            width: '100%',
            height: '15%',
            backgroundColor: 'white',
            borderBottom: '1px solid #E3E3E3'
          }}
        >
          <img
            src={LoginLogo}
            alt="logo"
            style={{
              width: '10%',
              height: '50%',
              display: 'flex',
              position: 'absolute',
              top: '25%',
              left: '3%'
              // margin: '0 auto',
            }}
          />
          <div
            style={{
              borderLeft: '1px solid #E3E3E3',
              height: '30%',
              position: 'absolute',
              left: '13%',
              top: '35%'
            }}
          ></div>
          <div
            className="purchase-popup-container-header"
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#3A001E',
              position: 'absolute',
              height: '60%',
              left: '15%',
              top: '30%'
            }}
          >
            Order Summary
          </div>
        </div>

        <div className="detail-section" style={{ display: 'flex' }}>
          <div style={{ width: '50%' }}>
            <div
              className="purchase-popup-container-body-app-desired-price-header"
              style={{
                fontSize: '1rem',
                fontWeight: 'bold',
                color: '#3A001E',
                margin: '1rem 1.5rem'
              }}
            >
              1. Order Options:
            </div>
            <div
              className="section order-section"
              style={{
                width: '92.5%',
                height: 'fit-content',
                margin: '3% 2.5% 3% 5%',
                border: '1px solid #E3E3E3',
                padding: '1%',
                borderRadius: '5px'
              }}
            >
              <div style={{ padding: '1rem' }}>
                <div
                  className="purchase-popup-container-body-app-desired-price"
                  style={{
                    display: 'flex'
                  }}
                >
                  <div
                    className="purchase-popup-container-body-app-desired-price-label"
                    style={{
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      color: '#3A001E'
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
                        width: '5rem',
                        height: '2rem',
                        borderRadius: '10px',
                        marginLeft: '0.5rem',
                        fontSize: '1rem',
                        border: '1px solid #FB7F4B'
                      }}
                      value={price}
                      onChange={(e) => setPrice(parseInt(e.target.value))}
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
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      color: '#3A001E'
                    }}
                  >
                    Please select the service you want to be provided:
                  </div>
                  <div className="py-3">
                    {/* <MultiSelectDetails /> */}
                    <MultiSelect
                      options={licenseDetailsOptions}
                      handleChange={handleLicenseDetailsChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="purchase-popup-container-body-app-desired-price-header"
              style={{
                fontSize: '1rem',
                fontWeight: 'bold',
                color: '#3A001E',
                margin: '2rem 1.5rem 1rem 1.5rem'
              }}
            >
              2. Order Policies:
            </div>
            <div
              className="section policy-section"
              style={{
                width: '92.5%',
                height: 'fit-content',
                margin: '3% 2.5% 3% 5%',
                border: '1px solid #E3E3E3',
                padding: '1%',
                borderRadius: '5px'
              }}
            >
              <div style={{ padding: '1rem' }}>
                <div className="purchase-popup-container-body-app-policy">
                  <div
                    className="purchase-popup-container-body-app-policy-label"
                    style={{
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      color: '#3A001E'
                    }}
                  >
                    Please read and accept our policy before buy:
                  </div>
                  <div className="purchase-popup-container-body-app-policy-content">
                    <div
                      className="policy"
                      style={{
                        backgroundColor: '#dddddd',
                        fontSize: '1rem',
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
                          fontSize: '1rem',
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
                        ) (the "Privacy Policy") that is incorporated by
                        reference into these Terms. If you don't agree to be
                        bound by these Terms, do not use the Game or Services.
                        If you are accessing or using the Game or Services on
                        behalf of a company (such as your employer) or other
                        legal entity, you represent and warrant that you have
                        the authority to bind that company or other legal entity
                        to these Terms. In that case, "you" and "your" will
                        refer to that company or other legal entity. Otherwise,
                        "you" and "your" will refer to you, individually.
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
                        personal non-commercial use for gameplay. The term of
                        your license begins on the date that you install or
                        otherwise use the Game and ends on the earlier date of
                        either your disposal of the Game or Munich Software as
                        Service Inc's termination of this Agreement. Your
                        license terminates immediately if you attempt to
                        circumvent any technical protection measures used in
                        connection with the Game or if you violate these Terms.
                        The Game is being licensed to you and you hereby
                        acknowledge that no title or ownership in the Game is
                        being transferred or assigned and these Terms should not
                        be construed as a sale of any rights in the Game. All
                        rights not specifically granted under these Terms are
                        reserved by Munich Software as Service Inc.
                      </div>
                    </div>
                    <div
                      className="purchase-popup-container-body-app-policy-checkbox"
                      style={{ marginTop: '1rem' }}
                    >
                      <div
                        className="checkbox-wrapper"
                        style={{ display: 'flex' }}
                      >
                        <input
                          type="checkbox"
                          style={{
                            display: 'flex',
                            width: '1.25rem',
                            height: '1.25rem',
                            margin: '0.5rem'
                          }}
                          onChange={(e) => setCheck(e.target.checked)}
                        />
                        <span
                          style={{
                            display: 'flex',
                            margin: '0.5rem',
                            fontWeight: 'bold',
                            fontSize: '1rem'
                          }}
                        >
                          {'I have read and accept the policy.'}
                        </span>
                      </div>
                      {/* <Checkbox label="I have read and accept the policy." /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ width: '50%' }}>
            <div
              className="purchase-popup-container-body-app-desired-price-header"
              style={{
                fontSize: '1rem',
                fontWeight: 'bold',
                color: '#3A001E',
                margin: '1rem 0 1rem 0.5rem'
              }}
            >
              3. Order Detail:
            </div>
            <div
              className="section detail-section"
              style={{
                width: '92.5%',
                height: 'fit-content',
                margin: '0 5% 3% 2.5%',
                border: '1px solid #E3E3E3',
                padding: '1%',
                borderRadius: '5px',
                float: 'right',
                position: 'relative'
              }}
            >
              <div style={{ padding: '1rem' }}>
                <div
                  className="purchase-popup-container-body-app-name"
                  style={{
                    display: 'flex'
                  }}
                >
                  <div
                    className="purchase-popup-container-body-app-name-label"
                    style={{
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      color: '#3A001E'
                    }}
                  >
                    App Name:
                  </div>
                  <div
                    className="purchase-popup-container-body-app-name-value"
                    style={{
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      marginLeft: '0.5rem',
                      color: '#FB7F4B'
                    }}
                  >
                    {app.Record.title}
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
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      color: '#3A001E'
                    }}
                  >
                    App Author:
                  </div>
                  <div
                    className="purchase-popup-container-body-app-author-value"
                    style={{
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      marginLeft: '0.5rem',
                      color: '#FB7F4B'
                    }}
                  >
                    {user.fullname}
                  </div>
                </div>

                <img
                  src={app.Record.appIconURL}
                  alt={'sample'}
                  style={{
                    width: '80px',
                    height: '80px',
                    backgroundImage: app.Record.appIconURL,
                    float: 'right',
                    position: 'absolute',
                    margin: '1rem',
                    top: '0',
                    borderRadius: '10px',
                    right: '0',
                    objectFit: 'cover'
                  }}
                ></img>
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
                      height: '2rem',
                      width: '30%',
                      borderRadius: '5px',
                      position: 'relative',
                      marginTop: '1rem',
                      margin: '0 auto'
                    }}
                    onClick={(event) => {
                      event.preventDefault();
                      redirect();
                    }}
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
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default PurchasePopup;
