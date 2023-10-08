package com.portal.service;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;
import java.util.Set;

import org.springframework.web.multipart.MultipartFile;

import com.portal.model.AssessmentGrouDataSent;
import com.portal.model.ResultOfAssessment;
import com.portal.model.SuccessMessage;
import com.portal.model.assessment.Assessment;

public interface AssessmentServiceInterface {

	public Assessment addAssessment(Assessment assessment);

	public Assessment updateAssessment(Assessment assessment);

	public Set<Assessment> getAssessments();

	public Assessment getAssessment(Long assessmentId);

	public void deleteAssessment(Long assessmentId);

	public ByteArrayInputStream getAllQuestions(long AssesmentId) throws IOException;

	public Assessment updateAssessmentQuestions(Long assessmentId);

	public String InsertAllQuestions(long AssesmentId, MultipartFile excelFile) throws IOException;

	public Set<ResultOfAssessment> getResultListOfAssessment(long AssesmentId);

	public SuccessMessage addGroupOfAssessments(AssessmentGrouDataSent assessmentGroupDataSent);

//	public Set<Assessment> getUserAssessment(Long userId);
}
