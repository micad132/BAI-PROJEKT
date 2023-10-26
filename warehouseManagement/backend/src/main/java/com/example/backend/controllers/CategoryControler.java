package com.example.backend.controllers;

import com.example.backend.models.CategoryModel;
import com.example.backend.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoryControler {
    @Autowired
    CategoryRepository categoryRepository;

    @GetMapping("/")
    public List<CategoryModel> getCategory(){

        return categoryRepository.getAll();
    }

    @GetMapping("/{id}")
    public CategoryModel getCategoryById(@PathVariable("id") int id){
        return categoryRepository.getById(id);
    }

    @PostMapping("/add")
    public int add(@RequestBody List<CategoryModel> category){
        return categoryRepository.add(category);
    }
}
