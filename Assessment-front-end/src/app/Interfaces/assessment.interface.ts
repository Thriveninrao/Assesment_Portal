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
export interface ResultOfAssessment{
  assessmentId: number;
  assessmentTitle: string;
  maxMarks: string;
  numberOfQuestions: string;
  obtainedMarks:number;
  userId:number;
  userName:string;
}
