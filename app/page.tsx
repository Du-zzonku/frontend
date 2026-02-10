import Image from 'next/image';
import Link from 'next/link';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { FeaturesSection } from '@/components/home/features-section';
import { StepsSection } from '@/components/home/steps-section';
import { TargetAudienceSection } from '@/components/home/target-audience-section';
import { WhySimvexSection } from '@/components/home/why-simvex-section';

export default async function HomePage() {
  return (
    <div className="min-h-screen bg-[#070B14]">
      <Header />

      <main className="relative overflow-hidden">
        <HeroSection />
        <WhySimvexSection />
        <TargetAudienceSection />
        <FeaturesSection />
        <StepsSection />
      </main>

      <Footer />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative w-full h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden">
      <Image
        src="/root/image1.png"
        alt="SIMVEX 3D Viewer"
        fill
        className="object-contain object-center pointer-events-none select-none"
        priority
      />

      <div className="absolute inset-0 bg-[#070B14]/60" />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <h1 className="text-6xl md:text-8xl font-bold text-[#FAFAFA] tracking-tight mb-8">
          SIMVEX
        </h1>

        <p className="text-base md:text-lg text-[#B8B8B8] leading-relaxed mb-2">
          공학 구조물, 이제 외우지 말고 직접 조립 · 분해하며 이해하세요
        </p>
        <p className="text-sm md:text-base text-[#B8B8B8]/80 mb-12">
          3D 시뮬레이션 + AI 설명으로 배우는 공학 구조 학습
        </p>

        <Link
          href="/study"
          className="inline-flex items-center px-8 py-3 rounded-full border border-[#FAFAFA]/40 text-[#FAFAFA] text-base font-medium hover:bg-[#FAFAFA]/10 transition-colors"
        >
          3D 구조를 둘러보기
        </Link>
      </div>
    </section>
  );
}
