package com.portal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.portal.model.DataSent;
import com.portal.model.Role;
import com.portal.model.SuccessMessage;
import com.portal.model.User;
import com.portal.model.UserRole;
import com.portal.service.UserServiceInterface;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

	@Autowired
	private UserServiceInterface userService;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	// creating user
	@PostMapping("/create")
	public ResponseEntity<?> createUser(@RequestBody User user) throws Exception {

		Role role = new Role();
		role.setRoleId(45L);
		role.setRoleName("NORMAL");

		UserRole userRole = new UserRole();
		userRole.setRole(role);
		userRole.setUser(user);

		SuccessMessage message;

		if (!(userService.userExists(user))) {
			user.setUsername(userService.generateUserName(user));
			String generatedPassword = userService.generatePassword();
			System.out.println(" User Password :: " + generatedPassword);
			user.setPassword(this.bCryptPasswordEncoder.encode(generatedPassword));

			user.setProfile("User.jpg");

			userService.createUser(user, userRole);

			message = new SuccessMessage("Success");
		} else {
			message = new SuccessMessage("Already Exists");
		}
		return ResponseEntity.ok(message);
	}

	@GetMapping("/{username}")
	public User getUser(@PathVariable("username") String username) {
		return userService.getUser(username);
	}

	@DeleteMapping("/{userId}")
	public String deleteUser(@PathVariable("userId") Long userId) {
		return userService.deleteUser(userId);
	}

	// get all categories
	@GetMapping("/accessRequest")
	public ResponseEntity<?> getUserAccessRequest() {
		System.out.println("z6 hi");
		this.userService.getUserAccessRequest().forEach(user -> System.out.println(user.getFirstName()));
		return ResponseEntity.ok(this.userService.getUserAccessRequest());
	}

	@PutMapping("/rejectUserRequest/{username}")
	public ResponseEntity<?> rejectUserRequest(@PathVariable("username") String username) {
		if (userService.updateRejectUserRequest(username)) {
			SuccessMessage message = new SuccessMessage("User Request successfully Rejected");
			return ResponseEntity.ok(message);
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@PutMapping("/approveUserRequest/{username}")
	public ResponseEntity<?> approveUserRequest(@PathVariable("username") String username) {
		if (userService.updateApproveUserRequest(username)) {
			SuccessMessage message = new SuccessMessage("User Request successfully Accepted");
			return ResponseEntity.ok(message);
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@GetMapping("/getUsers")
	public ResponseEntity<?> getAssessments() {
		return ResponseEntity.ok(this.userService.getUsers());
	}

	@GetMapping("/getRoleId/{username}")
	public ResponseEntity<?> getRoleId(@PathVariable("username") String username) {
		return ResponseEntity.ok(this.userService.getRoleId(username));
	}

	@PostMapping("/assignTest")
	public ResponseEntity<?> assignTest(@RequestBody DataSent assignAssessmentData) {
		System.out.println("Hi from backend");
		return ResponseEntity.ok(userService.assignTest(assignAssessmentData));
	}
}
