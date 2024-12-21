'use client';
import React, { useEffect, useRef, memo } from 'react';

const TradingViewWidget = ({ symbol }: { symbol: string }) => {
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const currentContainer = container.current;
    const script = document.createElement('script');
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = `
        {
          "autosize": true,
          "symbol": "BINANCE:${symbol}USDT",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "zh_TW",
          "allow_symbol_change": true,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;
    currentContainer?.appendChild(script);
  }, [symbol]);

  return (
    <div
      className='tradingview-widget-container'
      ref={container}
      style={{ height: '100%', width: '100%' }}
    >
      <div
        className='tradingview-widget-container__widget'
        style={{ height: 'calc(100% - 32px)', width: '100%' }}
      ></div>
      <div className='tradingview-widget-copyright'>
        <a
          href='https://tw.tradingview.com/'
          rel='noopener nofollow'
          target='_blank'
        >
          <span className='blue-text'>追蹤TradingView上的所有市場</span>
        </a>
      </div>
    </div>
  );
};

export default memo(TradingViewWidget);
