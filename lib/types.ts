export type Vector3 = [number, number, number];
export type Quaternion = [number, number, number, number];

/** 부품 인스턴스 (노드) - 같은 부품이 여러 위치에 배치될 수 있음 */
export interface PartInstance {
  nodeId: string;
  position: Vector3;
  rotation?: Quaternion;
  scale?: Vector3;
  explodeDir: Vector3;
  explodeDistance: number;
}

export interface ModelPart {
  id: string;
  name: string;
  nameKo: string;
  role: string;
  material: string;
  glbPath: string;
  /** 단일 인스턴스용 (기존 호환) */
  basePosition?: Vector3;
  baseRotation?: [number, number, number];
  explodeOffset?: Vector3;
  /** 다중 인스턴스용 */
  instances?: PartInstance[];
}

export interface Model {
  id: string;
  name: string;
  nameKo: string;
  description: string;
  parts: ModelPart[];
  systemPrompt: string;
}

export interface ViewerState {
  modelId: string;
  camera: {
    position: [number, number, number];
    rotation: [number, number, number];
    zoom: number;
  };
  explodeValue: number;
  selectedPartId: string | null;
  notes: string;
  aiHistory: Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
  }>;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}
