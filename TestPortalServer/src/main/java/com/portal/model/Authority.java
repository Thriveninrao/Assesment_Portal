package com.portal.model;

import org.springframework.security.core.GrantedAuthority;

public class Authority implements GrantedAuthority{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	
	private String authority;
	
	public void setAuthority(String authority) {
		this.authority = authority;
	}

	@Override
	public String getAuthority() {
		return this.authority;
	}

	public Authority(String authority) {
		super();
		this.authority = authority;
	}
	
}
