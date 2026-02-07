import { NextResponse } from 'next/server';

import type { ModelSliceResponse } from '@/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // 프론트엔드에서 전달된 pagination params를 백엔드로 전달
  const backendParams = new URLSearchParams();

  const page = searchParams.get('page');
  const size = searchParams.get('size');
  const sortValues = searchParams.getAll('sort');

  if (page) backendParams.append('page', page);
  if (size) backendParams.append('size', size);
  sortValues.forEach((s) => backendParams.append('sort', s));

  const queryString = backendParams.toString();
  const url = `${API_BASE_URL}/api/models${queryString ? `?${queryString}` : ''}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return NextResponse.json(
        { error: `Backend error: ${response.status}` },
        { status: response.status }
      );
    }

    const data: ModelSliceResponse = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: 'Failed to connect to backend' },
      { status: 500 }
    );
  }
}
