package com.simple.ecommerce.controllers;

import com.simple.ecommerce.models.Category;
import com.simple.ecommerce.models.Productlines;
import com.simple.ecommerce.payload.request.category.CreateRequest;
import com.simple.ecommerce.payload.response.MessageResponse;
import com.simple.ecommerce.repository.CategoryRepository;
import com.simple.ecommerce.repository.ProductlinesRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.datatables.mapping.DataTablesInput;
import org.springframework.data.jpa.datatables.mapping.DataTablesOutput;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/productline")
public class ProductLineController {
    @Autowired
    ProductlinesRepository productlinesRepository;

    @Autowired
    ModelMapper modelMapper;

    @PostMapping("/create")
    public ResponseEntity<?> create(@Valid @RequestBody CreateRequest createRequest) {
        Productlines productlines = modelMapper.map(createRequest, Productlines.class);
        productlinesRepository.save(productlines);
        return ResponseEntity.ok(new MessageResponse("Product Line Created Successfully"));
    }


    @GetMapping("/get/{id}")
    public ResponseEntity<?> getSpecificCategory(@PathVariable Long id) {
        Productlines productlines = productlinesRepository.findById(id).get();
        return ResponseEntity.ok(productlines);
    }


    @PostMapping("/get/all")
    public DataTablesOutput<?> getAllCategory(@Valid @RequestBody DataTablesInput input) {
        return productlinesRepository.findAll(input);
    }

    @GetMapping("/get/all")
    public ResponseEntity<?> getAllCategory() {
        return ResponseEntity.ok(productlinesRepository.findAll());
    }

    public static Specification<Category> onlyLoggedInUserData(Long user_id) {
        return (purchaseRoot, query, builder) -> builder.equal(purchaseRoot.get("user").get("id"), user_id);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody CreateRequest updateRequest) {
        Productlines productlines = productlinesRepository.findById(id).isPresent() ? productlinesRepository.findById(id).get() : null;

        if (productlines != null) {
            productlines.setHtmlDescription(updateRequest.getHtmlDescription());
            productlines.setTextDescription(updateRequest.getTextDescription());
            productlines.setName(updateRequest.getName());
            productlinesRepository.save(productlines);
            return ResponseEntity.ok(new MessageResponse("Updated Successfully"));
        }
        return ResponseEntity.ok(new MessageResponse("Updated Failed"));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Productlines productlines = productlinesRepository.findById(id).isPresent() ? productlinesRepository.findById(id).get() : null;

        if (productlines != null) {
            productlinesRepository.delete(productlines);
            return ResponseEntity.ok(new MessageResponse("Deleted Successfully"));
        }
        return ResponseEntity.ok(new MessageResponse("Delete Failed"));
    }
}
