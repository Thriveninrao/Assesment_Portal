package com.portal.repository;

import java.util.List;
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
	@Query("UPDATE User u SET u.loggedIn= false WHERE u.username = ?1")
	public void updateLoginLimitToOneByUsername(String username);

	@Modifying
	@Transactional
	@Query("UPDATE User u SET u.password = ?2 WHERE u.username = ?1")
	public void updatePasswordByUsername(String username, String password);

	@Query("SELECT ur.role.roleId FROM UserRole ur WHERE ur.user.id = (SELECT u.id FROM User u WHERE u.username = :username)")
    public Long findRoleRoleIdByUsername(@Param("username") String username);

	@Query("SELECT uss.assessment.assessmentId FROM UserAssessmentAssignment uss WHERE uss.user.id = (SELECT u.id FROM User u WHERE u.username = :username)")
	public List<Long> getUserAssessmentAssignmentIdByUserName(@Param("username") String username);

	@Query("SELECT count(uss.assignId) FROM UserAssessmentAssignment uss")
	public Integer getCountOfUserAssessmentAssignIdByUserName();
}
