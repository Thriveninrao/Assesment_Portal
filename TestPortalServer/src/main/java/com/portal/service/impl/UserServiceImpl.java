package com.portal.service.impl;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.portal.model.DataSent;
import com.portal.model.Role;
import com.portal.model.SuccessMessage;
import com.portal.model.User;
import com.portal.model.UserAssessmentAssignment;
import com.portal.model.UserRole;
import com.portal.model.assessment.Assessment;
import com.portal.repository.RoleRepository;
import com.portal.repository.UserRepository;
import com.portal.service.AssessmentServiceInterface;
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

	/**
	 * Delete User By User ID
	 */
	@Override
	public String deleteUser(Long userId) {
		if (userRepo.findById(userId).isPresent()) {
			userRepo.deleteById(userId);
			return "User with user Id :: {" + userId + "} is deleted Successfully";
		} else {
			return "The User with ID :: {" + userId + "} is not available";
		}
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
		if (user.getLoginRequested() == false && user.getLoggedIn() == false) {
			return true;
		} else {
			return false;
		}
	}

	@Override
	public Set<User> getUsers() {
		return new LinkedHashSet<User>(this.userRepo.findAll());
	}

	@Override
	public Long getRoleId(String username) {
		return this.userRepo.findRoleRoleIdByUsername(username);
	}

	@Override
	public List<User> updateUser(List<User> userList) {
		return this.userRepo.saveAll(userList);
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
			System.out.println("1");
			List<UserAssessmentAssignment> newUserAssessmentList = new ArrayList<>(); // Create a new set for each user
			List<Long> dbUserAssessmentIdList = this.getUserAssessmentAssignmentIdByUserName(user.getUsername());

			assessList.forEach((assessment) -> {
				System.out.println("2");
				UserAssessmentAssignment userAssessment = new UserAssessmentAssignment();
				userAssessment.setUser(user);
				Boolean found = false;
				for (Long dbUserAssessmentId : dbUserAssessmentIdList) {
					System.out.println("3");
					System.out.println(dbUserAssessmentId + " :: " + assessment.getAssessmentId());
					if (assessment.getAssessmentId() == dbUserAssessmentId) {
						found = true;
						System.out.println("found :: " + found);
					}
				}
				if (!found) {
					System.out.println("4");
					userAssessment.setAssessment(assessment);
					System.out.println("5");
					newUserAssessmentList.add(userAssessment);
				}
			});
			System.out.println("6");
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
					message = new SuccessMessage("A test was assigned successfully to a user");
				} else {
					message = new SuccessMessage(assessList.size() + " tests assigned successfully to a user");
				}
			} else {
				if (assessList.size() == 1) {
					message = new SuccessMessage("A test was assigned successfully to " + userList.size() + " users");
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
