import '../assets/css/ReleaseApp.css';
import React, { useEffect } from 'react';
import { Checkbox, Divider, Select } from 'antd';
import { useState } from 'react';
import MultiSelect from '../components/MultiSelect';
import DragAndDrop from '../components/DragDrop';
import TextArea from 'antd/lib/input/TextArea';
import DragAndDropMulti from '../components/DragDropMulti';
import SideMenu from '../components/Header/SideMenu';
import { appApi } from '../api/appApi';
import { App, CreateAppData } from '../models/AppDetailData';
import { useNavigate } from 'react-router-dom';
import { TagsInput } from 'react-tag-input-component';
const { Option } = Select;

const categoriesOptions = [
  { value: 'educational', label: 'Educational' },
  { value: 'lifestyle', label: 'Lifestyle' },
  { value: 'social_media', label: 'Social Media' },
  { value: 'productivity', label: 'Productivity' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'game', label: 'Game' }
];

const ratingOptions = [
  { value: 'pegi3', label: 'PEGI 3 - Suitable for all ages' },
  { value: 'pegi7', label: 'PEGI 7 - Suitable for young children' },
  { value: 'pegi12', label: 'PEGI 12 - Suitable for children 12 and over' },
  { value: 'pegi16', label: 'PEGI 16 - Suitable for children 16 and over' },
  { value: 'pegi18', label: 'PEGI18 - Only suitable for adults' }
];

const ReleaseApp = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const [appType, setAppType] = useState('');
  const [appPaymentMethod, setAppPaymentMethod] = useState('');
  const [appCategories, setAppCategories] = useState<string[]>([]);
  const [appImage, setAppImage] = useState('');
  const [appTags, setAppTags] = useState([] as string[]);
  const [titleCount, setTitleCount] = React.useState(0);
  const [descriptionCount, setDescriptionCount] = React.useState(0);
  let navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const req: CreateAppData = {
      title,
      description,
      appType,
      appTags,
      paymentMethod: appPaymentMethod,
      appCategories: appCategories,
      rating: rating,
      appIconURL: appImage
    };

    console.log(req);

    appApi.releaseApp({ app: req }).then((status) => {
      if (status) {
        // proceed success
        navigate('/products');
      }

      // proceed fail
    });
  };

  const handleCategoriesChange = (value: string[]) => {
    setAppCategories(value);
  };

  const handleRatingChange = (value: string) => {
    setRating(value);
  };

  return (
    <>
      <SideMenu />
      <div
        className="Publish_Block py-10"
        style={{
          float: 'none',
          position: 'absolute',
          top: '53%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="px-10">
          <p
            style={{
              fontWeight: 600,
              fontSize: '18px',
              lineHeight: '24px',
              color: '#3a001e'
            }}
          >
            Upload an App
          </p>
        </div>
        <div
          style={{
            border: '1px solid #E3E3E3',
            marginBottom: '15px'
          }}
        />
        <div className="px-10">
          <p
            style={{
              fontWeight: 600,
              fontSize: '16px',
              lineHeight: '24px',
              color: '#3a001e'
            }}
          >
            App Details
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="px-10 grid grid-cols-2 gap-20">
            {/* Left Side */}
            <div className="flex flex-col gap-3">
              {/* Name */}
              <div className="grid grid-cols-12 h-full">
                <div
                  className="col-span-3"
                  style={{
                    fontWeight: 700,
                    fontSize: '12px',
                    color: '#3A001E'
                  }}
                >
                  App Name
                </div>
                <div className="col-span-9 h-full flex flex-col gap-1">
                  <input
                    required
                    className="h-full"
                    maxLength={50}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      setTitleCount(e.target.value.length);
                    }}
                    value={title}
                  />
                  <div className="flex justify-between">
                    <small
                      style={{
                        fontWeight: 700,
                        fontSize: '9px',
                        color: '#A3A3A3'
                      }}
                    >
                      This is how your app will appear on Müss
                    </small>
                    <small>{titleCount}/50</small>
                  </div>
                </div>
              </div>
              {/* Type */}
              <div className="grid grid-cols-12 h-full">
                <div
                  className="col-span-3"
                  style={{
                    fontWeight: 700,
                    fontSize: '12px',
                    color: '#3A001E'
                  }}
                >
                  Type
                </div>
                <div className="col-span-9 h-full flex gap-10">
                  <div className="flex gap-1">
                    <input
                      type="radio"
                      name="app_choice"
                      value="app"
                      checked={appType === 'app'}
                      onChange={(e) => setAppType('app')}
                    />
                    <p>App</p>
                  </div>
                  <div className="flex gap-1">
                    <input
                      type="radio"
                      name="game_choice"
                      value="game"
                      checked={appType === 'game'}
                      onChange={(e) => setAppType('game')}
                    />
                    <p>Game</p>
                  </div>
                </div>
              </div>
              {/* Payment */}
              <div className="grid grid-cols-12 h-full">
                <div
                  className="col-span-3"
                  style={{
                    fontWeight: 700,
                    fontSize: '12px',
                    color: '#3A001E'
                  }}
                >
                  Payment via
                </div>
                <div className="col-span-9 h-full flex gap-10">
                  <div className="flex gap-1">
                    <input
                      type="radio"
                      name="paypal_choice"
                      value="paypal"
                      checked={appPaymentMethod === 'paypal'}
                      onChange={(e) => setAppPaymentMethod('paypal')}
                    />
                    <p>Paypal</p>
                  </div>
                  <div className="flex gap-1">
                    <input
                      type="radio"
                      name="bitcoin_choice"
                      value="bitcoin"
                      checked={appPaymentMethod === 'bitcoin'}
                      onChange={(e) => setAppPaymentMethod('bitcoin')}
                    />
                    <p>Bitcoin</p>
                  </div>
                  <div className="flex gap-1">
                    <input
                      type="radio"
                      name="ethereum_choice"
                      value="ethereum"
                      checked={appPaymentMethod === 'ethereum'}
                      onChange={(e) => setAppPaymentMethod('ethereum')}
                    />
                    <p>Ethereum</p>
                  </div>
                </div>
              </div>
              {/* Rating */}
              <div className="grid grid-cols-12 h-full">
                <div
                  className="col-span-3 my-auto"
                  style={{
                    fontWeight: 700,
                    fontSize: '12px',
                    color: '#3A001E'
                  }}
                >
                  Rating
                </div>
                <div className="col-span-9 h-full flex flex-col gap-1">
                  <Select onChange={handleRatingChange}>
                    {ratingOptions.map((rating) => (
                      <Option key={rating.value} value={rating.value}>
                        {rating.label}
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>
              {/* Categories */}
              <div className="grid grid-cols-12 h-full">
                <div
                  className="col-span-3 my-auto"
                  style={{
                    fontWeight: 700,
                    fontSize: '12px',
                    color: '#3A001E'
                  }}
                >
                  Categories
                </div>
                <div className="col-span-9 h-full flex flex-col gap-1">
                  <MultiSelect
                    options={categoriesOptions}
                    handleChange={handleCategoriesChange}
                  />
                </div>
              </div>
              {/* Tags */}
              <div className="grid grid-cols-12 h-full">
                <div
                  className="col-span-3 my-auto"
                  style={{
                    fontWeight: 700,
                    fontSize: '12px',
                    color: '#3A001E'
                  }}
                >
                  Tags
                </div>
                <div className="col-span-9 h-full flex flex-col gap-1">
                  <TagsInput
                    classNames={{
                      input: 'h-full w-full',
                      tag: ''
                    }}
                    value={appTags}
                    onChange={setAppTags}
                    name="app tags"
                    placeHolder="Add tags and hit Enter"
                  />
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex flex-col gap-3">
              {/* Description */}
              <div className="grid grid-cols-12 h-full">
                <div
                  className="col-span-3"
                  style={{
                    fontWeight: 700,
                    fontSize: '12px',
                    color: '#3A001E'
                  }}
                >
                  Description
                </div>
                <div className="col-span-9 h-full flex flex-col gap-1">
                  <textarea
                    required
                    className="h-full border-2"
                    maxLength={1000}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      setDescriptionCount(e.target.value.length);
                    }}
                    value={description}
                  />
                  <div className="flex justify-end">
                    <small>{descriptionCount}/1000</small>
                  </div>
                </div>
              </div>
              {/* App Image */}
              <div className="grid grid-cols-12 h-[30px]">
                <div
                  className="col-span-3 my-auto"
                  style={{
                    fontWeight: 700,
                    fontSize: '12px',
                    color: '#3A001E'
                  }}
                >
                  App Image
                </div>
                <div className="col-span-9">
                  <input
                    className="h-full"
                    maxLength={50}
                    onChange={(e) => {
                      setAppImage(e.target.value);
                    }}
                    value={appImage}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="py-10 flex justify-center">
            <input
              className="w-fit px-4 py-2 bg-[#FB7F4B] text-white text-[15px]"
              type="submit"
              value="Release"
            />
          </div>
        </form>
      </div>
    </>
  );
};
export default ReleaseApp;
