package com.softtek.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.softtek.entities.Category;

/**
 * 
 * @author shivanagoud.annigeri
 *
 */
public interface CategoryRepository extends JpaRepository<Category, Long> {

}
