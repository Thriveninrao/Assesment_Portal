package com.portal.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.portal.model.assessment.Category;

public interface CategoryRepository extends JpaRepository<Category, Long>{

}
