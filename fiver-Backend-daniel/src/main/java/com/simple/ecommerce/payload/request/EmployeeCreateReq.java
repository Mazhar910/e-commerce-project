package com.simple.ecommerce.payload.request;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class EmployeeCreateReq {

    private String name;

    private String designation;

    private String contactNumber;
}
