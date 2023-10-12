package com.portal.model;

import lombok.Data;

@Data
public class QuestionModel {
	private Long questionId;

	private String content;

	private String image;
	private String option1;
	private String option2;
	private String option3;
	private String option4;
	private String answer;
	private Integer marks;

	private AssessmentModel assessment;
}
