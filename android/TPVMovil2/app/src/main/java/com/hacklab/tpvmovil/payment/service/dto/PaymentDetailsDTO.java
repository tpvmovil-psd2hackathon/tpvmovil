package com.hacklab.tpvmovil.payment.service.dto;

import com.hacklab.tpvmovil.payment.service.enumerations.Currency;

/**
 * Created by Alejandro on 11/06/2016.
 */
public class PaymentDetailsDTO {

    private Double amount;
    private Currency currency = Currency.GBP;
    private String description;

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Currency getCurrency() {
        return currency;
    }

    public void setCurrency(Currency currency) {
        this.currency = currency;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
