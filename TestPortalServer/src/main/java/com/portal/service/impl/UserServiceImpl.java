package com.portal.service.impl;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.portal.model.User;
import com.portal.model.UserRole;
import com.portal.repository.RoleRepository;
import com.portal.repository.UserRepository;
import com.portal.service.UserServiceInterface;

@Service
public class UserServiceImpl implements UserServiceInterface {

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private RoleRepository roleRepo;

	/**
	 * Creating User
	 */
	@Override
	public User createUser(User user, Set<UserRole> userRoles) throws Exception {

		User local = userRepo.findByUsername(user.getUsername());
		if (local != null) {
			System.out.println("User Is Already There !!");
			throw new Exception("User Is Already There !!");
		} else {
			// user create
			for (UserRole ur : userRoles) {
				roleRepo.save(ur.getRole());
			}
			user.getUserRoles().addAll(userRoles);
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

}
