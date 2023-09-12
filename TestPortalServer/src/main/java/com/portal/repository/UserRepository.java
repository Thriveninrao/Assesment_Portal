package com.portal.repository;

import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.portal.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

	public User findByUsername(String username);

	public Set<User> findByLoginRequestedTrue();
	
	@Modifying
    @Transactional
    @Query("UPDATE User u SET u.loginRequested = false WHERE u.username = ?1")
    public void updateLoginRequestedToFalseByUsername(String username);
	
	@Modifying
	@Transactional
	@Query("UPDATE User u SET u.loggedIn = false WHERE u.username = ?1")
	public void updateLoggedInToFalseByUsername(String username);
	
	@Modifying
	@Transactional
	@Query("UPDATE User u SET u.password = ?2 WHERE u.username = ?1")
	public void updatePasswordByUsername(String username, String password);

	@Query("SELECT ur.role.roleId FROM UserRole ur WHERE ur.user.id = (SELECT u.id FROM User u WHERE u.username = :username)")
    public Long findRoleRoleIdByUsername(@Param("username") String username);

}
