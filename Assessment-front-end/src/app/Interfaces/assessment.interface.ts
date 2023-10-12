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
export interface ResultOfAssessment {
  assessmentId: number;
  assessmentTitle: string;
  maxMarks: number;
  numberOfQuestions: number;
  obtainedMarks: number;
  userId: number;
  userName: string;
  assessmentTookDate:string
}


export interface AssessmentFeedBack{
  
  relevancyToObjective:number;
  recommendationToFellowSofttekians:number;
  anyOtherAssessmentTobeAdded:string;
  TrainerName:string;
  trainerOverall:number;
  rateBeforetakingTraining:number;
  rateAfterTakingTraining:number;
  rateTheTrainerOnExpertise:number;
  sugestions:string;
  AssessmentId:number;

}
