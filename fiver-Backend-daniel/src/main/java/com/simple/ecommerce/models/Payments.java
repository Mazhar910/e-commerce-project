package com.simple.ecommerce.models;

import lombok.Data;

import javax.persistence.*;
import java.sql.Date;

@Data
@Entity
@Table(name = "payments")
public class Payments {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "paymentNumber")
	private Integer paymentNumber;
	
	@Column(name = "customerNumber")
	private Integer customerNumber;
	
	@Column(name = "checkNumber")
	private String checkNumber;
	
	@Column(name = "paymentDate")
	private Date paymentDate;
	
	@Column(name = "amount")
	private Double amount;

	public Payments() {
		// TODO Auto-generated constructor stub
	}

	public Payments(Date paymentDate, Double amount) {

		this.paymentDate = paymentDate;
		this.amount = amount;
	}

	public Integer getPaymentNumber() {
		return paymentNumber;
	}

	public Integer getCustomerNumber() {
		return customerNumber;
	}

	public String getCheckNumber() {
		return checkNumber;
	}

	public Date getPaymentDate() {
		return paymentDate;
	}

	public void setPaymentDate(Date paymentDate) {
		this.paymentDate = paymentDate;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

}
