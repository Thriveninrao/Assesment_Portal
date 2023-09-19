package com.portal.service;

import javax.mail.MessagingException;

import com.portal.model.User;

public interface EmailServiceInterface {
	public void sendEmail(User user,String generatedPassword, String userType) throws MessagingException;
}
