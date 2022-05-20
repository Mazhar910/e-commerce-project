package com.simple.ecommerce.controllers;

import com.simple.ecommerce.models.Category;
import com.simple.ecommerce.models.Productlines;
import com.simple.ecommerce.repository.CategoryRepository;
import com.simple.ecommerce.repository.ProductRepository;
import com.simple.ecommerce.repository.ProductlinesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/customer")
public class CustomerController {
    @Autowired
    ProductRepository productRepository;

    @Autowired
    ProductlinesRepository productlinesRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @GetMapping("/product/get/all")
    public ResponseEntity<?> getAllProduct() {
        return ResponseEntity.ok(productRepository.findAll());
    }

    @GetMapping("/category/get/all")
    public ResponseEntity<?> getAllCategory() {
        return ResponseEntity.ok(categoryRepository.findAll());
    }

    @GetMapping("/get-by-cat/{catID}")
    public ResponseEntity<?> getByCategory(@PathVariable Long catID) {
        if (catID.equals(0L)) {
            return ResponseEntity.ok(productRepository.findAll());
        }
        Productlines productlines = productlinesRepository.findById(catID).isPresent() ? productlinesRepository.findById(catID).get() : null;
        return ResponseEntity.ok(productRepository.findByProductlines(productlines));
    }
}
