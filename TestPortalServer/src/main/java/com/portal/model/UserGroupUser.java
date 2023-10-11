package com.portal.model;

import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import lombok.Data;

@Entity
@Data
public class UserGroupUser {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long userGroupUserId;

	@ManyToOne
	private User user;

	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private UserGroup userGroup;

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UserGroupUser other = (UserGroupUser) obj;
		return Objects.equals(userGroupUserId, other.userGroupUserId);
	}

	@Override
	public int hashCode() {
		return Objects.hash(userGroupUserId);
	}

	@Override
	public String toString() {
		return "UserGroupUser [user group =" + userGroup.getGroupName() + "]";
	}
}
