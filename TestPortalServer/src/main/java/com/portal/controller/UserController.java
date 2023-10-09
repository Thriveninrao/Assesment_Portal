package com.portal.controller;

import javax.mail.MessagingException;

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
import com.portal.model.UserGroupDataSent;
import com.portal.model.UserModel;
import com.portal.model.UserRole;
import com.portal.service.EmailServiceInterface;
import com.portal.service.UserServiceInterface;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

	@Autowired
	private UserServiceInterface userService;

	@Autowired
	private EmailServiceInterface emailService;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	// creating user
	@PostMapping("/create")
	public ResponseEntity<?> createUser(@RequestBody User user) throws Exception {
		
		System.out.println("Hi");

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
			user.setPassword(this.bCryptPasswordEncoder.encode(generatedPassword));

			user.setProfile("User.jpg");

			userService.createUser(user, userRole);

			message = new SuccessMessage("Success");

			try {
				emailService.sendEmail(user, generatedPassword, "new");
			} catch (Exception e) {
				System.out.println("Failed to send email: " + e.getMessage());
			}
		} else {
			message = new SuccessMessage("Already Exists");
		}
		return ResponseEntity.ok(message);
	}
	
	@PutMapping("/update")
	public ResponseEntity<?> updateUser(@RequestBody UserModel user) throws Exception {
		SuccessMessage message = new SuccessMessage(userService.updateUser(user));
		return ResponseEntity.ok(message);
	}

	@GetMapping("/{username}")
	public User getUser(@PathVariable("username") String username) {
		return userService.getUser(username);
	}
	
	@GetMapping("/getUserById/{userId}")
	public ResponseEntity<?> getUserById(@PathVariable("userId") Long userId) {
		return ResponseEntity.ok(this.userService.getUserById(userId));
	}

	@DeleteMapping("/{username}")
	public ResponseEntity<?> deleteUser(@PathVariable("username") String username) {
		SuccessMessage message = new SuccessMessage(userService.deleteUser(username));
		return ResponseEntity.ok(message);
	}

	// get all categories
	@GetMapping("/accessRequest")
	public ResponseEntity<?> getUserAccessRequest() {
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
	public ResponseEntity<?> getUsers() {
		System.out.println(this.userService.getUsers());
		return ResponseEntity.ok(this.userService.getUsers());
	}

	@GetMapping("/getRoleId/{username}")
	public ResponseEntity<?> getRoleId(@PathVariable("username") String username) {
		return ResponseEntity.ok(this.userService.getRoleId(username));
	}

	@PostMapping("/assignTest")
	public ResponseEntity<?> assignTest(@RequestBody DataSent assignAssessmentData) {
		return ResponseEntity.ok(userService.assignTest(assignAssessmentData));
	}
	
	@GetMapping("/getOTP/{username}")
	public ResponseEntity<?> getOTP(@PathVariable("username") String username ) throws MessagingException {
		System.out.println("Hi from Back end");
		return ResponseEntity.ok(userService.generateOTP(username));	
		
	}
	
	@PutMapping("/resetPassword")
    public ResponseEntity<?> resetPassword(@RequestBody UserModel user) {
        return ResponseEntity.ok(userService.updatePassword(user));
    }
	
	@PostMapping("/groupUsers")
	public ResponseEntity<?> addGroupOfUsers(@RequestBody UserGroupDataSent userGroupData) {
		System.out.println("Hi from back end :: "+userGroupData);
		return ResponseEntity.ok(userService.addGroupOfUsers(userGroupData));
	}
	
	@GetMapping("/groupUsers")
	public ResponseEntity<?> getUserGroups() {
		System.out.println(userService.getUserGroups());
		return ResponseEntity.ok(userService.getUserGroups());
	}
}
