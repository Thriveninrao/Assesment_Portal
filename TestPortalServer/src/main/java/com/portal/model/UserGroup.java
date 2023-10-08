package com.portal.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Entity
@Table(name = "USER_GROUP")
@Data
public class UserGroup {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long groupId;

	private String groupName;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "userGroup")
	@JsonIgnore
	private List<UserGroupUser> userGroupUser = new ArrayList<>();
}
