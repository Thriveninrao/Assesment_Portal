package com.portal.service;

import java.util.List;

import javax.mail.MessagingException;

import com.portal.model.User;
import com.portal.model.assessment.Assessment;
import com.portal.model.data.UserModel;

public interface EmailServiceInterface {
	public void sendEmail(User user, String generatedPassword, String userType) throws MessagingException;

	public void sendAssessmentEmail(User user, List<Assessment> assessmentList) throws MessagingException;

	public void sendEmailAdmin(User user, String generatedPassword) throws MessagingException;

	public void sendEmailForUpdatedCredemtials(User user, String generatedPassword, String role)
			throws MessagingException;

	public void sendEmailForUpdatedEmail(User user, String generatedPassword, String role) throws MessagingException;

	public void sendOTP(User user, String otp) throws MessagingException;

	public void updatePasswordEmail(UserModel user) throws MessagingException;

}
