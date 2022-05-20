package com.simple.ecommerce.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "employees")
public class Employees {
//    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
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
    @Column(name = "reportsTo")
    private Integer reportsTo;
    @Column(name = "jobTitle")
    private String jobTitle;

    //    @Column(name = "officeCode")
    @JsonIgnoreProperties({"employees"})
    @ManyToOne(fetch = FetchType.EAGER, optional = true)
    @JoinColumn(name = "officeCode")
    private Offices officeCode;
}
