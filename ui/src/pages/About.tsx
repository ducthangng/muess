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
  return (
    <>
      <SideMenu />
      <div
        className="about-container px-10 grid grid-cols-2"
        style={{
          position: 'relative',
          width: '70vw',
          height: '75vh',
          backgroundColor: '#ffffff',
          border: 'none',
          borderRadius: '10px',
          boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0 auto',
          top: '7.5rem'
        }}
      >
        <div>
          <img
            src={AboutImage}
            alt="Image"
            style={{
              width: '100%',
              height: '100%',
              padding: '5vh'
              // margin: '0 auto',
            }}
          />
        </div>
        <div className="flex flex-col gap-3 items-center justify-center">
          <div className="text-2xl font-bold">Thanks for using our product</div>
          <div className="text-xl">München - MÜSS</div>
          <div className="text-center text-[15px] flex flex-col gap-3 my-3">
            <div>Cao Xuân Hải</div>
            <div>Nguyễn Phú Khang</div>
            <div>Ngô Phúc Linh</div>
            <div>Bùi Nhiên Lộc</div>
            <div>Hứa Nhật Gia Nghi</div>
            <div>Nguyễn Đức Thắng</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default About;
