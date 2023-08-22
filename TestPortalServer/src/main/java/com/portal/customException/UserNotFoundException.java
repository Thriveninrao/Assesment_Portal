package com.portal.customException;

public class UserNotFoundException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 8219387966326842654L;

	public UserNotFoundException() {
		super("User with this Username is already there in DB!! try agian with a New one");
	}

	public UserNotFoundException(String msg) {
		super(msg);
	}

}
