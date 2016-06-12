package com.hacklab.tpvmovil.adapter;

import android.content.Context;
import android.text.TextUtils;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import com.hacklab.tpvmovil.payment.service.dto.PaymentDetailsDTO;
import com.hacklab.tpvmovil.payment.service.enumerations.Currency;

import java.util.List;

/**
 * Created by Alejandro on 12/06/2016.
 */
public class TemplatesAdapter extends BaseAdapter{

    private Context context;
    private List<PaymentDetailsDTO> items;

    public TemplatesAdapter(Context context, List<PaymentDetailsDTO> items) {
        this.context = context;
        this.items = items;
    }

    @Override
    public int getCount() {
        return this.items.size();
    }

    @Override
    public Object getItem(int position) {
        return this.items.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {

        View rowView = convertView;

        if (convertView == null) {
            // Create a new view into the list.
            LayoutInflater inflater = (LayoutInflater) context
                    .getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            rowView = inflater.inflate(android.R.layout.simple_list_item_2, parent, false);
        }

        // Set data into the view.
        TextView text1 = (TextView) rowView.findViewById(android.R.id.text1);
        TextView text2 = (TextView) rowView.findViewById(android.R.id.text2);

        PaymentDetailsDTO item = this.items.get(position);
        text1.setText(item.getDescription());

        Currency currency = item.getCurrency();

        String symbol = TextUtils.isEmpty(currency.getSymbol()) ? currency.getId() : currency.getSymbol();

        text2.setText(item.getAmount() + " " + symbol);

        return rowView;
    }

}
