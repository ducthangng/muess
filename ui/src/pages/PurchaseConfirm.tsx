import React, { useEffect } from 'react';
import MockProduct from '../components/MockProduct';
import SideMenu from '../components/Header/SideMenu';
import { appApi } from '../api/appApi';
import { useQuery } from 'react-query';

import { Row, Divider, Col } from 'antd';
import { Card, Space, Select } from 'antd';
import { Button } from 'antd';
import { Input } from 'antd';
import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Collapse } from 'antd';

const { Panel } = Collapse;
const policy = `
1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`;

const PurchaseConfirm = () => {
  const { data } = useQuery(['purchaseConfirm'], async () => {
    return await appApi.getAllApps();
  });

  const { Option } = Select;

  //handle value
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  //handle checkbox
  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };

  //handle collapse Policy value
  const onChangepolicy = (key: string | string[]) => {
    console.log(key);
  };

  return (
    <>
      <div>
        <SideMenu />
        <body>
          <Row>
            <div
              style={{
                width: '100%'
              }}
            >
              <Divider
                className=""
                orientation="left"
                style={{
                  fontSize: '46px',
                  fontWeight: 'bold',
                  paddingTop: 100,
                  paddingLeft: 90,
                  color: '3A001E'
                }}
              >
                Purchase Confirm
              </Divider>

              {/* column left  */}
              <Row>
                <Col flex="1 1 200px">
                  <Space
                    direction="vertical"
                    size="large"
                    style={{
                      paddingLeft: 200
                    }}
                  >
                    <Card
                      title="1. Addition Request"
                      size="default"
                      style={{
                        width: 1100
                      }}
                    >
                      <Row>
                        <p
                          style={{
                            fontSize: '16px',
                            fontWeight: 'bold',
                            paddingRight: 35,
                            color: '3A001E'
                          }}
                        >
                          Category
                        </p>
                        <Select
                          mode="tags"
                          style={{ width: '50%' }}
                          placeholder="Choose your category"
                          onChange={handleChange}
                        >
                          <Option value="game">Game</Option>
                          <Option value="entertainment">Entertainment</Option>
                          <Option value="social">Social</Option>
                        </Select>
                      </Row>
                      <Row>
                        <p
                          style={{
                            fontSize: '16px',
                            fontWeight: 'bold',
                            paddingRight: 20,
                            color: '3A001E'
                          }}
                        >
                          Extensions{' '}
                        </p>
                        <Select
                          mode="tags"
                          style={{ width: '50%' }}
                          placeholder="Choose your extentsion"
                          onChange={handleChange}
                        >
                          <Option value="game">Game</Option>
                          <Option value="entertainment">Entertainment</Option>
                          <Option value="social">Social</Option>
                        </Select>
                      </Row>
                    </Card>

                    <Card
                      title="2. Offer Price"
                      size="default"
                      style={{
                        width: 1100
                      }}
                    >
                      <Row>
                        <p
                          style={{
                            fontSize: '16px',
                            fontWeight: 'bold',
                            paddingRight: 60,
                            color: '3A001E'
                          }}
                        >
                          Price:{' '}
                        </p>
                        <Input
                          style={{ width: '50%' }}
                          placeholder="Enter price $"
                        />
                      </Row>
                    </Card>

                    <Card
                      title="3. Confirm policies"
                      size="default"
                      style={{
                        width: 1100
                      }}
                    >
                      <Collapse
                        defaultActiveKey={['1']}
                        onChange={onChangepolicy}
                      >
                        <Panel header="Policies of our application" key="1">
                          <p>{policy}</p>
                        </Panel>
                      </Collapse>
                      <Checkbox onChange={onChange}>
                        {' '}
                        I have read and accept the terms of all of these
                        policies{' '}
                      </Checkbox>
                    </Card>
                  </Space>
                </Col>

                {/* column right */}
                <Col
                  flex="0 1 300px"
                  style={{
                    paddingRight: 200,
                    paddingTop: 10,
                    paddingLeft: 10
                  }}
                >
                  <div>
                    <Card
                      title="Order Review"
                      size="small"
                      style={{
                        width: 400
                      }}
                    >
                      {data &&
                        data.map((item) => {
                          return (
                            <MockProduct
                              _id={item._id}
                              title={item.title}
                              description={item.description}
                              creatorId={item.creatorId}
                              creatorName={item.creatorName}
                              rated={item.rated}
                              appType={item.appType}
                              appPaymentMethod={item.appPaymentMethod}
                              appCategories={item.appCategories}
                              reviewer={item.reviewer}
                              downloaded={item.downloaded}
                              appIcon={item.appIcon} // link to database.
                              feedbacks={item.feedbacks}
                              appTags={item.appTags}
                            />
                          );
                        })}
                      <Divider orientation="right">
                        <Button
                          type="primary"
                          shape="round"
                          href="/productselection"
                        >
                          Buy
                        </Button>
                      </Divider>
                    </Card>
                  </div>
                </Col>
                {/* </Divider> */}
              </Row>
            </div>
          </Row>
        </body>
      </div>
    </>
  );
};

export default PurchaseConfirm;
