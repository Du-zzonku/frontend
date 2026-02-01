'use client';

import Link from 'next/link';
import type { Model } from '@/lib/types';
import { Box, ChevronRight } from 'lucide-react';

interface ModelCardProps {
  model: Model;
}

export function ModelCard({ model }: ModelCardProps) {
  return (
    <Link href={`/study/${model.id}`} className="group block">
      <div className="glass-panel p-4 h-full transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(0,212,255,0.2)]">
        {/* Thumbnail placeholder */}
        <div className="aspect-square bg-secondary/50 rounded-lg mb-4 flex items-center justify-center overflow-hidden relative">
          <div className="absolute inset-0 grid-bg opacity-50" />
          <Box className="w-12 h-12 text-primary/60 group-hover:text-primary transition-colors relative z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
        </div>
        
        {/* Info */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {model.nameKo}
            </h3>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <p className="text-xs text-muted-foreground font-mono">{model.name}</p>
          <p className="text-sm text-muted-foreground line-clamp-2">{model.description}</p>
          <div className="flex items-center gap-2 pt-2">
            <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
              {model.parts.length} parts
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
