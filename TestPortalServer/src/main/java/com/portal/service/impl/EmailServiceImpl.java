package com.portal.service.impl;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.portal.model.User;
import com.portal.service.EmailServiceInterface;

@Service
public class EmailServiceImpl implements EmailServiceInterface {

	@Autowired
	private JavaMailSender javaMailSender;

	@Override
	public void sendEmail(User user, String generatedPassword, String userType) throws MessagingException {
		if (userType.equals("new")) {
			MimeMessage message = javaMailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message, true);

			String subject = user.getFirstName() + " " + user.getLastName()
					+ " has been registered | Softtek Assessment Portal";

			helper.setTo(user.getEmail());
			helper.setSubject(subject);

			String htmlContent = "<html>";
			htmlContent += "<head>" + "    <style>" + "      .card {" + "            background-color: grey;"
					+ "            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);" + "            max-width: 600px;"
					+ "            margin: 0 auto;" + "            padding: 20px;" + "            text-align: center;"
					+ "        }" + "        h2 {" + "            color: cyan;" + "        }" + "        p {"
					+ "            color: white;" + "            margin-bottom: 20px;" + "        }"
					+ "    </style> </head>";

			htmlContent += "<body><div class=\"card\">";
			htmlContent += "<h2 style =\"color: white;\"> Welcome, " + user.getFirstName() + " " + user.getLastName()
					+ "! </h2>\r\n"
					+ "        <p> You are now registered with Softtek Assessment Portal. Below are your login credentials: </p>";

			htmlContent += "<h2> Username: " + user.getUsername() + " </h2>";

			htmlContent += "<h2> Password: " + generatedPassword + " </h2>";

			htmlContent += "<p> Visit our portal at <a href=\"http://localhost:4200/login\">Softtek Assessment Portal</a> and use the provided credentials to log in. </p>";
			htmlContent += "<p> If you have any questions or encounter any issues, please don't hesitate to reach out to our support team at <a href=\"mailto:softtek.assessment.portal@gmail.com\">softtek.assessment.portal@gmail.com </a>. </p>";

			htmlContent += "<p> Best regards, </p>" + "<p> The Softtek Team </p>";
			htmlContent += "</div></body></html>";

			helper.setText(htmlContent, true);

			javaMailSender.send(message);
		} else if (userType.equals("approveNewPass")) {
			MimeMessage message = javaMailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message, true);

			String subject = user.getFirstName() + " " + user.getLastName()
					+ " request approved | Softtek Assessment Portal";

			helper.setTo(user.getEmail());
			helper.setSubject(subject);

			String htmlContent = "<html>";
			htmlContent += "<head>" + "    <style>" + "      .card {" + "            background-color: grey;"
					+ "            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);" + "            max-width: 600px;"
					+ "            margin: 0 auto;" + "            padding: 20px;" + "            text-align: center;"
					+ "        }" + "        h2 {" + "            color: cyan;" + "        }" + "        p {"
					+ "            color: white;" + "            margin-bottom: 20px;" + "        }"
					+ "    </style> </head>";

			htmlContent += "<body><div class=\"card\">";
			htmlContent += "<h2 style =\"color: white;\"> Hi, " + user.getFirstName() + " " + user.getLastName()
					+ "! </h2>\r\n"
					+ "        <p> Your request for new Password has been approved. Below are your new login credentials: </p>";

			htmlContent += "<h2> Username: " + user.getUsername() + " </h2>";

			htmlContent += "<h2> Password: " + generatedPassword + " </h2>";

			htmlContent += "<p> Visit our portal at <a href=\"http://localhost:4200/login\">Softtek Assessment Portal</a> and use the provided credentials to log in. </p>";
			htmlContent += "<p> If you have any questions or encounter any issues, please don't hesitate to reach out to our support team at <a href=\"mailto:softtek.assessment.portal@gmail.com\">softtek.assessment.portal@gmail.com </a>. </p>";

			htmlContent += "<p> Best regards, </p>" + "<p> The Softtek Team </p>";
			htmlContent += "</div></body></html>";

			helper.setText(htmlContent, true);

			javaMailSender.send(message);
		} else {
			MimeMessage message = javaMailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message, true);

			String subject = user.getFirstName() + " " + user.getLastName()
					+ " request rejected | Softtek Assessment Portal";

			helper.setTo(user.getEmail());
			helper.setSubject(subject);

			String htmlContent = "<html>";
			htmlContent += "<head>" + "    <style>" + "      .card {" + "            background-color: grey;"
					+ "            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);" + "            max-width: 600px;"
					+ "            margin: 0 auto;" + "            padding: 20px;" + "            text-align: center;"
					+ "        }" + "        h2 {" + "            color: cyan;" + "        }" + "        p {"
					+ "            color: white;" + "            margin-bottom: 20px;" + "        }"
					+ "    </style> </head>";

			htmlContent += "<body><div class=\"card\">";
			htmlContent += "<h2 style =\"color: white;\"> Hi, " + user.getFirstName() + " " + user.getLastName()
					+ "! </h2>\r\n" + "        <p> Sorry, Your request for new Password has been rejected.</p>";

			htmlContent += "<p> If you have any questions, please don't hesitate to reach out to our support team at <a href=\"mailto:softtek.assessment.portal@gmail.com\">softtek.assessment.portal@gmail.com </a>. </p>";

			htmlContent += "<p> Best regards, </p>" + "<p> The Softtek Team </p>";
			htmlContent += "</div></body></html>";

			helper.setText(htmlContent, true);

			javaMailSender.send(message);
		}
	}

}