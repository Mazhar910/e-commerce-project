package com.simple.ecommerce.models;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "employees")
public class Employees {
    @Id
    // @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "employeeNumber")
    private Integer employeeNumber;

    @Column(name = "firstName")
    private String firstName;
    @Column(name = "lastName")
    private String lastName;
    @Column(name = "extension")
    private String extension;
    @Column(name = "email")
    private String email;
    @Column(name = "officeCode")
    private Integer officeCode;
    @Column(name = "reportsTo")
    private Integer reportsTo;
    @Column(name = "jobTitle")
    private String jobTitle;
}
