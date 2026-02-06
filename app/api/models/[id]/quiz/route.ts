import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: modelId } = await params;
  const { searchParams } = new URL(request.url);

  const queryString = searchParams.toString();
  const url = `${API_BASE_URL}/api/models/${modelId}/quiz/${queryString ? `?${queryString}` : ''}`;

  try {
    const response = await fetch(url);

    if (response.status === 204) {
      return NextResponse.json([]);
    }

    if (!response.ok) {
      return NextResponse.json(
        { error: `Backend error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: 'Failed to connect to backend' },
      { status: 500 }
    );
  }
}
