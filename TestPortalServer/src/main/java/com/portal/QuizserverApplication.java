package com.portal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class QuizserverApplication  {

//	@Autowired
//	private UserServiceInterface userService;
//	@Autowired
//	private BCryptPasswordEncoder encoder;

	public static void main(String[] args) {
		
		SpringApplication.run(QuizserverApplication.class, args);
	
	}

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
