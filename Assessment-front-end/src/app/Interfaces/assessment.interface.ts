export interface Assessment {
  assessmentId: number;
  assessmentTitle: string;
  assessmentDescription: string;
  maxMarks: string;
  numberOfQuestions: string;
  active: boolean;
  Category: {
    categoryId: number;
    categoryTitle: string;
    categoryDescription: string;
  };
  assessmentImage: string;
}
