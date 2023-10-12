package com.portal.model;

import java.util.HashSet;
import java.util.Set;

import com.portal.model.assessment.AssessmentGroupAssessment;
import com.portal.model.assessment.Category;
import com.portal.model.assessment.Question;

import lombok.Data;

@Data
public class AssessmentModel {

	private Long assessmentId;

	private String assessmentTitle;

	private String assessmentDescription;

	private Integer maxMarks;

	private Integer numberOfQuestions;

	private boolean active = false;

	private Category category;

	private String assessmentImage;

	private Long userId;

	private Set<Question> questions = new HashSet<>();

	private Set<UserAssessmentAssignment> userAssessmentAssignment = new HashSet<>();

	private Set<AssessmentGroupAssessment> assessmentGroupAssessment = new HashSet<>();
}
