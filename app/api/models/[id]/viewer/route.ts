import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

const MODEL_FOLDER_MAP: Record<string, string> = {
  v4_engine: 'V4_Engine',
  suspension: 'Suspension',
  robot_gripper: 'Robot_Gripper',
  drone: 'Drone',
  robot_arm: 'Robot_Arm',
  leaf_spring: 'Leaf_Spring',
  machine_vice: 'Machine_Vice',
};

const STRIP_SUFFIX_FILES = ['Link', 'Gripper', 'Pin'];

function normalizeFilename(filename: string): string {
  let normalized = filename.replace(/ /g, '_');

  for (const baseName of STRIP_SUFFIX_FILES) {
    const pattern = new RegExp(`^${baseName}_\\d+\\.glb$`, 'i');
    if (pattern.test(normalized)) {
      normalized = `${baseName}.glb`;
      break;
    }
  }

  return normalized;
}

function convertGlbUrl(glbUrl: string, modelId: string): string {
  if (!glbUrl) return glbUrl;
  if (glbUrl.startsWith('http://') || glbUrl.startsWith('https://')) {
    return glbUrl;
  }

  const folder = MODEL_FOLDER_MAP[modelId] || modelId;

  if (glbUrl.startsWith('/models/')) {
    const parts = glbUrl.split('/');
    const filename = parts[parts.length - 1];
    return `/models/${folder}/${normalizeFilename(filename)}`;
  }

  const filename = glbUrl.replace(/^\/glb\//, '');
  return `/models/${folder}/${normalizeFilename(filename)}`;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: modelId } = await params;

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/api/models/${modelId}/viewer`
    );

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: 'Model not found' }, { status: 404 });
      }
      return NextResponse.json(
        { error: `Backend error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (data.parts) {
      data.parts = data.parts.map(
        (part: { glbUrl?: string; [key: string]: unknown }) => ({
          ...part,
          glbUrl: part.glbUrl
            ? convertGlbUrl(part.glbUrl, modelId)
            : part.glbUrl,
        })
      );
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: 'Failed to connect to backend' },
      { status: 500 }
    );
  }
}
