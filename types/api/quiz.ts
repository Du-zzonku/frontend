/** 퀴즈 옵션 */
export interface QuizOption {
  no: number;
  content: string;
}

/** 퀴즈 문제 */
export interface Quiz {
  questionId: number;
  type: 'MULTIPLE_CHOICE' | 'SHORT_ANSWER';
  question: string;
  options: QuizOption[];
}

/** 퀴즈 답변 아이템 */
export interface QuizAnswerItem {
  questionId: number;
  type: 'MULTIPLE_CHOICE' | 'SHORT_ANSWER';
  selectedOptionNo?: number;
  subjectiveAnswer?: string;
}

/** 퀴즈 제출 요청 */
export interface QuizSubmitRequest {
  answers: QuizAnswerItem[];
}

/** 퀴즈 결과 아이템 */
export interface QuizResultItem {
  questionId: number;
  userSelected: unknown;
  correctAnswer: string;
  explanation: string;
  correct: boolean;
}

/** 퀴즈 결과 응답 */
export interface QuizResultResponse {
  results: QuizResultItem[];
}
