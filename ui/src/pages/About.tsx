import '../assets/css/ReleaseApp.css';
import React from 'react';
import { Checkbox, Select } from 'antd';
import { useState } from 'react';
import MultiSelect from '../components/MultiSelect';
import DragAndDrop from '../components/DragDrop';
import TextArea from 'antd/lib/input/TextArea';
import DragAndDropMulti from '../components/DragDropMulti';
import SideMenu from '../components/Header/SideMenu';
import AboutImage from '../assets/images/about.png';

const About = () => {
  const [selected, setSelected] = useState([]);
  const [count, setCount] = React.useState(0);
  const [count1, setCount1] = React.useState(0);
  const options = [
    { value: 'Educational', label: 'Educational' },
    { value: 'Lifestyle', label: 'Lifestyle' },
    { value: 'SocialMedia', label: 'Social media' },
    { value: 'Productivity', label: 'Productivity' },
    { value: 'Entertainment', label: 'Entertainment' },
    { value: 'Game', label: 'Game' }
  ];

  return (
    <>
      <SideMenu />
      <div
        className="about-container"
        style={{
          position: 'relative',
          width: '1600px',
          height: '820px',
          backgroundColor: '#white',
          border: 'none',
          borderRadius: '10px',
          boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
          margin: '0 auto'
        }}
      >
        <div className="content-left">
          <img
            src={AboutImage}
            alt="Image"
            style={{
              position: 'relative',
              top: 100,
              left: -5
            }}
          />
        </div>
        <div className="content-right"></div>
      </div>
    </>
  );
};
export default About;
