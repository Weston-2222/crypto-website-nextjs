import { NextResponse } from 'next/server';
enum Days {
  '1_days' = 1,
  '7_days' = 7,
  '30_days' = 30,
  '90_days' = 90,
  '180_days' = 180,
  '365_days' = 365,
}
export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('coinId');
  const days = searchParams.get('days');

  // 檢查參數
  if (!id || !days) {
    return NextResponse.json(
      { message: 'Missing parameters' },
      { status: 400 }
    );
  }

  // 檢查天數參數是否有效
  if (!Object.keys(Days).includes(days)) {
    return NextResponse.json(
      { message: 'Invalid days parameter' },
      { status: 400 }
    );
  }

  const dayValue = Days[days as keyof typeof Days];

  // 檢查環境變數
  if (!process.env.COINGECKO_API_URL || !process.env.COINGECKO_API_KEY) {
    return NextResponse.json(
      { message: 'Missing API configuration' },
      { status: 500 }
    );
  }

  try {
    // 呼叫外部 API
    const response = await fetch(
      `${process.env.COINGECKO_API_URL}/coins/${id}/market_chart?vs_currency=usd&days=${dayValue}`,
      {
        headers: {
          accept: 'application/json',
          'x-cg-demo-api-key': process.env.COINGECKO_API_KEY || '',
        },
        next: { revalidate: 60 },
      }
    );

    // 檢查 API 回應狀態
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { message: 'Failed to fetch data', details: errorData },
        { status: response.status }
      );
    }

    // 處理回應數據
    const data = await response.json();

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60, stale-while-revalidate=30',
      },
    });
  } catch (error) {
    // 捕捉伺服器錯誤
    return NextResponse.json(
      { message: 'Internal Server Error', error: (error as Error).message },
      { status: 500 }
    );
  }
};
