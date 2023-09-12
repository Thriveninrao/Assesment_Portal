package com.portal.service;

import java.util.List;
import java.util.Set;

import com.portal.model.User;
import com.portal.model.UserRole;

public interface UserServiceInterface {

	// Creating User
	public User createUser(User user, Set<UserRole> userRoles) throws Exception;

	// Get User
	public User getUser(String username);

	// Get all Users
	public List<User> getAllUsers();

	// Delete User
	public String deleteUser(Long userId);

	public Boolean userExists(User user);

	public String generateUserName(User user);

	public String generatePassword();

	public void createADefaultAdmin() throws Exception;

	public Set<User> getUserAccessRequest();

	public Boolean updateRejectUserRequest(String username);

	public Boolean updateApproveUserRequest(String username);

	public Set<User> getUsers();

	public Long getRoleId(String username);

	public List<User> updateUser(List<User> userList);
}
