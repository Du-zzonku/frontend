import type { ModelData } from '@/types/model';

export interface ModelSummary {
  modelId: string;
  title: string;
  thumbnailUrl: string;
  overview: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface SaveNodesRequest {
  nodes: ModelData['nodes'];
}

export interface SaveNodesResponse {
  success: boolean;
  message: string;
}

export async function fetchModels(): Promise<ModelSummary[]> {
  const response = await fetch('/api/models');

  if (!response.ok) {
    throw new Error(`Failed to fetch models: ${response.status}`);
  }

  return response.json();
}

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

export interface ChatResponse {
  content: string;
}

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
