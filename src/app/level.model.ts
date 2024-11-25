// src/app/models/level.model.ts
export interface Question {
    question: string;
    options: string[];
    answer: string;
    hint: string;
  }
  
  export interface Level {
    id: string;
    name: string;
    questions: Question[];
  }
  