package com.simple.ecommerce.controllers;

import com.simple.ecommerce.payload.request.EmployeeCreateReq;
import com.simple.ecommerce.payload.response.MessageResponse;
import com.simple.ecommerce.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/employee")
public class EmployeeController {

    @Autowired
    EmployeeRepository employeeRepository;

}
