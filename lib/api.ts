import type { ModelData } from '@/types/model';

/** 모델 목록 요약 타입 */
export interface ModelSummary {
  modelId: string;
  title: string;
  thumbnailUrl: string;
  overview: string;
}

/** 채팅 메시지 타입 */
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

/** 노드 저장 요청 타입 */
export interface SaveNodesRequest {
  nodes: ModelData['nodes'];
}

/** 노드 저장 응답 타입 */
export interface SaveNodesResponse {
  success: boolean;
  message: string;
}

/**
 * GET /api/models - 모델 목록 조회
 */
export async function fetchModels(): Promise<ModelSummary[]> {
  const response = await fetch('/api/models');

  if (!response.ok) {
    throw new Error(`Failed to fetch models: ${response.status}`);
  }

  return response.json();
}

/**
 * GET /api/models/:id/viewer - 모델 상세 데이터 조회
 */
export async function fetchViewerData(modelId: string): Promise<ModelData> {
  const response = await fetch(`/api/models/${modelId}/viewer`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Model not found: ${modelId}`);
    }
    throw new Error(`Failed to fetch viewer data: ${response.status}`);
  }

  return response.json();
}

/** AI 채팅 응답 타입 */
export interface ChatResponse {
  content: string;
}

/**
 * POST /api/models/:id/chat - AI 채팅
 */
export async function sendChatMessage(
  modelId: string,
  message: string,
  history: string[]
): Promise<string> {
  const response = await fetch(`/api/models/${modelId}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history }),
  });

  if (!response.ok) {
    throw new Error(`Chat API error: ${response.status}`);
  }

  const data: ChatResponse = await response.json();
  return data.content;
}

/**
 * PUT /admin/models/:id/nodes - 배치(노드) 저장
 */
export async function saveNodes(
  modelId: string,
  nodes: ModelData['nodes']
): Promise<SaveNodesResponse> {
  const response = await fetch(`/admin/models/${modelId}/nodes`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nodes }),
  });

  if (!response.ok) {
    throw new Error(`Failed to save nodes: ${response.status}`);
  }

  return response.json();
}
