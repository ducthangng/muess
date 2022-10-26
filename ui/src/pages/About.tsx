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
        className="about-container"
        style={{
          position: 'relative',
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
          top: '7.5rem'
        }}
      >
        <div
          className="content-left"
          style={{
            width: '50%',
            height: '100%',
            margin: '0 auto'
          }}
        >
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
        <div
          className="content-right"
          style={{
            width: '50%',
            height: '100%',
            margin: '0 auto',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <div
            className="content-right-context"
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              margin: '2.5rem 2rem'
            }}
          >
            <div
              className="content-right__title1"
              style={{
                color: '#3A001E',
                fontSize: '40px'
              }}
            >
              {' '}
              THANK YOU FOR USING
            </div>
            <div
              className="content-right__title2"
              style={{
                color: '#3A001E',
                fontSize: '40px',
                fontWeight: '600'
              }}
            >
              {' '}
              OUR PRODUCT
            </div>
            <div
              className="content-right-text"
              style={{
                color: '#9E897A',
                fontSize: '16px',
                marginTop: '1rem',
                marginRight: '1rem'
              }}
            >
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam
              est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
              velit, sed quia non numquam eius modi tempora incidunt ut labore
              et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima
              veniam, quis nostrum exercitationem ullam corporis suscipit
              laboriosam, nisi ut aliquid ex ea commodi consequatur?
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default About;
