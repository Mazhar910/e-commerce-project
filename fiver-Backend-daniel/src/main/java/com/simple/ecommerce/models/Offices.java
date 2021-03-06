package com.simple.ecommerce.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "offices")
public class Offices {
    //@GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    @Column(name = "officeCode")
    private String officeCode;

    @Column(name = "city")
    private String city;

    @Column(name = "phone")
    private String phone;

    @Column(name = "addressLine1")
    private String addressLine1;

    @Column(name = "addressLine2")
    private String addressLine2;

    @Column(name = "state")
    private String state;

    @Column(name = "country")
    private String country;

    @Column(name = "postalCode")
    private String postalCode;

    @Column(name = "territory")
    private String territory;

    //    @OneToMany(cascade = CascadeType.ALL)
//    @JoinColumn(name = "officeCode")
    @JsonIgnoreProperties({"officeCode"})
    @OneToMany(mappedBy = "officeCode", cascade = CascadeType.ALL)
    private List<Employees> employees;

    public Offices() {
        // TODO Auto-generated constructor stub
    }
}
