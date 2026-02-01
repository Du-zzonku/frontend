'use client';

import { use, useState, useCallback } from 'react';
import { notFound } from 'next/navigation';
import { Header } from '@/components/header';
import { Scene } from '@/components/viewer/scene';
import { LeftSidebar } from '@/components/viewer/left-sidebar';
import { RightSidebar } from '@/components/viewer/right-sidebar';
import { SearchBar } from '@/components/viewer/search-bar';
import { useViewerState } from '@/hooks/use-viewer-state';
import { getModelById } from '@/lib/models-data';

interface PageProps {
  params: Promise<{ modelId: string }>;
}

export default function StudyPage({ params }: PageProps) {
  const { modelId } = use(params);
  const model = getModelById(modelId);

  if (!model) {
    notFound();
  }

  const {
    state,
    isLoaded,
    setExplodeValue,
    setSelectedPartId,
    setNotes,
    addChatMessage,
    clearChatHistory,
  } = useViewerState(modelId);

  const [showRightPanel, setShowRightPanel] = useState(true);
  const [hoveredPartId, setHoveredPartId] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const selectedPart = model.parts.find((p) => p.id === state.selectedPartId);

  const handleSendMessage = useCallback(
    async (message: string) => {
      // Add user message
      addChatMessage({ role: 'user', content: message });
      setIsAiLoading(true);

      try {
        // Build messages array for API
        const messages = [
          ...state.aiHistory.map((m) => ({
            role: m.role as 'user' | 'assistant',
            parts: [{ type: 'text' as const, text: m.content }],
            id: String(m.timestamp),
          })),
          {
            role: 'user' as const,
            parts: [{ type: 'text' as const, text: message }],
            id: String(Date.now()),
          },
        ];

        // Build context from selected part
        const context = selectedPart
          ? {
              partName: selectedPart.nameKo,
              partRole: selectedPart.role,
              partMaterial: selectedPart.material,
            }
          : null;

        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages,
            systemPrompt: model.systemPrompt,
            context,
          }),
        });

        if (!response.ok) throw new Error('API error');

        // Read streaming response
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let fullContent = '';

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            // Parse SSE chunks
            const lines = chunk.split('\n');
            for (const line of lines) {
              if (line.startsWith('data:')) {
                const data = line.slice(5).trim();
                if (data === '[DONE]') continue;
                try {
                  const parsed = JSON.parse(data);
                  if (parsed.type === 'text-delta' && parsed.delta) {
                    fullContent += parsed.delta;
                  }
                } catch {
                  // Skip invalid JSON
                }
              }
            }
          }
        }

        // Add assistant message
        if (fullContent) {
          addChatMessage({ role: 'assistant', content: fullContent });
        }
      } catch (error) {
        console.error('Chat error:', error);
        addChatMessage({
          role: 'assistant',
          content: '죄송합니다. 응답을 생성하는 중 오류가 발생했습니다. 다시 시도해주세요.',
        });
      } finally {
        setIsAiLoading(false);
      }
    },
    [state.aiHistory, selectedPart, model.systemPrompt, addChatMessage]
  );

  const handleSearchSubmit = (query: string) => {
    handleSendMessage(query);
    setShowRightPanel(true);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-primary animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      <Header
        showCopilot
        onCopilotClick={() => setShowRightPanel(!showRightPanel)}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <LeftSidebar
          model={model}
          selectedPartId={state.selectedPartId}
          explodeValue={state.explodeValue}
          onExplodeChange={setExplodeValue}
          onPartSelect={setSelectedPartId}
        />

        {/* 3D Viewport */}
        <main className="flex-1 relative">
          <Scene
            model={model}
            explodeValue={state.explodeValue}
            selectedPartId={state.selectedPartId || hoveredPartId}
            onPartClick={setSelectedPartId}
            onPartHover={setHoveredPartId}
          />

          {/* Search Bar */}
          <SearchBar onSubmit={handleSearchSubmit} disabled={isAiLoading} />

          {/* Part Info Tooltip */}
          {hoveredPartId && !state.selectedPartId && (
            <PartTooltip part={model.parts.find((p) => p.id === hoveredPartId)!} />
          )}
        </main>

        {/* Right Sidebar */}
        {showRightPanel && (
          <RightSidebar
            model={model}
            selectedPart={selectedPart || null}
            notes={state.notes}
            onNotesChange={setNotes}
            aiHistory={state.aiHistory}
            onSendMessage={handleSendMessage}
            onClearHistory={clearChatHistory}
            isAiLoading={isAiLoading}
          />
        )}
      </div>
    </div>
  );
}

function PartTooltip({ part }: { part: { nameKo: string; role: string } }) {
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 glass-panel px-4 py-2 pointer-events-none">
      <p className="text-sm font-medium text-primary">{part.nameKo}</p>
      <p className="text-xs text-muted-foreground max-w-xs truncate">{part.role}</p>
    </div>
  );
}
