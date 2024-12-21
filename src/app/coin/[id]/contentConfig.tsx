import { InfoCardConfig } from '@/components/infoCard';
import { formatPriceUnit, hideContractAddress } from '@/lib/utils';
import { CoinInfoApiResponse } from '@/types/api/coingecko/coinInfo';
import { CoinsMarketsApiResponse } from '@/types/api/coingecko/coinsMarkets';
import { urlExtractAndCapitalizeNames } from '@/lib/utils';
import { IconBrandX, IconInfinity } from '@tabler/icons-react';

import MyHoverCardButton from '@/components/myHoverCardButton';
import {
  MyDropDownList,
  MyDropDownMenu,
  MyDropDownTitle,
} from '@/components/myDropDownMenu';
import { getCoinCategoryList } from '@/services/coinGecko/categoriesList';

export const getMerketInfoConfig = (
  coinMarketData: CoinsMarketsApiResponse
): InfoCardConfig => {
  return {
    title: '市場',
    description: '提供最新的市場資訊',
    content: [
      {
        label: '總市值',
        value: formatPriceUnit(coinMarketData.market_cap),
        tooltip:
          '總市值是所有流通中貨幣的總價值，計算方式為當前價格乘以流通供應量。',
      },
      {
        label: '完全攤薄估值',
        value: formatPriceUnit(
          coinMarketData.current_price * coinMarketData.total_supply
        ),
        tooltip:
          '完全攤薄估值表示假設所有貨幣都進入流通後的市場總價值，計算方式為當前價格乘以總供應量。',
      },
      {
        label: '24 小時交易量',
        value: formatPriceUnit(coinMarketData.total_volume, false),
        tooltip:
          '24 小時交易量是過去 24 小時內交易的貨幣數量，反映市場的活躍程度。',
      },
      {
        label: '流通供應量',
        value: formatPriceUnit(coinMarketData.circulating_supply, false),
        tooltip: '流通供應量是目前已發行並在市場上交易的貨幣數量。',
      },
      {
        label: '總供應量',
        value: formatPriceUnit(coinMarketData.total_supply, false),
        tooltip: '總供應量是目前已發行的所有貨幣數量，包括尚未進入流通的部分。',
      },
      {
        label: '最大供應量',
        value: coinMarketData.max_supply ? (
          formatPriceUnit(coinMarketData.max_supply, false)
        ) : (
          <IconInfinity />
        ),
        tooltip: '最大供應量是貨幣的設計上限，代表該貨幣的最大可能數量。',
      },
    ],
  };
};
export const getDeveloperInfoConfig = (
  coinData: CoinInfoApiResponse
): InfoCardConfig => {
  return {
    title: '開發數據',
    description: '提供開發者資訊',
    content: [
      {
        label: '星星數量',
        value: coinData.developer_data.stars,
        tooltip: null,
      },
      {
        label: '分支數量',
        value: coinData.developer_data.forks,
        tooltip: null,
      },

      {
        label: '四週內的提交次數',
        value: coinData.developer_data.commit_count_4_weeks,
        tooltip: null,
      },
    ],
  };
};

export const getLinkInfoConfig = (
  coinData: CoinInfoApiResponse
): InfoCardConfig => {
  const contractAddress = Object.entries(coinData.detail_platforms);

  return {
    title: '資訊',
    description: '提供最新的鏈接資訊',
    content: [
      {
        label: '合約',
        tooltip: null,
        value: (
          <MyDropDownMenu>
            <MyDropDownTitle>
              {
                <p className='whitespace-nowrap overflow-hidden'>
                  {contractAddress[0][0] +
                    '\n' +
                    hideContractAddress(contractAddress[0][1].contract_address)}
                </p>
              }
            </MyDropDownTitle>
            {contractAddress.slice(1).map(([platform, details]) => {
              return (
                <MyDropDownList key={details.contract_address}>
                  {platform +
                    '\n' +
                    hideContractAddress(details.contract_address)}
                </MyDropDownList>
              );
            })}
          </MyDropDownMenu>
        ),
      },
      {
        label: '網站',
        tooltip: null,
        value: coinData.links.homepage[0] && (
          <div className='flex gap-2' data-hover-card='parent'>
            <MyHoverCardButton
              hoverCardContent={coinData.links.homepage[0]}
              openLink={coinData.links.homepage[0]}
            >
              <p>
                {new URL(coinData.links.homepage[0]).hostname.replace(
                  /^www\./,
                  ''
                )}
              </p>
            </MyHoverCardButton>

            {coinData.links.whitepaper && (
              <MyHoverCardButton
                hoverCardContent={coinData.links.whitepaper}
                openLink={coinData.links.whitepaper}
              >
                <p>白皮書</p>
              </MyHoverCardButton>
            )}
          </div>
        ),
      },

      {
        label: '區塊鏈瀏覽器',
        tooltip: '提供查詢區塊鏈上交易、區塊和地址的功能。',
        value:
          coinData.links.blockchain_site.length > 0 ? (
            <MyDropDownMenu>
              <MyDropDownTitle>
                <a
                  href={coinData.links.blockchain_site[0]}
                  target='_blank'
                  rel='noreferrer noopener'
                >
                  {urlExtractAndCapitalizeNames(
                    coinData.links.blockchain_site[0]
                  )}
                </a>
              </MyDropDownTitle>
              <MyDropDownList>
                {coinData.links.blockchain_site
                  .filter((item, index) => {
                    return index !== 0 && item !== '';
                  })
                  .map((url) => (
                    <a
                      href={url}
                      target='_blank'
                      rel='noreferrer noopener'
                      key={url}
                      className='w-full h-full'
                    >
                      {urlExtractAndCapitalizeNames(url)}
                    </a>
                  ))}
              </MyDropDownList>
            </MyDropDownMenu>
          ) : null,
      },
      {
        label: '社群',
        tooltip: null,
        value: coinData.links.twitter_screen_name ? (
          <MyHoverCardButton
            openLink={`https://x.com/${coinData.links.twitter_screen_name}`}
            hoverCardContent={`https://x.com/${coinData.links.twitter_screen_name}`}
          >
            <IconBrandX />
          </MyHoverCardButton>
        ) : null,
      },
      {
        label: 'X追蹤人數',
        tooltip: null,
        value: coinData.community_data.twitter_followers
          ? formatPriceUnit(coinData.community_data.twitter_followers, false)
          : null,
      },
    ],
  };
};
export const getCategoryInfoConfig = async (
  coinData: CoinInfoApiResponse
): Promise<InfoCardConfig> => {
  const categoryList = await getCoinCategoryList();
  const categories: { name: string; id: string | undefined }[] =
    coinData.categories.map((item) => ({
      name: item,
      id: categoryList.find((category) => category.name === item)?.category_id,
    }));

  return {
    title: '分類',
    description: '提供最新的分類資訊',
    content: [
      {
        label: '',
        tooltip: null,
        value:
          coinData.categories.length > 0 ? (
            <div className='flex flex-wrap gap-2'>
              {categories.map((category) => (
                <MyHoverCardButton
                  key={category.id}
                  openPage={`/category/${category.id}`}
                >
                  {category.name}
                </MyHoverCardButton>
              ))}
            </div>
          ) : null,
      },
    ],
  };
};
