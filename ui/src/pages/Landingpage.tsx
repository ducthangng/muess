import { lazy } from 'react';

//import file json data
import IntroButton from '../api/IntroButton.json';
import DeveloperImg from '../assets/images/welcome.svg';
import { useNavigate } from 'react-router-dom';

import { Styles } from './Styles/styles';

const Landingpage = () => {
  let navigate = useNavigate();
  return (
    // <Container>
    //   <Styles />
    //   {/* <SideMenu /> */}
    //   <ContentBlock
    //     type="left"
    //     title={IntroButton.title}
    //     content={IntroButton.text}
    //     button={IntroButton.button}
    //     icon="developer.svg"
    //     id="intro"
    //   ><button onClick={() => console.log('hello')}>Click me</button></ContentBlock>

    // </Container>
    <><div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div className='first-part-landing' style={{
        width: '50%', height: '100vh', margin: '0 auto', display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <img src={DeveloperImg} alt="welcome" style={{
          width: '40vw', height: 'auto', display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }} />
      </div>
      <div className='second-part-landing' style={{
        width: '50%', height: '100vh', margin: '0 auto', justifyContent: 'center',
        alignItems: 'center',
      }}>
        <div className='second-part-container' style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <h1 style={{ color: '#FB7F4B', fontSize: '50px', fontWeight: '600', width: '50vw', justifyContent: 'center', marginTop: '13rem' }} >Munich Software as Service</h1>
          <p style={{ color: '#3A001E', fontSize: '20px', width: '43vw', justifyContent: 'center', textAlign: 'justify' }}>Welcome to our application. MÜSS is a software where customer can access to limited apps from providers and select which ever services they desired with a negociable price.</p>
          <p style={{ color: '#3A001E', fontSize: '20px', width: '43vw', justifyContent: 'center' }}>To start using our platform and enjoy all the perks, please log in. Don't have an account? Don't worry, you can register as a user today.</p>
          <div
            style={{
              width:'43vw',
              display: 'flex',
              alignItems:'center',
              justifyContent:'center',
            }}>
            <button style={{ justifyContent: 'center', color: 'white', fontSize: '20px', backgroundColor: '#FB7F4B', padding: '8px 38px', borderRadius: '8px', fontWeight: '600', textAlign: 'justify' }} onClick={() => navigate('/login')}>Sign in</button>
            <button style={{ justifyContent: 'center', color: 'white', fontSize: '20px', backgroundColor: '#FB7F4B', padding: '8px 38px', borderRadius: '8px', fontWeight: '600', textAlign: 'justify', marginLeft:'3rem'}} onClick={() => navigate('/register')}>Register</button>
          </div>

        </div>

      </div>
    </div>

    </>
  );
};

export default Landingpage;
