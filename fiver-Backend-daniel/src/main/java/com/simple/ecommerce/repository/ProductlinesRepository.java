package com.simple.ecommerce.repository;

import com.simple.ecommerce.models.Productlines;
import org.springframework.data.jpa.datatables.repository.DataTablesRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductlinesRepository extends DataTablesRepository<Productlines, Long> {

}

