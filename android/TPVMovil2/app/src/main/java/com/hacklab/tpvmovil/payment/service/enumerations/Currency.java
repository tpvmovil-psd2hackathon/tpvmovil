package com.hacklab.tpvmovil.payment.service.enumerations;

import android.text.TextUtils;

/**
 * Created by Alejandro on 11/06/2016.
 */
public enum Currency {

    GBP("GBP", "£"),
    EUR("EUR", "€"),
    USD("USD","$"),
    JPY("JPY","¥"),
    CHF("CHF", null),
    HUF("HUF", "Ft"),
    CZK("CZK", "Kč"),
    PLN("PLN", "zł");

    private final String id;
    private final String symbol;

    Currency(String id, String symbol){
        this.id = id;
        this.symbol = symbol;
    }

    public String getId() {
        return id;
    }

    public String getSymbol() { return symbol;}

    public String toString(){
        StringBuilder builder = new StringBuilder();

        builder.append(getId());

        if(!TextUtils.isEmpty(getSymbol())){
            builder.append(" ("+getSymbol()+")");
        }

        return builder.toString();
    }

}
