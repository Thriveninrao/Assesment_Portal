package com.portal.service;

import java.util.List;
import java.util.Set;

import javax.mail.MessagingException;

import com.portal.model.DataSent;
import com.portal.model.SuccessMessage;
import com.portal.model.User;
import com.portal.model.UserGroupDataSent;
import com.portal.model.UserModel;
import com.portal.model.UserRole;

public interface UserServiceInterface {

	// Creating User
	public User createUser(User user, UserRole userRoles) throws Exception;

	// Get User
	public User getUser(String username);

	// Get all Users
	public List<User> getAllUsers();

	// Delete User
	public String deleteUser(String username);

	public Boolean userExists(User user);

	public String generateUserName(User user);

	public String generatePassword();

	public void createADefaultAdmin() throws Exception;

	public Set<User> getUserAccessRequest();

	public Boolean updateRejectUserRequest(String username);

	public Boolean updateApproveUserRequest(String username);

	public Set<UserModel> getUsers();

	public Long getRoleId(String username);

	public List<User> updateUser(List<User> userList);

	public SuccessMessage assignTest(DataSent assignAssessmentData);

	public List<Long> getUserAssessmentAssignmentIdByUserName(String username);

	public Integer getCountOfUserAssessmentAssignIdByUserName();

	public String deleteAdmin(String username);

	public UserModel getUserById(Long userId);

	public String updateUser(UserModel user);

	public User getUserDetailById(Long userId);

	public SuccessMessage generateOTP(String username) throws MessagingException;

	public String generateOTP();

	public SuccessMessage updatePassword(UserModel user);
	
	public User updateUserPassword(User user);

	public SuccessMessage addGroupOfUsers(UserGroupDataSent userGroupData);
}
