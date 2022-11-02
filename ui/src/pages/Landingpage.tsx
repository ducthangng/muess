import { lazy } from 'react';

//import file json data
import IntroButton from '../api/IntroButton.json';
import DeveloperImg from '../assets/images/welcome.svg';
import { useNavigate } from 'react-router-dom';

import { Styles } from './Styles/styles';
import SideMenu from '../components/Header/SideMenu';

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
    <div className="w-screen h-screen grid grid-cols-2 px-10">
      <div className="flex justify-center items-center">
        <img
          src={DeveloperImg}
          alt="welcome"
          style={{
            width: '40vw',
            height: 'auto'
          }}
        />
      </div>
      <div className="flex flex-col justify-center items-center text-lg">
        <h1 className="text-[#FB7F4B] font-bold text-4xl">
          Munich Software as a Service
        </h1>
        <p>
          Welcome to our application. MÜSS is a software where customer can
          access to limited apps from providers and select which ever services
          they desired with a negociable price.
        </p>
        <p>
          To start using our platform and enjoy all the perks, please log in.
          Don't have an account? Don't worry, you can register as a user today.
        </p>
        <div className="flex gap-5">
          <button
            style={{
              color: 'white',
              fontSize: '1.2rem',
              backgroundColor: '#FB7F4B',
              padding: '8px 38px',
              borderRadius: '8px',
              fontWeight: '600'
            }}
            onClick={() => navigate('/login')}
          >
            Sign in
          </button>
          <button
            style={{
              color: 'white',
              fontSize: '1.2rem',
              backgroundColor: '#FB7F4B',
              padding: '8px 38px',
              borderRadius: '8px',
              fontWeight: '600',
              textAlign: 'justify'
            }}
            onClick={() => navigate('/register')}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landingpage;
