package com.portal.controller;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.portal.model.Role;
import com.portal.model.User;
import com.portal.model.UserRole;
import com.portal.service.UserServiceInterface;

@RestController
@RequestMapping("/user")
@CrossOrigin("http://localhost:4200")
public class UserController {

	@Autowired
	private UserServiceInterface userService;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	// creating user
	@PostMapping("/create")
	public User createUser(@RequestBody User user) throws Exception {

		Set<UserRole> roles = new HashSet<>();

		Role role = new Role();
		role.setRoleId(45L);
		role.setRoleName("USER");

		UserRole userRole = new UserRole();
		userRole.setRole(role);
		userRole.setUser(user);

		User createdUser = null;
		
		if (!(userService.userExists(user))) {

			roles.add(userRole);
			user.setUsername(userService.generateUserName(user));

			user.setPassword(this.bCryptPasswordEncoder.encode(userService.generatePassword()));

			user.setProfile("User.jpg");

			// encoding password with BCryptPasswordEncoder

			createdUser= userService.createUser(user, roles);
		} 
			return createdUser;
		
	}

	@GetMapping("/{username}")
	public User getUser(@PathVariable("username") String username) {
		return userService.getUser(username);
	}

	@DeleteMapping("/{userId}")
	public String deleteUser(@PathVariable("userId") Long userId) {
		return userService.deleteUser(userId);
	}

}
