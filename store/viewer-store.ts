'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { CameraState, ChatMessage } from '@/lib/types';

export type { CameraState };

export interface ViewerStoreState {
  modelId: string;
  selectedPartId: string | null;
  explodeValue: number;
  cameraState: CameraState | null;
  notes: string;
  aiHistory: ChatMessage[];
  isHydrated: boolean;

  setModelId: (modelId: string) => void;
  setSelectedPartId: (partId: string | null) => void;
  setExplodeValue: (value: number) => void;
  setCameraState: (state: CameraState) => void;
  setNotes: (notes: string) => void;
  addChatMessage: (message: Omit<ChatMessage, 'timestamp'>) => void;
  clearChatHistory: () => void;
  resetState: () => void;
  setHydrated: (hydrated: boolean) => void;
}

const getDefaultState = () => ({
  modelId: '',
  selectedPartId: null,
  explodeValue: 0,
  cameraState: null as CameraState | null,
  notes: '',
  aiHistory: [] as ChatMessage[],
  isHydrated: false,
});

const storeCache = new Map<string, ReturnType<typeof createViewerStore>>();

function createViewerStore(modelId: string) {
  const store = create<ViewerStoreState>()(
    persist(
      (set) => ({
        ...getDefaultState(),
        modelId,

        setModelId: (modelId) => set({ modelId }),

        setSelectedPartId: (partId) => set({ selectedPartId: partId }),

        setExplodeValue: (value) => set({ explodeValue: value }),

        setCameraState: (state) => set({ cameraState: state }),

        setNotes: (notes) => set({ notes }),

        addChatMessage: (message) =>
          set((state) => ({
            aiHistory: [
              ...state.aiHistory,
              { ...message, timestamp: Date.now() },
            ],
          })),

        clearChatHistory: () => set({ aiHistory: [] }),

        resetState: () =>
          set({
            ...getDefaultState(),
            modelId,
          }),

        setHydrated: (hydrated) => set({ isHydrated: hydrated }),
      }),
      {
        name: `simvex_viewer_${modelId}`,
        partialize: (state) => ({
          selectedPartId: state.selectedPartId,
          explodeValue: state.explodeValue,
          cameraState: state.cameraState,
          notes: state.notes,
          aiHistory: state.aiHistory,
        }),
        onRehydrateStorage: () => (state, error) => {
          if (error) {
            console.error('Hydration error:', error);
          }
          if (state) {
            state.setHydrated(true);
          } else {
            store.setState({ isHydrated: true });
          }
        },
      }
    )
  );
  return store;
}

export function getViewerStore(modelId: string) {
  if (!storeCache.has(modelId)) {
    storeCache.set(modelId, createViewerStore(modelId));
  }
  return storeCache.get(modelId)!;
}

export function clearViewerStoreCache() {
  storeCache.clear();
}

export function useViewerStore(modelId: string) {
  const store = getViewerStore(modelId);
  return store;
}
