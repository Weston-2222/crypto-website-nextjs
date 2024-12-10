import { BasicInformation } from '@/types/api/coingecko/coinData';
import React from 'react';

const CoinBasicInfoCard = ({
  coinBasicInfoData,
}: {
  coinBasicInfoData: BasicInformation;
}) => {
  const data = coinBasicInfoData;

  return (
    <div className='max-w-sm rounded overflow-hidden shadow-lg bg-white border border-gray-200 p-4'>
      <h2 className='text-xl font-bold text-gray-800 mb-2'>
        {data.name}({data.symbol ? data.symbol.toUpperCase() : 'N/A'})
      </h2>
      <p className='text-sm text-gray-600 mb-4'>{data.web_slug}</p>
      <div className='mb-4'>
        <p className='text-gray-700'>
          <span className='font-semibold'>哈希算法</span>{' '}
          {data.hashing_algorithm || 'N/A'}
        </p>

        <p className='text-gray-700'>
          <span className='font-semibold'>創世日期</span>{' '}
          {data.genesis_date || 'N/A'}
        </p>
        <p className='text-gray-700'>
          <span className='font-semibold'>區塊生成時間</span>{' '}
          {data.block_time_in_minutes} 分鐘
        </p>
        <p className='text-gray-700'>
          <span className='font-semibold'>資產平台</span>{' '}
          {data.asset_platform_id || 'N/A'}
        </p>
      </div>
      <div>
        <h3 className='font-semibold text-gray-800'>平台</h3>
        <ul className='list-disc ml-5 text-gray-700'>
          {data.platforms && Object.entries(data.platforms).length > 0 ? (
            Object.entries(data.platforms).map(([key, value]) => (
              <li key={key}>
                <span className='font-medium'>{key}:</span> {value || 'N/A'}
              </li>
            ))
          ) : (
            <li>無平台資料</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CoinBasicInfoCard;
