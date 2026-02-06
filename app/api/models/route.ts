import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

interface ModelSummary {
  modelId: string;
  title: string;
  thumbnailUrl: string;
  overview: string;
}

interface ModelSliceDto {
  models: ModelSummary[];
  hasNext: boolean;
  pageNumber: number;
}

export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/models`);

    if (!response.ok) {
      return NextResponse.json(
        { error: `Backend error: ${response.status}` },
        { status: response.status }
      );
    }

    const data: ModelSliceDto = await response.json();
    return NextResponse.json(data.models);
  } catch {
    return NextResponse.json(
      { error: 'Failed to connect to backend' },
      { status: 500 }
    );
  }
}
