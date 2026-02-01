import { Header } from '@/components/header';
import { ModelCard } from '@/components/model-card';
import { models } from '@/lib/models-data';
import { Cpu, Layers, Zap } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="relative">
        {/* Background grid */}
        <div className="absolute inset-0 grid-bg opacity-30" />
        
        {/* Hero Section */}
        <section className="relative py-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-6">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-muted-foreground">Engineering Learning Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-tight text-balance">
              <span className="text-primary">SIMVEX</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-4 text-balance">
              복잡한 기계 구조를 3D로 학습하세요
            </p>
            
            <p className="text-muted-foreground max-w-2xl mx-auto mb-12 text-balance">
              공학도를 위한 시각화 학습 플랫폼. 
              기계 부품을 분해하고 조립하며 작동 원리를 이해하고, 
              AI 어시스턴트의 도움으로 깊이 있는 학습을 경험하세요.
            </p>
            
            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-16">
              <div className="glass-panel p-4 text-left">
                <Layers className="w-6 h-6 text-primary mb-2" />
                <h3 className="font-medium text-foreground mb-1">3D 분해/조립</h3>
                <p className="text-sm text-muted-foreground">실제 CAD 소프트웨어처럼 부품을 분해하고 구조를 파악</p>
              </div>
              <div className="glass-panel p-4 text-left">
                <Cpu className="w-6 h-6 text-primary mb-2" />
                <h3 className="font-medium text-foreground mb-1">AI 학습 도우미</h3>
                <p className="text-sm text-muted-foreground">맥락을 이해하는 AI가 궁금한 점을 바로 해결</p>
              </div>
              <div className="glass-panel p-4 text-left">
                <Zap className="w-6 h-6 text-primary mb-2" />
                <h3 className="font-medium text-foreground mb-1">인터랙티브 학습</h3>
                <p className="text-sm text-muted-foreground">클릭하고 회전하며 직접 체험하는 능동적 학습</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Models Grid */}
        <section className="relative pb-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
              <h2 className="text-lg font-medium text-muted-foreground">학습 모델 선택</h2>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-transparent" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {models.map((model) => (
                <ModelCard key={model.id} model={model} />
              ))}
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border py-6 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-muted-foreground">
          <span>SIMVEX - Engineering Learning Platform</span>
          <span className="font-mono">v1.0.0</span>
        </div>
      </footer>
    </div>
  );
}
