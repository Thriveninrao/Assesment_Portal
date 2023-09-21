package com.portal.service;

import java.util.List;

import javax.mail.MessagingException;

import com.portal.model.User;
import com.portal.model.assessment.Assessment;

public interface EmailServiceInterface {
	public void sendEmail(User user, String generatedPassword, String userType) throws MessagingException;

	public void sendAssessmentEmail(User user, List<Assessment> assessmentList) throws MessagingException;

	public void sendEmailAdmin(User user, String generatedPassword) throws MessagingException;
}
