import Image from 'next/image';

const steps = [
  {
    label: 'STEP 1. 구조물을 선택 하세요',
    position: { left: 'calc(50% - 505px)', top: '120px' },
  },
  {
    label: 'STEP 2. 궁금한 내용은 AI에게 바로 물어보세요',
    position: { left: 'calc(50% - 505px)', top: '433px' },
  },
  {
    label: 'STEP 3. 직접 돌리고, 확대하고, 분해하세요',
    position: { left: 'calc(50% + 200px)', top: '80px' },
  },
  {
    label: 'STEP 4. 이해한 내용을 기록으로 남기세요',
    position: { left: 'calc(50% + 250px)', top: '406px' },
  },
];

export function StepsSection() {
  return (
    <section className="relative w-full bg-[#070B14] overflow-hidden">
      <div className="text-center pt-20 relative z-10">
        <h2 className="text-[64px] font-bold text-[#FAFAFA] mb-4 leading-tight">
          이렇게 학습하세요
        </h2>
        <p className="text-[22px] text-[#B8B8B8] mb-[65px]">
          3D 탐색과 AI 질문으로 완성하는 학습 과정
        </p>
      </div>

      <div className="relative w-full h-[732px]">
        <div className="absolute inset-0">
          <Image
            src="/root/image3.png"
            alt="SIMVEX 학습 과정"
            fill
            className="object-cover"
            style={{ objectPosition: 'center 95%' }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'rgba(4, 10, 46, 0.1)',
              backdropFilter: 'blur(3.5px)',
              WebkitBackdropFilter: 'blur(3.5px)',
            }}
          />
        </div>

        {steps.map((step) => (
          <div
            key={step.label}
            className="absolute flex items-center rounded-full px-10 py-3"
            style={{
              height: '46px',
              left: step.position.left,
              top: step.position.top,
              background: 'rgba(89, 89, 89, 0.2)',
            }}
          >
            <span className="text-sm text-[#FAFAFA] whitespace-nowrap">
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
