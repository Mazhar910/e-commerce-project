package com.simple.ecommerce.controllers;

import com.simple.ecommerce.models.Category;
import com.simple.ecommerce.models.Product;
import com.simple.ecommerce.models.Productlines;
import com.simple.ecommerce.payload.request.product.CreateRequest;
import com.simple.ecommerce.payload.response.MessageResponse;
import com.simple.ecommerce.repository.CategoryRepository;
import com.simple.ecommerce.repository.ProductRepository;
import com.simple.ecommerce.repository.ProductlinesRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.datatables.mapping.DataTablesInput;
import org.springframework.data.jpa.datatables.mapping.DataTablesOutput;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/product")
public class ProductController {
    @Autowired
    ProductlinesRepository productlinesRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    private ModelMapper modelMapper;

    @PostMapping("/create")
    public ResponseEntity<?> create(@Valid @RequestBody CreateRequest createRequest) {
        Productlines productlines = productlinesRepository.findById(createRequest.getProductLines()).isPresent() ? productlinesRepository.findById(createRequest.getProductLines()).get() : null;

        try {
            Product products = modelMapper.map(createRequest, Product.class);
            products.setProductlines(productlines);
            productRepository.save(products);

            return ResponseEntity.ok(new MessageResponse("Product Created Successfully"));
        } catch (Exception e) {
            return ResponseEntity.ok(new MessageResponse("Product Created Failed"));
        }
    }

    @PostMapping("/get/all")
    public DataTablesOutput<?> getAllProduct(@Valid @RequestBody DataTablesInput input) {
        return productRepository.findAll(input);
    }


    @GetMapping("/get/all/cat")
    public ResponseEntity<?> getAllCategory() {
        return ResponseEntity.ok(productlinesRepository.findAll());
    }

    @GetMapping("/get-by-cat/{catID}")
    public ResponseEntity<?> getByCategory(@PathVariable Long catID) {
        Productlines productlines = productlinesRepository.findById(catID).isPresent() ? productlinesRepository.findById(catID).get() : null;
        return ResponseEntity.ok(productRepository.findByProductlines(productlines));
    }

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<?> getSpecificProduct(@PathVariable Long id) {
        Product product = productRepository.findById(id).get();
        return ResponseEntity.ok(product);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody CreateRequest updateRequest) {
        Product product = productRepository.findById(id).isPresent() ? productRepository.findById(id).get() : null;
        HashMap<String, Object> response = new HashMap<>();

        Productlines productlines = productlinesRepository.findById(updateRequest.getProductLines()).isPresent() ? productlinesRepository.findById(updateRequest.getProductLines()).get() : null;
        if (product != null) {
            product.setProductCode(updateRequest.getProductCode());
            product.setProductName(updateRequest.getProductName());
            product.setProductScale(updateRequest.getProductScale());
            product.setProductVendor(updateRequest.getProductVendor());
            product.setProductDescription(updateRequest.getProductDescription());
            product.setBuyPrice(updateRequest.getBuyPrice());
            product.setSellingPrice(updateRequest.getSellingPrice());
            product.setQuantityInStock(updateRequest.getQuantityInStock());
            product.setProductlines(productlines);
            productRepository.save(product);
            return ResponseEntity.ok(new MessageResponse("Product Updated Successfully"));
        }
        return ResponseEntity.ok(new MessageResponse("Product Updated Failed"));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Product product = productRepository.findById(id).isPresent() ? productRepository.findById(id).get() : null;

        if (product != null) {
            productRepository.delete(product);
            return ResponseEntity.ok(new MessageResponse("Product Deleted Successfully"));
        }
        return ResponseEntity.ok(new MessageResponse("Product Deleted Failed"));
    }
}
