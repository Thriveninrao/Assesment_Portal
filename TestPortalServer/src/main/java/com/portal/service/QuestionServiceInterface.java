package com.portal.service;

import java.util.Set;

import com.portal.model.assessment.Assessment;
import com.portal.model.assessment.Question;

public interface QuestionServiceInterface {

	public Question addQuestion(Question question);

	public Question updateQuestion(Question question);

	public Set<Question> getQuestions();

	public Question getQuestion(Long questionId);

	public Set<Question> getQuestionsOfAssessment(Assessment assessment);

	public void deleteQuestion(Long questionId);

}
