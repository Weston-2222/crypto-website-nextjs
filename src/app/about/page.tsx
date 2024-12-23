// pages/about.js
import Head from 'next/head';
const Page = () => {
  return (
    <div>
      <Head>
        <title>關於我們</title>
        <meta
          name='description'
          content='關於我們 - 本網站展示來自 CoinGecko 的加密貨幣數據，僅供參考用途。'
        />
      </Head>
      <main className='min-h-screen'>
        <div className='max-w-4xl mx-auto py-10 px-6'>
          <h1 className='text-3xl font-bold mb-6'>關於我們</h1>
          <p className='text-lg leading-relaxed mb-4'>
            本網站是一個基於加密貨幣數據的展示平台，專注於提供即時的市場資訊。所有數據均來源於
            <a
              href='https://www.coingecko.com'
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-500 hover:underline'
            >
              CoinGecko
            </a>
            ，以保證數據的準確性和完整性。
          </p>
          <p className='text-lg leading-relaxed mb-4'>
            本網站是為展示開發技能的專案，旨在幫助用戶了解加密貨幣市場的基本情況。同時，本網站不涉及任何金融交易或投資建議。
          </p>
          <h2 className='text-2xl font-semiboldmt-6 mb-4'>免責聲明</h2>
          <p className='text-lg leading-relaxed mb-4'>
            本網站所提供的所有數據、資訊和內容僅供參考用途，並不構成任何形式的投資建議或金融建議。本網站對於資料的準確性、完整性或時效性不作任何保證，並且不對因使用本網站資料而產生的任何損失或損害負責。
          </p>
          <p className='text-lg leading-relaxed'>
            如有任何疑問，歡迎透過電子郵件聯繫我們。我們樂於為您提供幫助！
          </p>
          <footer className='mt-10 text-center'>
            <p className='text-sm'>
              資料來源:{' '}
              <a
                href='https://www.coingecko.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-500 hover:underline'
              >
                CoinGecko
              </a>
            </p>
            <p className='text-sm'>email: weston.workmail@gmail.com</p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Page;
