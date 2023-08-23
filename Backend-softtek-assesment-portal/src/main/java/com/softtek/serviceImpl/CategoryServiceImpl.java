package com.softtek.serviceImpl;

import java.util.LinkedHashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.softtek.entities.Category;
import com.softtek.repositories.CategoryRepository;
import com.softtek.services.ICategoryService;

/**
 * 
 * @author shivanagoud.annigeri
 *
 */
@Service
public class CategoryServiceImpl  implements ICategoryService{
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
	public String deleteCategory(Long categoryId) {
		if(catRepo.findById(categoryId)!=null) {
			catRepo.deleteById(categoryId);
			return "deleted";
		}
		else {
			 return "ID not found";
		}
	}

}
