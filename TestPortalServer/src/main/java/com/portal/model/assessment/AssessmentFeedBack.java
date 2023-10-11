package com.portal.model.assessment;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

@Entity
@Data
public class AssessmentFeedBack {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)	
	private Long AssesmentFeedBackId;
	private Integer relevancyToObjective;
	private Integer recommendationToFellowSofttekians;  //0-no,1recommend,2highlyRecommend
	private String  anyOtherAssessmentTobeAdded;
	private String TrainerName;
	private Integer trainerOverall;
	private Integer rateBeforetakingTraining;
	private Integer rateAfterTakingTraining;
	private Integer rateTheTrainerOnExpertise;
	private String  sugestions;
}
