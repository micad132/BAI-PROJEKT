package com.example.backend.repository;

import com.example.backend.models.CategoryModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CategoryRepository {
    @Autowired
    JdbcTemplate jdbcTemplate;
    public List<CategoryModel> getAll(){
        return jdbcTemplate.query("SELECT id,name FROM Category",
                BeanPropertyRowMapper.newInstance(CategoryModel.class));
    }

    public CategoryModel getById(int id){
        return jdbcTemplate.queryForObject("SELECT id,name FROM Category WHERE id=?",
                BeanPropertyRowMapper.newInstance(CategoryModel.class),id);
    }

    public int add(List<CategoryModel> category){
        category.forEach(item->jdbcTemplate.update(
                "INSERT INTO Category(name) VALUES (?)", item.getName()
        ));
        return 0;
    }
}
