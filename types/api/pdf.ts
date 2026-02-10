export interface PdfChatMessage {
  question: string;
  answer: string;
}

export interface PdfQuizSet {
  quizQuestion: string;
  quizAnswer: string;
  explanation?: string;
}

export interface PdfRequestDto {
  modelImage?: string;
  memo?: string;
  chatLogs?: PdfChatMessage[];
  quizs?: PdfQuizSet[];
}
