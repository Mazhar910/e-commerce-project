package com.simple.ecommerce.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "ordered_products")
public class OrderedProducts {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private double qty;
    private double price;

    @JsonIgnoreProperties({"orderedProducts"})
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "order_id", nullable = false)
    private Order orders;

//    @JsonIncludeProperties({"sellingPrice, productName"})
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
}
