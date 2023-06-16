import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  console.log(request.nextUrl.searchParams.get('name'));
  const query = request.nextUrl.searchParams.get('name');
  const res = await fetch(`https://api.wilayah-nusantara.id/kecamatan?name=${query}`, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
  const { data: data } = await res.json();

  return NextResponse.json({ data });
}