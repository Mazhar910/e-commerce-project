package com.simple.ecommerce.payload.request.category;

import lombok.Data;

@Data
public class CreateRequest {
    private String name;
    private String textDescription;
    private String htmlDescription;
}
