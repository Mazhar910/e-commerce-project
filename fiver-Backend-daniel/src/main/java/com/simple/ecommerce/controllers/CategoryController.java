package com.simple.ecommerce.controllers;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.datatables.mapping.DataTablesInput;
import org.springframework.data.jpa.datatables.mapping.DataTablesOutput;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.simple.ecommerce.models.Category;
import com.simple.ecommerce.models.Category;
import com.simple.ecommerce.payload.request.category.CreateRequest;
import com.simple.ecommerce.payload.response.MessageResponse;
import com.simple.ecommerce.repository.CategoryRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/category")
public class CategoryController {
	
	@Autowired
    CategoryRepository categoryRepository;

    @Autowired
    ModelMapper modelMapper;

    @PostMapping("/create")
    public ResponseEntity<?> create(@Valid @RequestBody CreateRequest createRequest) {
        Category category = modelMapper.map(createRequest, Category.class);
        categoryRepository.save(category);
        return ResponseEntity.ok(new MessageResponse("Category Created Successfully"));
    }


    @GetMapping("/get/{id}")
    public ResponseEntity<?> getSpecificCategory(@PathVariable Long id) {
        Category category = categoryRepository.findById(id).get();
        return ResponseEntity.ok(category);
    }


    @PostMapping("/get/all")
    public DataTablesOutput<?> getAllCategory(@Valid @RequestBody DataTablesInput input) {
        return categoryRepository.findAll(input);
    }

    @GetMapping("/get/all")
    public ResponseEntity<?> getAllCategory() {
        return ResponseEntity.ok(categoryRepository.findAll());
    }

    public static Specification<Category> onlyLoggedInUserData(Long user_id) {
        return (purchaseRoot, query, builder) -> builder.equal(purchaseRoot.get("user").get("id"), user_id);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody CreateRequest updateRequest) {
        Category category = categoryRepository.findById(id).isPresent() ? categoryRepository.findById(id).get() : null;

        if (category != null) {
            category.setName(updateRequest.getName());
            categoryRepository.save(category);
            return ResponseEntity.ok(new MessageResponse("Updated Successfully"));
        }
        return ResponseEntity.ok(new MessageResponse("Updated Failed"));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Category category = categoryRepository.findById(id).isPresent() ? categoryRepository.findById(id).get() : null;

        if (category != null) {
            categoryRepository.delete(category);
            return ResponseEntity.ok(new MessageResponse("Deleted Successfully"));
        }
        return ResponseEntity.ok(new MessageResponse("Delete Failed"));
    }
}


