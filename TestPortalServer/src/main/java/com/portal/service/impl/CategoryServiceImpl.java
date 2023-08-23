package com.portal.service.impl;

import java.util.LinkedHashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.portal.model.assessment.Category;
import com.portal.repository.CategoryRepository;
import com.portal.service.CategoryServiceInterface;

@Service
public class CategoryServiceImpl implements CategoryServiceInterface {

	@Autowired
	private CategoryRepository catRepo;

	@Override
	public Category addCategory(Category category) {
		return this.catRepo.save(category);
	}

	@Override
	public Category updateCategotry(Category category) {
		return this.catRepo.save(category);
	}

	@Override
	public Set<Category> getCategories() {
		return new LinkedHashSet<>(this.catRepo.findAll());
	}

	@Override
	public Category getCategory(Long categoryId) {
		return this.catRepo.findById(categoryId).get();
	}

	@Override
	public void deleteCategory(Long categoryId) {
		Category category = new Category();
		category.setCategoryId(categoryId);
		catRepo.delete(category);
	}

}
