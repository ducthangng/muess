import { useEffect, useState } from 'react';
import { List, Avatar, Tag, Modal } from 'antd';
import { licenseApi } from '../api/licenseApi';
import { proposalApi } from '../api/proposalApi';
import { useGlobalContext } from '../context/global/GlobalContext';

interface ILicenseListProps {
  appId: string | undefined;
}

const mockData = [
  {
    assetId: 'cfcd8cae-f12b-43f9-89e8-3f5a1ce4ef9b',
    licenseDetails: [
      'modify',
      'read',
      'commercial_use',
      'noncommercial_use',
      'resell',
      'derivative'
    ],
    ownerId: 'f8c4c6f0-31cb-4362-9421-ef67349914d8',
    proposedPrice: 90
  },
  {
    assetId: '5eea2401-ef9e-4914-b132-b45d6ff0fb18',
    licenseDetails: [
      'modify',
      'read',
      'commercial_use',
      'noncommercial_use',
      'resell'
    ],
    ownerId: 'f8c4c6f0-31cb-4362-9421-ef67349914d8',
    proposedPrice: 90
  },
  {
    assetId: '42515c37-b378-4168-ac03-ab87f0b68974',
    licenseDetails: ['modify', 'read', 'commercial_use', 'noncommercial_use'],
    ownerId: 'f8c4c6f0-31cb-4362-9421-ef67349914d8',
    proposedPrice: 90
  },
  {
    assetId: '0bc239ed-6df5-48dc-9a93-0f61dc1aab35',
    licenseDetails: ['modify', 'read', 'commercial_use'],
    ownerId: 'f8c4c6f0-31cb-4362-9421-ef67349914d8',
    proposedPrice: 90
  },
  {
    assetId: '1842e4de-3e63-4459-879d-8bc068830341',
    licenseDetails: ['modify', 'read'],
    ownerId: 'f8c4c6f0-31cb-4362-9421-ef67349914d8',
    proposedPrice: 90
  },
  {
    assetId: 'e60b7bb3-13a8-4f7d-aedc-4bb3747bba4b',
    licenseDetails: ['modify'],
    ownerId: 'f8c4c6f0-31cb-4362-9421-ef67349914d8',
    proposedPrice: 90
  }
];

const LicenseList: React.FunctionComponent<ILicenseListProps> = ({ appId }) => {
  const { setIsLoading } = useGlobalContext();
  const [licenses, setLicenses] = useState<any[]>([]);
  const [selectedLicense, setSelectedLicense] = useState<any>(undefined);
  const [proposedPrice, setProposedPrice] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [message, setMessage] = useState('');

  const fetchData = async () => {
    if (!appId) {
      return;
    }
    try {
      setIsLoading(true);
      const res = await licenseApi.getLicenseByAppId(appId);
      const data = JSON.parse(res.data).filter((item) =>
        item.Record.licenseDetails.split(',').includes('resell')
      );
      console.log(data);
      setLicenses(data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handlePurchase = async () => {
    if (!selectedLicense?.Record?.assetId || !proposedPrice) {
      console.log(selectedLicense.Record?.licenseId);
      return;
    }
    try {
      setIsLoading(true);
      const res = await proposalApi.createSecondhandProposal({
        licenseId: selectedLicense.Record?.assetId,
        proposedPrice: proposedPrice
      });
      console.log(res);
      setMessage(res.message);
      if (res.status === 201) {
        setHasError(false);
      } else {
        setHasError(true);
      }
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      setIsLoading(false);
      setSelectedLicense(undefined);
      setMessage('');
    }, 500);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="text-center text-lg font-bold">
        Want to rebuy licenses?
      </div>
      <div
        className="my-5"
        style={{
          border: '1px solid #E3E3E3'
        }}
      />
      <div className="overflow-y-scroll">
        <List
          itemLayout="vertical"
          dataSource={licenses}
          renderItem={(license) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://media.healthecareers.com/wp-content/uploads/2022/02/11211620/contract.jpg" />
                }
                title={
                  <a href="https://ant.design" className="text-[14px]">
                    {license.Record.assetId}
                  </a>
                }
                //   description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
              <div className="flex flex-col gap-2">
                <div className="grid grid-cols-5">
                  <div className="col-span-1 font-bold">Owner:</div>
                  <div className="col-span-4 break-words">
                    {license.Record.ownerId}
                  </div>
                </div>
                {/* <div className="grid grid-cols-5">
                  <div className="col-span-1 font-bold">Price:</div>
                  <div className="col-span-4">
                    {license.Record.proposedPrice}
                  </div>
                </div> */}
                <div className="grid grid-cols-5">
                  <div className="col-span-1 font-bold">Details:</div>
                  <div className="col-span-4">
                    {license.Record.licenseDetails.split(',').map((item) => (
                      <Tag color="geekblue" style={{ fontSize: '14px' }}>
                        {item}
                      </Tag>
                    ))}
                  </div>
                </div>

                <div className="my-5 flex justify-center items-center">
                  <button
                    className="bg-[#ffe4c4] text-gray-700 rounded-lg font-bold border py-1 px-10"
                    onClick={() => {
                      setSelectedLicense(license);
                    }}
                  >
                    Purchase
                  </button>
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>
      <Modal
        title={<div className="font-bold">Buy Secondhand License</div>}
        visible={selectedLicense !== undefined}
        onCancel={() => setSelectedLicense(undefined)}
        footer={null}
        zIndex={80}
      >
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-5">
            <div className="col-span-1 font-bold">Owner:</div>
            <div className="col-span-4">{selectedLicense?.Record.ownerId}</div>
          </div>
          <div className="grid grid-cols-5">
            <div className="col-span-1 font-bold">Details:</div>
            <div className="col-span-4">
              {selectedLicense?.Record.licenseDetails.split(',').map((item) => (
                <Tag color="geekblue" style={{ fontSize: '14px' }}>
                  {item}
                </Tag>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-5">
            <div className="col-span-1 font-bold">Price:</div>
            <div className="col-span-4">
              <input
                className="h-full"
                type="number"
                min={0}
                value={proposedPrice}
                onChange={(e) => setProposedPrice(parseInt(e.target.value))}
              />
            </div>
          </div>
          {message && (
            <div
              className={`text-center font-semibold ${
                hasError ? 'text-red-500' : 'text-green-500'
              } pt-5`}
            >
              {message}
            </div>
          )}
          <div className="my-5 flex justify-center items-center">
            <button
              className="bg-[#ffe4c4] text-gray-700 rounded-lg font-bold border py-1 px-10"
              onClick={handlePurchase}
            >
              Purchase
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LicenseList;
