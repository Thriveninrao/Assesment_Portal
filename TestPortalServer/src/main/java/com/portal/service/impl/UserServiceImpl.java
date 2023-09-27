package com.portal.service.impl;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import javax.annotation.PostConstruct;
import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.portal.model.DataSent;
import com.portal.model.Role;
import com.portal.model.SuccessMessage;
import com.portal.model.User;
import com.portal.model.UserAssessmentAssignment;
import com.portal.model.UserModel;
import com.portal.model.UserRole;
import com.portal.model.assessment.Assessment;
import com.portal.repository.RoleRepository;
import com.portal.repository.UserRepository;
import com.portal.service.AssessmentServiceInterface;
import com.portal.service.EmailServiceInterface;
import com.portal.service.UserServiceInterface;

@Service
public class UserServiceImpl implements UserServiceInterface {

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private RoleRepository roleRepo;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	@Autowired
	private AssessmentServiceInterface assessService;

	@Autowired
	private EmailServiceInterface emailService;

	/**
	 * Creating User
	 */
	@Override
	public User createUser(User user, UserRole userRole) throws Exception {

		User local = userRepo.findByUsername(user.getUsername());
		if (local != null) {
			System.out.println("User Is Already There !!");
			throw new Exception("User Is Already There !!");
		} else {
			// user create
			roleRepo.save(userRole.getRole());

			user.setUserRole(userRole);
			local = userRepo.save(user);
		}

		return local;
	}

	/**
	 * Get User By UserName
	 */
	@Override
	public User getUser(String username) {
		return userRepo.findByUsername(username);
	}

	@Override
	public UserModel getUserById(Long userId) {
		User user = userRepo.getReferenceById(userId);

		UserModel userMod = new UserModel();
		userMod.setEmail(user.getEmail());
		userMod.setFirstName(user.getFirstName());
		userMod.setLastName(user.getLastName());
		userMod.setId(user.getId());
		userMod.setPhone(user.getPhone());
		userMod.setUsername(user.getUsername());

		return userMod;
	}

	@Override
	public User getUserDetailById(Long userId) {
		return userRepo.getReferenceById(userId);
	}

	/**
	 * Delete User By User ID
	 */
	@Override
	public String deleteUser(String username) {
		User user = this.getUser(username);
		if (user.getUserAssessmentAssignment().size() != 0) {
			return user.getUserAssessmentAssignment().size() + " assessments assigned to " + user.getFirstName();
		} else {
			userRepo.deleteById(user.getId());
			User userDeleteConfirm = this.getUser(username);
			if (userDeleteConfirm != null)
				return "error in deletion";
			else
				return "deleted Successfully";
		}
	}

	@Override
	public String updateUser(UserModel userMod) {
		User user = this.getUserDetailById(userMod.getId());
		user.setFirstName(userMod.getFirstName());
		user.setLastName(userMod.getLastName());
		user.setPhone(userMod.getPhone());
		if (!(userMod.getUsername().equals(user.getUsername()))) {
			System.out.println("hi username changed");
			user.setUsername(userMod.getUsername());
			String generatedPassword = this.generatePassword();
			System.out.println(" User Password :: " + generatedPassword);
			user.setPassword(this.bCryptPasswordEncoder.encode(generatedPassword));

			try {
				emailService.sendEmailForUpdatedCredemtials(user, generatedPassword,
						user.getUserRole().getRole().getRoleName().toUpperCase());
				System.out.println("Email sent successfully!");
			} catch (Exception e) {
				System.out.println("Failed to send email: " + e.getMessage());
			}
		}

		if (!(userMod.getEmail().equals(user.getEmail()))) {
			System.out.println("hi email changed");
			user.setEmail(userMod.getEmail());
			String generatedPassword = this.generatePassword();
			System.out.println(" User Password :: " + generatedPassword);
			user.setPassword(this.bCryptPasswordEncoder.encode(generatedPassword));

			try {
				emailService.sendEmailForUpdatedEmail(user, generatedPassword,
						user.getUserRole().getRole().getRoleName().toUpperCase());
				System.out.println("Email sent successfully!");
			} catch (Exception e) {
				System.out.println("Failed to send email: " + e.getMessage());
			}
		}

		User updatedUser = userRepo.save(user);
		if (updatedUser.equals(user))
			return "Success";
		else
			return "update error";

	}

	@Override
	public String deleteAdmin(String username) {
		User user = this.getUser(username);
		userRepo.deleteById(user.getId());
		User userDeleteConfirm = this.getUser(username);
		if (userDeleteConfirm != null)
			return "error in deletion";
		else
			return "deleted Successfully";
	}

	@Override
	public List<User> getAllUsers() {
		return userRepo.findAll();
	}

	@Override
	public Boolean userExists(User user) {
		List<User> userList = getAllUsers();

		Boolean isExist = false;
		for (User userInList : userList) {
			if (user.getEmail().equals(userInList.getEmail()) || user.getPhone().equals(userInList.getPhone())) {
				isExist = true;
			}
		}
		return isExist;
	}

	@Override
	public String generateUserName(User user) {
		String userName = user.getFirstName().toLowerCase().concat("." + user.getLastName().toLowerCase());
		User userWithSameUserName = null;
		int count = 0;
		do {
			userWithSameUserName = getUser(userName);
			if (userWithSameUserName != null) {
				count++;
				userName = userName.concat("" + count);
			}
		} while (userWithSameUserName != null);
		return userName;
	}

	/**
	 *
	 */
	@Override
	public String generatePassword() {

		final String CHAR_LOWER = "abcdefghijklmnopqrstuvwxyz";
		final String CHAR_UPPER = CHAR_LOWER.toUpperCase();
		final String NUMBER = "0123456789";
		final String OTHER_CHAR = "!@#$%&*()_+-=[]?";

		final String PASSWORD_ALLOW_BASE = CHAR_LOWER + CHAR_UPPER + NUMBER + OTHER_CHAR;
		final String PASSWORD_ALLOW = PASSWORD_ALLOW_BASE + OTHER_CHAR;

		SecureRandom random = new SecureRandom();
		StringBuilder password = new StringBuilder(10);

		for (int i = 0; i < 10; i++) {
			int randomIndex = random.nextInt(PASSWORD_ALLOW_BASE.length());
			char randomChar = PASSWORD_ALLOW.charAt(randomIndex);
			password.append(randomChar);
		}
		return password.toString();
	}

	@PostConstruct
	@Override
	public void createADefaultAdmin() throws Exception {
		User user = new User();
		user.setFirstName("admin");
		user.setLastName("admin");
		user.setEmail("admin.admin@softtek.com");
		user.setPhone("9999999999");
		Role role = new Role();
		role.setRoleId(44L);
		role.setRoleName("ADMIN");

		UserRole userRole = new UserRole();
		userRole.setRole(role);
		userRole.setUser(user);

		if (!(userExists(user))) {

			user.setUsername(generateUserName(user));

			user.setPassword(this.bCryptPasswordEncoder.encode("admin"));

			user.setProfile("Admin.jpg");

			// encoding password with BCryptPasswordEncoder

			createUser(user, userRole);
		}
	}

	@Override
	public Set<User> getUserAccessRequest() {
		return new LinkedHashSet<>(this.userRepo.findByLoginRequestedTrue());
	}

	@Override
	public Boolean updateRejectUserRequest(String username) {
		userRepo.updateLoginRequestedToFalseByUsername(username);
		User user = userRepo.findByUsername(username);

		try {
			emailService.sendEmail(user, "no password", "rejectNewPass");
		} catch (MessagingException e) {
			e.printStackTrace();
		}

		if (user.getLoginRequested() == false) {
			return true;
		} else {
			return false;
		}
	}

	@Override
	public Boolean updateApproveUserRequest(String username) {
		String newPassword = this.generatePassword();
		System.out.println("New password :: " + newPassword);
		userRepo.updateLoggedInToFalseByUsername(username);
		userRepo.updateLoginRequestedToFalseByUsername(username);
		userRepo.updatePasswordByUsername(username, this.bCryptPasswordEncoder.encode(newPassword));

		User user = userRepo.findByUsername(username);

		try {
			emailService.sendEmail(user, newPassword, "approveNewPass");
		} catch (MessagingException e) {
			e.printStackTrace();
		}

		if (user.getLoginRequested() == false && user.getLoggedIn() == false) {
			return true;
		} else {
			return false;
		}
	}

	@Override
	public Set<UserModel> getUsers() {

		Set<User> rawUserSet = new LinkedHashSet<User>(this.userRepo.findAll());
		Set<UserModel> userSet = new LinkedHashSet<UserModel>();

		rawUserSet.stream().forEach((user) -> {
			UserModel userModel = new UserModel();
			userModel.setEmail(user.getEmail());
			userModel.setFirstName(user.getFirstName());
			userModel.setLastName(user.getLastName());
			userModel.setId(user.getId());
			userModel.setPhone(user.getPhone());
			userModel.setProfile(user.getProfile());
			userModel.setUsername(user.getUsername());

			int testAssigned = 0;
			int testAttempted = 0;

			for (UserAssessmentAssignment uaa : user.getUserAssessmentAssignment()) {

				testAssigned++;

				if (uaa.getTestAttempted()!=0) {
					testAttempted++;

				}
			}

			userModel.setTestsAttempted(testAttempted);
			userModel.setTestsAssigned(testAssigned);

			userSet.add(userModel);

		});

		return userSet;
	}

	@Override
	public Long getRoleId(String username) {
		return this.userRepo.findRoleRoleIdByUsername(username);
	}

	@Override
	public List<User> updateUser(List<User> userList) {
		List<User> updatedList = this.userRepo.saveAll(userList);
		updatedList.forEach((user) -> {
			List<Assessment> assessmentList = new ArrayList<Assessment>();
			System.out.println(user.getUserAssessmentAssignment().size());
			user.getUserAssessmentAssignment().forEach((uaa) -> {
				if (uaa.getTestAttempted()==0) {
					assessmentList.add(uaa.getAssessment());
				}
			});

			if (assessmentList.size() != 0) {
				try {
					emailService.sendAssessmentEmail(user, assessmentList);
				} catch (MessagingException e) {
					e.printStackTrace();
				}
			} else {
				System.out.println("No new test assigned to :: " + user.getFirstName());
			}
		});
		return updatedList;
	}

	@Override
	public SuccessMessage assignTest(DataSent assignAssessmentData) {
		List<User> userList = new ArrayList<>(); // Create a container for User objects
		List<Assessment> assessList = new ArrayList<>();
		Integer oldUserAssignmentCount = this.getCountOfUserAssessmentAssignIdByUserName();

		assignAssessmentData.getSelectedAssessments().forEach((assessmentData) -> {
			Assessment assessment = assessService.getAssessment(assessmentData.getAssessmentId());
			assessList.add(assessment);
		});
		assignAssessmentData.getSelectedUsers().forEach((userData) -> {
			User user = this.getUser(userData.getUsername());
			userList.add(user);
		});

		List<User> userListUpdated = new ArrayList<>();

		userList.forEach((user) -> {
			List<UserAssessmentAssignment> newUserAssessmentList = new ArrayList<>(); // Create a new set for each user
			List<Long> dbUserAssessmentIdList = this.getUserAssessmentAssignmentIdByUserName(user.getUsername());

			assessList.forEach((assessment) -> {
				UserAssessmentAssignment userAssessment = new UserAssessmentAssignment();
				userAssessment.setUser(user);
				Boolean found = false;
				for (Long dbUserAssessmentId : dbUserAssessmentIdList) {
					if (assessment.getAssessmentId() == dbUserAssessmentId) {
						found = true;
					}
				}
				if (!found) {
					userAssessment.setAssessment(assessment);
					newUserAssessmentList.add(userAssessment);
				}
			});
			user.setUserAssessmentAssignment(newUserAssessmentList);
			userListUpdated.add(user);
		});
		this.updateUser(userListUpdated);
		Integer newUserAssignmentCount = this.getCountOfUserAssessmentAssignIdByUserName();
		SuccessMessage message;
		Integer rowsAdded = newUserAssignmentCount - oldUserAssignmentCount;
		if (rowsAdded == (userList.size() * assessList.size())) {
			if (userList.size() == 1) {
				if (assessList.size() == 1) {
					message = new SuccessMessage(
							assessList.get(0).getAssessmentTitle() + " test was assigned successfully to "
									+ userList.get(0).getFirstName() + " " + userList.get(0).getLastName());
				} else {
					message = new SuccessMessage(assessList.size() + " tests assigned successfully to "
							+ userList.get(0).getFirstName() + " " + userList.get(0).getLastName());
				}
			} else {
				if (assessList.size() == 1) {
					message = new SuccessMessage(assessList.get(0).getAssessmentTitle()
							+ " test was assigned successfully to " + userList.size() + " users");
				} else {
					message = new SuccessMessage(
							assessList.size() + " tests assigned successfully to " + userList.size() + " users");
				}
			}
		} else {
			message = new SuccessMessage("Few tests already assigned, " + rowsAdded + " new test assignments added");
		}

		return message;
	}

	@Override
	public List<Long> getUserAssessmentAssignmentIdByUserName(String username) {
		return userRepo.getUserAssessmentAssignmentIdByUserName(username);
	}

	@Override
	public Integer getCountOfUserAssessmentAssignIdByUserName() {
		return userRepo.getCountOfUserAssessmentAssignIdByUserName();
	}

}
