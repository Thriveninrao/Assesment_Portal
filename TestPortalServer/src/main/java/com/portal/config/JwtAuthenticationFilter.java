package com.portal.config;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.portal.service.impl.UserDetailServiceImpl;

import io.jsonwebtoken.ExpiredJwtException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	@Autowired
	private UserDetailServiceImpl userDetailService;

	@Autowired
	private JwtUtils jwtUtil;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
	        throws ServletException, IOException {
	    final String requestTokenHeader = request.getHeader("Authorization");
	    String username = null;
	    String jwtToken = null;

	    if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer")) {
	        try {
	            jwtToken = requestTokenHeader.substring(7);
	            username = this.jwtUtil.extractUsername(jwtToken);
	        } catch (ExpiredJwtException e) {
	            System.out.println("Jwt Token has expired");
	            e.printStackTrace();
	        } catch (Exception e) {
	            e.printStackTrace();
	            System.out.println("Error");
	        }
	    }

	    // Validate the token if username is present
	    if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
	        final UserDetails userDetails = this.userDetailService.loadUserByUsername(username);
	        if (this.jwtUtil.validateToken(jwtToken, userDetails)) {
	            // Token is valid, set authentication
	            UsernamePasswordAuthenticationToken usernamePasswordAuthentication = new UsernamePasswordAuthenticationToken(
	                    userDetails, null, userDetails.getAuthorities());
	            usernamePasswordAuthentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

	            SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthentication);
	        }
	    } else {
	        // Token is invalid, unauthorized access
	        System.out.println("Token Is Invalid");
	    }

	    // Allow the request to proceed down the filter chain
	    filterChain.doFilter(request, response);
	}


}
