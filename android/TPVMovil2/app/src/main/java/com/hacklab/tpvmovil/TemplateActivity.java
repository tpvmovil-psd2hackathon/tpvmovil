package com.hacklab.tpvmovil;

import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ListView;

import com.hacklab.tpvmovil.adapter.TemplatesAdapter;
import com.hacklab.tpvmovil.payment.service.dto.PaymentDetailsDTO;
import com.hacklab.tpvmovil.payment.service.enumerations.Currency;

import java.util.ArrayList;
import java.util.List;

public class TemplateActivity extends AppCompatActivity {

    ListView listView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_template);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        this.listView = (ListView) findViewById(R.id.list_view);

        List<PaymentDetailsDTO> list = new ArrayList<>();
        PaymentDetailsDTO dto1 = new PaymentDetailsDTO();
        dto1.setCurrency(Currency.GBP);
        dto1.setDescription("Revisión");
        dto1.setAmount(50.0);
        list.add(dto1);

        PaymentDetailsDTO dto2 = new PaymentDetailsDTO();
        dto2.setCurrency(Currency.GBP);
        dto2.setDescription("Purga de radiadores");
        dto2.setAmount(70.0);
        list.add(dto2);

        PaymentDetailsDTO dto3 = new PaymentDetailsDTO();
        dto3.setCurrency(Currency.GBP);
        dto3.setDescription("Vaciado de fosa séptica");
        dto3.setAmount(99.0);
        list.add(dto3);

//        PaymentDetailsDTO dto4 = new PaymentDetailsDTO();
//        dto4.setCurrency(Currency.GBP);
//        dto4.setDescription("Revisión");
//        dto4.setAmount(50.0);
//        list.add(dto4);

//        PaymentDetailsDTO dto5 = new PaymentDetailsDTO();
//        dto5.setCurrency(Currency.GBP);
//        dto5.setDescription("Revisión");
//        dto5.setAmount(50.0);
//        list.add(dto5);

        final TemplatesAdapter adapter = new TemplatesAdapter(this, list);

        this.listView.setAdapter(adapter);

        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {

            @Override
            public void onItemClick(AdapterView<?> parent, final View view,
                                    int position, long id) {
                final PaymentDetailsDTO item = (PaymentDetailsDTO) parent.getItemAtPosition(position);

                Intent i = new Intent(TemplateActivity.this, TPVActivity.class);
                i.putExtra("description", item.getDescription());
                i.putExtra("amount", item.getAmount());
                i.putExtra("currency", item.getCurrency().getId());
                startActivity(i);
            }

        });

    }

}
