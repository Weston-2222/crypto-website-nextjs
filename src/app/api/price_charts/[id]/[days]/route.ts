import { NextResponse } from 'next/server';
export enum Days {
  '1_days' = 1,
  '7_days' = 7,
  '30_days' = 30,
  '90_days' = 90,
  '180_days' = 180,
  '365_days' = 365,
}
export const GET = async (
  request: Request,
  { params }: { params: { id: string; days: string } }
) => {
  const { id, days } = await params;

  if (!id || !days) {
    return NextResponse.json(
      { message: 'Missing parameters' },
      { status: 400 }
    );
  }
  const dayValue = Days[days as keyof typeof Days];

  if (!dayValue) {
    return NextResponse.json(
      { message: 'Invalid days parameter' },
      { status: 400 }
    );
  }

  try {
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

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'max-age=60',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
};
