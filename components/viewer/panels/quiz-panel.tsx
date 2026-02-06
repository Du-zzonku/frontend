'use client';

import { useState } from 'react';

import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  RotateCcw,
  XCircle,
} from 'lucide-react';

import { fetchQuiz, submitQuizAnswers } from '@/lib/api';
import type {
  Quiz,
  QuizAnswerItem,
  QuizResultItem,
  QuizResultResponse,
} from '@/types/model';
import { cn } from '@/lib/utils';

type QuizState = 'idle' | 'loading' | 'answering' | 'submitting' | 'results';

interface QuizPanelProps {
  modelId: string;
}

export function QuizPanel({ modelId }: QuizPanelProps) {
  const [state, setState] = useState<QuizState>('idle');
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<number, QuizAnswerItem>>(
    new Map()
  );
  const [results, setResults] = useState<QuizResultResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startQuiz = async () => {
    setState('loading');
    setError(null);
    try {
      const data = await fetchQuiz(modelId, { count: 3 });
      if (data.length === 0) {
        setError('퀴즈가 준비되지 않았습니다.');
        setState('idle');
        return;
      }
      setQuizzes(data);
      setCurrentIndex(0);
      setAnswers(new Map());
      setResults(null);
      setState('answering');
    } catch {
      setError('퀴즈를 불러오는 데 실패했습니다.');
      setState('idle');
    }
  };

  const setAnswer = (quiz: Quiz, answer: QuizAnswerItem) => {
    setAnswers((prev) => {
      const next = new Map(prev);
      next.set(quiz.questionId, answer);
      return next;
    });
  };

  const handleSubmit = async () => {
    setState('submitting');
    setError(null);
    try {
      const answerList = Array.from(answers.values());
      const result = await submitQuizAnswers(modelId, answerList);
      setResults(result);
      setState('results');
    } catch {
      setError('답안 제출에 실패했습니다. 다시 시도해주세요.');
      setState('answering');
    }
  };

  const currentQuiz = quizzes[currentIndex];
  const allAnswered = quizzes.every((q) => answers.has(q.questionId));

  /* ── Idle State ── */
  if (state === 'idle') {
    return (
      <div className="flex flex-col h-full">
        <div className="px-6 pt-5 pb-3 shrink-0">
          <h2 className="text-lg font-bold text-white">퀴즈</h2>
          <p className="text-xs text-white/40 mt-1">
            학습 내용을 퀴즈로 확인해보세요
          </p>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="w-16 h-16 rounded-full bg-[#60A5FA]/20 flex items-center justify-center mb-4">
            <QuizSmallIcon className="w-8 h-8 text-[#60A5FA]" />
          </div>
          <p className="text-sm text-white/50 text-center leading-relaxed mb-6">
            현재 학습 중인 모델에 대한
            <br />
            퀴즈를 풀어보세요.
          </p>
          {error && (
            <p className="text-xs text-red-400 mb-4 text-center">{error}</p>
          )}
          <button
            onClick={startQuiz}
            className="w-full max-w-[240px] h-[48px] rounded-xl bg-[#1E40AF] hover:bg-[#1E3A8A] text-white text-sm font-medium transition-colors flex items-center justify-center"
          >
            퀴즈 시작하기
          </button>
        </div>
      </div>
    );
  }

  /* ── Loading State ── */
  if (state === 'loading') {
    return (
      <div className="flex flex-col h-full items-center justify-center">
        <Loader2 className="w-6 h-6 text-[#60A5FA] animate-spin mb-3" />
        <p className="text-sm text-white/50">퀴즈를 불러오는 중...</p>
      </div>
    );
  }

  /* ── Answering State ── */
  if (state === 'answering' || state === 'submitting') {
    const currentAnswer = answers.get(currentQuiz.questionId);

    return (
      <div className="flex flex-col h-full">
        {/* 헤더 + 진행률 */}
        <div className="px-6 pt-5 pb-3 shrink-0">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-white">퀴즈</h2>
            <span className="text-xs text-white/40">
              {currentIndex + 1} / {quizzes.length}
            </span>
          </div>
          {/* 프로그레스 바 */}
          <div className="w-full h-1 bg-[#595959]/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#60A5FA] rounded-full transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / quizzes.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* 문제 */}
        <div className="flex-1 min-h-0 overflow-y-auto px-5">
          <div className="py-3">
            {/* 문제 유형 뱃지 */}
            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-[#60A5FA]/20 text-[#60A5FA] mb-3">
              {currentQuiz.type === 'MULTIPLE_CHOICE' ? '객관식' : '주관식'}
            </span>

            {/* 질문 텍스트 */}
            <p className="text-sm text-white leading-relaxed mb-5">
              {currentQuiz.question}
            </p>

            {/* 답변 영역 */}
            {currentQuiz.type === 'MULTIPLE_CHOICE' ? (
              <div className="flex flex-col gap-2">
                {currentQuiz.options.map((option) => {
                  const isSelected =
                    currentAnswer?.selectedOptionNo === option.no;
                  return (
                    <button
                      key={option.no}
                      onClick={() =>
                        setAnswer(currentQuiz, {
                          questionId: currentQuiz.questionId,
                          type: 'MULTIPLE_CHOICE',
                          selectedOptionNo: option.no,
                        })
                      }
                      disabled={state === 'submitting'}
                      className={cn(
                        'w-full text-left px-4 py-3 rounded-xl border text-sm transition-all',
                        isSelected
                          ? 'border-[#60A5FA] bg-[#60A5FA]/10 text-white'
                          : 'border-[#595959]/50 text-white/70 hover:border-[#595959] hover:text-white'
                      )}
                    >
                      <span className="font-medium mr-2">{option.no}.</span>
                      {option.content}
                    </button>
                  );
                })}
              </div>
            ) : (
              <textarea
                value={currentAnswer?.subjectiveAnswer || ''}
                onChange={(e) =>
                  setAnswer(currentQuiz, {
                    questionId: currentQuiz.questionId,
                    type: 'SHORT_ANSWER',
                    subjectiveAnswer: e.target.value,
                  })
                }
                disabled={state === 'submitting'}
                placeholder="답변을 입력하세요..."
                className="w-full h-[120px] p-4 bg-transparent border border-[#595959]/50 rounded-xl text-sm text-white placeholder:text-[#595959] focus:outline-none focus:border-[#60A5FA]/50 resize-none transition-colors"
              />
            )}
          </div>
        </div>

        {/* 에러 표시 */}
        {error && (
          <div className="mx-5 mb-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 shrink-0">
            <p className="text-xs text-red-400">{error}</p>
          </div>
        )}

        {/* 네비게이션 + 제출 */}
        <div className="p-5 pt-3 shrink-0 flex flex-col gap-2">
          {/* 이전/다음 */}
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
              disabled={currentIndex === 0 || state === 'submitting'}
              className="flex-1 h-[40px] rounded-xl border border-[#595959]/50 text-white/70 text-sm flex items-center justify-center gap-1 hover:border-[#595959] hover:text-white transition-colors disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4" />
              이전
            </button>
            <button
              onClick={() =>
                setCurrentIndex((i) => Math.min(quizzes.length - 1, i + 1))
              }
              disabled={
                currentIndex === quizzes.length - 1 || state === 'submitting'
              }
              className="flex-1 h-[40px] rounded-xl border border-[#595959]/50 text-white/70 text-sm flex items-center justify-center gap-1 hover:border-[#595959] hover:text-white transition-colors disabled:opacity-30"
            >
              다음
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* 제출 버튼 */}
          {allAnswered && (
            <button
              onClick={handleSubmit}
              disabled={state === 'submitting'}
              className="w-full h-[48px] rounded-xl bg-[#1E40AF] hover:bg-[#1E3A8A] text-white text-sm font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {state === 'submitting' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  채점 중...
                </>
              ) : (
                '답안 제출하기'
              )}
            </button>
          )}
        </div>
      </div>
    );
  }

  /* ── Results State ── */
  if (state === 'results' && results) {
    const correctCount = results.results.filter((r) => r.correct).length;
    const totalCount = results.results.length;

    return (
      <div className="flex flex-col h-full">
        {/* 헤더 + 점수 */}
        <div className="px-6 pt-5 pb-3 shrink-0">
          <h2 className="text-lg font-bold text-white">퀴즈 결과</h2>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-[#60A5FA]">
                {correctCount}
              </span>
              <span className="text-sm text-white/50">/ {totalCount}</span>
            </div>
            <span className="text-sm text-white/40">정답</span>
          </div>
        </div>

        {/* 결과 리스트 */}
        <div className="flex-1 min-h-0 overflow-y-auto px-5">
          <div className="flex flex-col gap-4 py-3">
            {results.results.map((result, idx) => {
              const quiz = quizzes.find(
                (q) => q.questionId === result.questionId
              );
              return (
                <ResultCard
                  key={result.questionId}
                  index={idx + 1}
                  quiz={quiz}
                  result={result}
                />
              );
            })}
          </div>
        </div>

        {/* 다시 풀기 */}
        <div className="p-5 pt-3 shrink-0">
          <button
            onClick={startQuiz}
            className="w-full h-[48px] rounded-xl bg-[#1E40AF] hover:bg-[#1E3A8A] text-white text-sm font-medium transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            다시 풀기
          </button>
        </div>
      </div>
    );
  }

  return null;
}

/* ── 결과 카드 ── */
function ResultCard({
  index,
  quiz,
  result,
}: {
  index: number;
  quiz: Quiz | undefined;
  result: QuizResultItem;
}) {
  return (
    <div
      className={cn(
        'rounded-xl border p-4',
        result.correct
          ? 'border-green-500/30 bg-green-500/5'
          : 'border-red-500/30 bg-red-500/5'
      )}
    >
      {/* 정답/오답 */}
      <div className="flex items-center gap-2 mb-2">
        {result.correct ? (
          <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
        ) : (
          <XCircle className="w-4 h-4 text-red-400 shrink-0" />
        )}
        <span
          className={cn(
            'text-xs font-medium',
            result.correct ? 'text-green-400' : 'text-red-400'
          )}
        >
          문제 {index} - {result.correct ? '정답' : '오답'}
        </span>
      </div>

      {/* 질문 */}
      {quiz && (
        <p className="text-xs text-white/70 mb-2 leading-relaxed">
          {quiz.question}
        </p>
      )}

      {/* 정답 */}
      <div className="text-xs text-white/50 mb-1">
        <span className="font-medium text-white/60">정답:</span>{' '}
        {result.correctAnswer}
      </div>

      {/* 해설 */}
      {result.explanation && (
        <div className="mt-2 pt-2 border-t border-[#595959]/30">
          <p className="text-xs text-white/40 leading-relaxed">
            {result.explanation}
          </p>
        </div>
      )}
    </div>
  );
}

function QuizSmallIcon({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M9 2C7.895 2 7 2.895 7 4V20C7 21.105 7.895 22 9 22H19C20.105 22 21 21.105 21 20V8L15 2H9ZM14 3.5L19.5 9H15C14.448 9 14 8.552 14 8V3.5ZM10 12H18V13.5H10V12ZM10 15H18V16.5H10V15ZM10 18H15V19.5H10V18ZM3 6V18C3 19.657 4.343 21 6 21V6H3Z"
        fill="currentColor"
      />
    </svg>
  );
}
