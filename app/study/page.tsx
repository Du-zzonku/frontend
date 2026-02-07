'use client';

import Link from 'next/link';

import { ChevronDown, Loader2 } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

import { SimvexLogo } from '@/components/study-header';
import {
  ComingSoonCard,
  StudyModelCard,
} from '@/components/study/study-model-card';
import { useModels } from '@/hooks/use-models';
import {
  BIOMEDICAL_MODELS,
  BIO_ENGINEERING_MODELS,
} from '@/lib/constants/coming-soon-models';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '#' },
  { label: 'Study', href: '/study' },
  { label: 'Community', href: '#' },
  { label: 'FAQ', href: '#' },
];

function StudyNav() {
  return (
    <header className="h-20 border-b border-[#1E3A8A]/20 bg-[#070B14] flex items-center justify-between px-8">
      <div className="flex items-center gap-10">
        <Link href="/" className="shrink-0">
          <SimvexLogo />
        </Link>

        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-1 px-4 py-2 text-sm text-[#FAFAFA]/70 hover:text-[#FAFAFA] transition-colors"
            >
              {item.label}
              <ChevronDown className="w-3 h-3 opacity-50" />
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-2">
        <button className="px-4 py-1.5 text-xs font-medium rounded-full bg-[#3B82F6] text-white">
          KOR
        </button>
        <button className="px-4 py-1.5 text-xs font-medium rounded-full border border-[#595959] text-[#FAFAFA]/60 hover:text-[#FAFAFA] transition-colors">
          ENG
        </button>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="relative px-8 py-12">
      <div className="max-w-[1200px] mx-auto">
        <div className="relative h-[200px] rounded-2xl overflow-hidden bg-linear-to-r from-[#1E40AF]/30 to-[#3B82F6]/10 border border-[#1E3A8A]/30 flex items-center justify-center">
          <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-10" />
          <div className="text-center relative z-10">
            <h1 className="text-3xl font-bold text-[#FAFAFA] mb-2">
              3D Engineering Models
            </h1>
            <p className="text-sm text-[#FAFAFA]/50">
              학습하고 싶은 모델을 선택하세요
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function StudyPage() {
  const {
    data: models,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useModels();

  const { ref } = useInView({
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  return (
    <div className="min-h-screen bg-[#070B14]">
      <StudyNav />
      <HeroSection />

      <div className="max-w-[1200px] mx-auto px-8 pb-20 space-y-16">
        <section>
          <h2 className="text-2xl font-bold text-[#FAFAFA] mb-8">기계공학</h2>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-[#3B82F6] animate-spin" />
              <span className="ml-3 text-[#FAFAFA]/50">
                모델을 불러오는 중...
              </span>
            </div>
          ) : isError ? (
            <div className="text-center py-20">
              <p className="text-red-400">
                모델 목록을 불러오는데 실패했습니다.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {models?.map((model) => (
                  <StudyModelCard key={model.modelId} model={model} />
                ))}
              </div>

              <div ref={ref} className="h-10 mt-8">
                {isFetchingNextPage && (
                  <div className="flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-[#3B82F6] animate-spin" />
                    <span className="ml-2 text-sm text-[#FAFAFA]/40">
                      더 불러오는 중...
                    </span>
                  </div>
                )}
              </div>
            </>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#FAFAFA] mb-8">생명공학</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BIO_ENGINEERING_MODELS.map((model) => (
              <ComingSoonCard key={model.id} model={model} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#FAFAFA] mb-8">의공학</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BIOMEDICAL_MODELS.map((model) => (
              <ComingSoonCard key={model.id} model={model} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
