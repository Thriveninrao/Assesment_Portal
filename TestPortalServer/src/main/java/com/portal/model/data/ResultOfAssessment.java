package com.portal.model.data;

import lombok.Data;

@Data
public class ResultOfAssessment {
	private Long assessmentId;
	private String assessmentTitle;
	private Integer maxMarks;
	private Integer numberOfQuestions;
	private Integer obtainedMarks;
	private Long userId;
	private String userName;
	private String assessmentTookDate;
}
