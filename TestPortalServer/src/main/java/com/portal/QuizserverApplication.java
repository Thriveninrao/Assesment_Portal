package com.portal;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.portal.model.UserAssessmentAssignment;
import com.portal.service.UserAssessmentServiceInterface;

@SpringBootApplication
public class QuizserverApplication {

//	@Autowired
//	private UserServiceInterface userService;
//	@Autowired
//	private BCryptPasswordEncoder encoder;

//	@Autowired
//	private static UserAssessmentServiceInterface userAssessmentService;

	public static void main(String[] args) {

		SpringApplication.run(QuizserverApplication.class, args);
//		callMethod();

	}

//	public static void callMethod() {
//		List<UserAssessmentAssignment> allUserAssesemenAssignment = userAssessmentService.getAllUserAssesemenAssignment(2l);
//		System.out.println("Assessments Records size :: " + allUserAssesemenAssignment.size());
//	}

//	@Override
//	public void run(String... args) throws Exception {
//
//		System.out.println("Code Starting");
//
//		User user = new User();
//		user.setFirstName("Naveen");
//		user.setLastName("H R");
//		user.setUsername("Naveen");
//		user.setPassword(encoder.encode("Naveen"));
//		user.setEmail("hrsagar09@gmail.com");
//		user.setProfile("default.png");
//
//		Role role1 = new Role();
//		role1.setRoleId(45L);
//		role1.setRoleName("ADMIN");
//
//		Set<UserRole> userRoleSet = new HashSet<>();
//		UserRole userRole = new UserRole();
//
//		userRole.setUser(user);
//
//		userRole.setRole(role1);
//
//		userRoleSet.add(userRole);
//
//		User createUser = this.userService.createUser(user, userRoleSet);
//		System.out.println(createUser.getUsername());
//
//	}

}
