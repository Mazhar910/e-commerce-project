package com.simple.ecommerce.payload.request.product;

import lombok.Data;

@Data
public class CreateRequest {
    private String productName;

    private String productCode;

    private Long productLines;

    private String productScale;

    private String productVendor;

    private String productDescription;

    private int quantityInStock;

    private Double buyPrice;

    private Double sellingPrice;

    private byte[] image;
}
