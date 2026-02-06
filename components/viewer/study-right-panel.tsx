'use client';

import { useEffect, useRef } from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { ScrollArea } from '@/components/ui/scroll-area';
import type { Model, ModelPart } from '@/lib/types';
import { cn } from '@/lib/utils';

import { PartThumbnail } from './part-thumbnail';

interface StudyRightPanelProps {
  model: Model;
  selectedPartId: string | null;
  onPartSelect: (partId: string | null) => void;
}

export function StudyRightPanel({
  model,
  selectedPartId,
  onPartSelect,
}: StudyRightPanelProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const partRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const selectedPart = model.parts.find((p) => p.id === selectedPartId);

  useEffect(() => {
    if (selectedPartId && scrollContainerRef.current) {
      const partElement = partRefs.current.get(selectedPartId);
      if (partElement) {
        const container = scrollContainerRef.current;
        const containerRect = container.getBoundingClientRect();
        const elementRect = partElement.getBoundingClientRect();

        const scrollLeft =
          elementRect.left -
          containerRect.left +
          container.scrollLeft -
          containerRect.width / 2 +
          elementRect.width / 2;

        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth',
        });
      }
    }
  }, [selectedPartId]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -120, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 120, behavior: 'smooth' });
    }
  };

  return (
    <aside className="h-full bg-[#0b1022]/90 border-l border-border flex flex-col w-full">
      {/* Parts List Header */}
      <div className="px-5 pt-5 pb-3 shrink-0">
        <h2 className="text-sm font-semibold text-foreground">부품 목록</h2>
      </div>

      {/* Horizontal Part Thumbnails */}
      <div className="px-2 pb-4 border-b border-border shrink-0">
        <div className="flex items-center gap-1">
          <button
            onClick={scrollLeft}
            className="shrink-0 w-6 h-6 flex items-center justify-center text-muted-foreground/50 hover:text-muted-foreground transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div
            ref={scrollContainerRef}
            className="flex-1 flex gap-3 overflow-x-auto py-2 px-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {model.parts.map((part) => {
              const isSelected = selectedPartId === part.id;
              return (
                <button
                  key={part.id}
                  ref={(el) => {
                    if (el) partRefs.current.set(part.id, el);
                  }}
                  onClick={() => onPartSelect(part.id)}
                  className="shrink-0 flex flex-col items-center gap-1.5 group"
                >
                  <div
                    className={cn(
                      'w-16 h-16 rounded-lg overflow-hidden transition-all duration-200',
                      isSelected
                        ? 'ring-2 ring-primary bg-primary/10 shadow-[0_0_12px_rgba(0,212,255,0.3)]'
                        : 'bg-[#111827]/80 hover:bg-[#1e293b]/60'
                    )}
                  >
                    <PartThumbnail
                      part={part}
                      isSelected={isSelected}
                      onClick={() => onPartSelect(part.id)}
                    />
                  </div>
                  <span
                    className={cn(
                      'text-[10px] font-medium text-center max-w-16 truncate transition-colors',
                      isSelected
                        ? 'text-primary'
                        : 'text-muted-foreground/70 group-hover:text-muted-foreground'
                    )}
                  >
                    {part.nameKo}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            onClick={scrollRight}
            className="shrink-0 w-6 h-6 flex items-center justify-center text-muted-foreground/50 hover:text-muted-foreground transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Part Description */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <div className="px-5 py-3 shrink-0">
          <h3 className="text-sm font-semibold text-foreground">부품 설명</h3>
        </div>

        <ScrollArea className="flex-1 px-5">
          {selectedPart ? (
            <PartDescription part={selectedPart} />
          ) : (
            <div className="text-center py-12 text-muted-foreground/50">
              <p className="text-sm">부품을 선택하세요</p>
              <p className="text-xs mt-1">
                위 목록에서 부품을 클릭하면
              </p>
              <p className="text-xs">상세 설명이 표시됩니다</p>
            </div>
          )}
        </ScrollArea>
      </div>
    </aside>
  );
}

function PartDescription({ part }: { part: ModelPart }) {
  return (
    <div className="space-y-5 pb-6">
      {/* 부품 명 및 기능 */}
      <section>
        <h4 className="text-sm font-semibold text-foreground mb-2.5">
          부품 명 및 기능
        </h4>
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground leading-relaxed">
            <p>
              <span className="text-foreground/80">1.</span>{' '}
              <span className="text-foreground/90 font-medium">
                부품 명 : {part.nameKo} ({part.name})
              </span>
            </p>
          </div>
          <div className="text-xs text-muted-foreground leading-relaxed">
            <p>
              <span className="text-foreground/80">2.</span>{' '}
              {part.role}
            </p>
          </div>
        </div>
      </section>

      {/* 재질 정보 */}
      <section>
        <h4 className="text-sm font-semibold text-foreground mb-2.5">
          재질 정보
        </h4>
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground leading-relaxed">
            <p>
              <span className="text-foreground/80">1.</span>{' '}
              {part.material}
            </p>
          </div>
          {part.materialType && (
            <div className="text-xs text-muted-foreground leading-relaxed">
              <p>
                <span className="text-foreground/80">2.</span>{' '}
                재질 유형: {part.materialType.replace(/_/g, ' ')}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 기계적 특성 */}
      <section>
        <h4 className="text-sm font-semibold text-foreground mb-2.5">
          기계적 특성
        </h4>
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground leading-relaxed">
            <p>
              <span className="text-foreground/80">1.</span>{' '}
              하중 : 폭발 행정 시 발생하는 강력한 비틀림 응력(Torsional Stress)과 굽힘 하중을 견뎌야 합니다.
            </p>
          </div>
          <div className="text-xs text-muted-foreground leading-relaxed">
            <p>
              <span className="text-foreground/80">2.</span>{' '}
              마찰 : 메인 저널과 핀 저널 부위에서 고속 회전 마찰이 발생하므로, 정밀한 연마(Polishing)와 오일막 유지를 위한 높은 내마모성이 요구됩니다.
            </p>
          </div>
          <div className="text-xs text-muted-foreground leading-relaxed">
            <p>
              <span className="text-foreground/80">3.</span>{' '}
              피로 특성 : 수억 번 이상의 반복적인 하중 변화에도 파손되지 않는 높은 피로 한도를 가져야 합니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
