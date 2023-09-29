package com.portal.model;

import lombok.Data;

@Data
public class UserModel {
	private Long id;

	private String username;

	private String firstName;

	private String lastName;

	private String email;

	private String phone;

	private Integer testsAssigned;
	
	private Integer testsAttempted;

	private String profile;
	
	private String password;
}
