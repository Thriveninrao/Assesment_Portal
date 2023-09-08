package com.portal.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.portal.config.JwtUtils;
import com.portal.model.JwtRequest;
import com.portal.model.JwtResponse;
import com.portal.model.User;
import com.portal.service.UserServiceInterface;
import com.portal.service.impl.UserDetailServiceImpl;

@RestController
@CrossOrigin("*")
public class AuthenticateController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private UserDetailServiceImpl userDetailService;

	@Autowired
	private JwtUtils jwtUtils;

	@Autowired
	private UserServiceInterface userService;

	// generate token
	@PostMapping("/generate-token")
	public ResponseEntity<?> generateToken(@RequestBody JwtRequest jwtRequest) throws Exception {
		try {
			this.authenticate(jwtRequest.getUsername(), jwtRequest.getPassword());
			UserDetails userDetails = this.userDetailService.loadUserByUsername(jwtRequest.getUsername());

			// Check if it's the first login
			User user = (User) userDetails;
			if (user.getLoggedIn() == true) {
				// User has already logged in, return a message indicating that
				System.out.println("You have already logged in.");
				user.setLoginRequested(true);
				userDetailService.updateUser(user);
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
						"You have already logged in");
			} else {
				// Generate the token
				String token = this.jwtUtils.generateToken(userDetails);
				System.out.println(token);
				if (!user.getUserRole().getRole().getRoleName().toUpperCase().equals("ADMIN")) {
					System.out.println("Hi");
					user.setLoggedIn(true);
					this.userDetailService.updateUser(user);
				}
				System.out.println("NCCCCC" + user.getUserRole().getRole().getRoleName().toUpperCase());
				// Regular login, no password change needed
				return ResponseEntity.ok(new JwtResponse(token));
			}

		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Incorrect Username or Password");
		}
	}

	private void authenticate(String username, String password) throws Exception {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));

		} catch (DisabledException e) {
			throw new Exception("USER DISABLED ::" + e.getMessage());
		} catch (BadCredentialsException e) {
			throw new Exception("Invalid Credentials ::" + e.getMessage());
		}
	}

	// Returns the Details of Current User
	@GetMapping("/current-user")
	public User getCurrentUser(Principal principal) {
		return (User) this.userDetailService.loadUserByUsername(principal.getName());
	}
}
