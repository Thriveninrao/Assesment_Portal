package com.portal.service;

import java.util.Set;

import com.portal.model.User;
import com.portal.model.UserRole;

public interface UserServiceInterface {

	// Creating User
	public User createUser(User user, Set<UserRole> userRoles) throws Exception;

	// Get User
	public User getUser(String username);

	// Delete User
	public String deleteUser(Long userId);
}
