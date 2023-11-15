export interface Quiz {
  loading: boolean;
  questionList: Array<any>;
  // questionList: {
    // id: number;
    // description: string;
    // keyword: string;
    // option1: string;
    // option1_score: number;
    // option2: string;
    // option2_score: number;
    // option3: string;
    // option3_score: number;
    // option4: string;
    // option4_score: number;
    // option5: string;
    // option5_score: number;
    // status: boolean;
  // } | null;
}

export interface quizMarks {
  loading: boolean;
  quizId: number;
  userId: number;
  marks: number;
  create_at: Date;
  updated_at: Date;
}
