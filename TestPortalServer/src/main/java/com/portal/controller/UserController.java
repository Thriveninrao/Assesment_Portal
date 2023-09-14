package com.portal.controller;

import java.util.ArrayList;
import java.util.List;

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
import com.portal.model.UserAssessmentAssignment;
import com.portal.model.UserRole;
import com.portal.model.assessment.Assessment;
import com.portal.service.AssessmentServiceInterface;
import com.portal.service.UserServiceInterface;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

	@Autowired
	private UserServiceInterface userService;

	@Autowired
	private AssessmentServiceInterface assessService;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	@PostMapping("/create")
	public ResponseEntity<?> createUser(@RequestBody User user) throws Exception {
		
		Role role = new Role();
		role.setRoleId(44L);
		role.setRoleName("NORMAL");

		UserRole userRole = new UserRole();
		userRole.setRole(role);
		userRole.setUser(user);

		SuccessMessage message;
		
		if (!(userService.userExists(user))) {

			String generateUserName = userService.generateUserName(user);
			System.out.println("username :: " + generateUserName);
			user.setUsername(generateUserName);

			String generatePassword = userService.generatePassword();
			user.setPassword(this.bCryptPasswordEncoder.encode(generatePassword));
			System.out.println("password :: " + generatePassword);

			user.setProfile("Normal.jpg");

			userService.createUser(user, userRole);
			
			message=new SuccessMessage("Success");
		} else {
			message=new SuccessMessage("Already Exists");
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

		List<User> userList = new ArrayList<>(); // Create a container for User objects
		List<Assessment> assessList = new ArrayList<>();
		List<UserAssessmentAssignment> userAssessmentList = new ArrayList<>(); // Create a new set for each user

		assignAssessmentData.getSelectedAssessments().forEach((assessmentData) -> {
			System.out.println("assess count :: 1");
			System.out
					.println("Assess " + assessmentData.getAssessmentTitle() + " " + assessmentData.getAssessmentId());
			Assessment assessment = assessService.getAssessment(assessmentData.getAssessmentId());

			assessList.add(assessment);

			System.out.println(
					"Assessment db details: " + assessment.getAssessmentTitle() + " " + assessment.getAssessmentId());

			System.out.println("assess size in forEach :: " + assessList.size());
		});
		assignAssessmentData.getSelectedUsers().forEach((userData) -> {
			System.out.println("user count :: 1");
			User user = userService.getUser(userData.getUsername());

			// At this point, userAssessmentSet contains assessments for the current user
			System.out.println("Total User Assessments for " + user.getFirstName() + ": " + userAssessmentList.size());
			userList.add(user);

			System.out.println("user size in for each :: " + userList.size());

		});

		List<User> userListUpdated = new ArrayList<>();

		userList.forEach((user) -> {
			assessList.forEach((assessment) -> {
				UserAssessmentAssignment userAssessment = new UserAssessmentAssignment();
				userAssessment.setUser(user);
//				if (!userAssessment.getAssessment().equals(assessment)) {
				userAssessment.setAssessment(assessment);
				userAssessmentList.add(userAssessment);
//				}
			});
			user.setUserAssessmentAssignment(userAssessmentList);
//        	userService.updateUser(user);
			userListUpdated.add(user);
//        	System.out.println("updated user :: "+userService.updateUser(user));
		});

//        for(User user: userListUpdated) {
//        	User updateUser = user;
//        	System.out.println("User :: "+user.getFirstName());
//        	System.out.println("Assessment :: "+user.getUserAssessmentAssignment().size());
//        	System.out.println("User Assessment List :: ");
//        	user.getUserAssessmentAssignment().forEach((value)-> System.out.println("1 :: "+value));
//        	userService.updateUser(updateUser);
//        }

		userService.updateUser(userListUpdated);
//        userAssessmentList.add(userAssessment);
//        System.out.println(userAssessmentList);
//
//	    System.out.println("List size: " + userList.size());
//	    userList.forEach((user)-> System.out.println(user));
//	    System.out.println("Assess List: "+assessList.size());
//	    assessList.forEach((assessment)->System.out.println(assessment));
		return ResponseEntity.ok().build();
	}

}
