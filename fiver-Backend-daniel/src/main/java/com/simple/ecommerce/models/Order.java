package com.simple.ecommerce.models;

import java.sql.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double total;

    @Column(name = "orderDate")
    private java.sql.Date orderDate;

    @Column(name = "requiredDate")
    private java.sql.Date requiredDate;

    @Column(name = "shippedDate")
    private Date shippedDate;

    @Column(name = "status")
    private String status;

    @Column(name = "comments")
    private String comments;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "uid")
    private User user;

//    @JsonIgnore
    @OneToMany(mappedBy = "orders")
    private List<OrderedProducts> orderedProducts;

}
