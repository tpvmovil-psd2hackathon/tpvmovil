package com.hacklab.tpvmovil;

import android.content.Intent;
import android.os.Bundle;
import android.os.StrictMode;
import android.support.design.widget.NavigationView;
import android.support.v4.app.NotificationManagerCompat;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v4.app.NotificationCompat;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;

import com.crashlytics.android.Crashlytics;
import com.google.gson.Gson;
import com.hacklab.tpvmovil.payment.service.dto.PaymentDetailsDTO;
import com.hacklab.tpvmovil.payment.service.enumerations.Currency;
import com.hacklab.tpvmovil.payment.service.impl.PaymentServiceImpl;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.net.URISyntaxException;

import io.fabric.sdk.android.Fabric;
import io.socket.client.IO;
import io.socket.client.Socket;
import io.socket.emitter.Emitter;

public class TPVActivity extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener {

    EditText amountEditText;
    Spinner currencySpinner;
    EditText descriptionEditText;
    Button createPaymentButton;

    PaymentServiceImpl service;

    private PaymentDetailsDTO payment;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        Intent intent = getIntent();
        payment = new PaymentDetailsDTO();

        try{
            String description = intent.getExtras().getString("description");
            Double amount = intent.getExtras().getDouble("amount");
            String currency = intent.getExtras().getString("currency");


            payment.setDescription(description);
            payment.setAmount(amount);
            for(Currency c : Currency.values()){
                if(c.name().equalsIgnoreCase(currency)){
                    payment.setCurrency(c);
                    break;
                }
            }
        } catch (Exception e){}

        super.onCreate(savedInstanceState);
        Fabric.with(this, new Crashlytics());
        setContentView(R.layout.activity_tpv);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.setDrawerListener(toggle);
        toggle.syncState();

        NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);

        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);

        service = new PaymentServiceImpl();

        String login = null;
        try {
            login = service.login();
        } catch (IOException e) {
            e.printStackTrace();
        }

        currencySpinner = (Spinner) findViewById(R.id.currency);
        amountEditText = (EditText) findViewById(R.id.amount);
        descriptionEditText = (EditText) findViewById(R.id.description);
        createPaymentButton = (Button) findViewById(R.id.createPayment);

        currencySpinner.setSelection(payment.getCurrency().ordinal());

        amountEditText.setText(payment.getAmount() != null ? payment.getAmount().toString() : "0.0");
        descriptionEditText.setText(payment.getDescription());

        ArrayAdapter<Currency> adapter = new ArrayAdapter<>(this, R.layout.spinner_item, Currency.values());
        adapter.setDropDownViewResource(R.layout.spinner_dropdown_item);
        currencySpinner.setAdapter(adapter);

        createPaymentButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                boolean err = false;

                if( amountEditText.getText().toString().trim().equals("")){
                    amountEditText.setError( "Amount is required!" );
                    err = true;
                }
                if( descriptionEditText.getText().toString().trim().equals("")){
                    descriptionEditText.setError( "Description is required!" );
                    err = true;
                }

                if(err){
                    return;
                }

                String createPayment = null;

                payment.setAmount(new Double(amountEditText.getText().toString()));
                payment.setDescription(descriptionEditText.getText().toString());

                String currencySpinner = TPVActivity.this.currencySpinner.getSelectedItem().toString();
                String currencyString = currencySpinner.split(" ")[0];
                for(Currency currency : Currency.values()){
                    if(currency.name().equalsIgnoreCase(currencyString)){
                        payment.setCurrency(currency);
                        break;
                    }
                }

                Gson gson = new Gson();
                String jsonRepresentation = gson.toJson(payment);
                jsonRepresentation = "{\"payment\":" + jsonRepresentation + "}";

                try{
                    createPayment = service.createPayment(jsonRepresentation);
                } catch (IOException e){
                    e.printStackTrace();
                }

                String paymentUrl = PaymentServiceImpl.BASE_URL_FRONT + "payment?hash=";
                try {
                    JSONObject jsonObject = new JSONObject(createPayment);
                    paymentUrl += jsonObject.getString("hash");
                } catch (JSONException e) {
                    e.printStackTrace();
                }

                try {
                    final Socket socketio= IO.socket(PaymentServiceImpl.BASE_URL_BACK+"");
                    socketio.on("payment", new Emitter.Listener(){

                        @Override
                        public void call(Object... args) {
                            NotificationCompat.Builder mBuilder =
                                    new NotificationCompat.Builder(TPVActivity.this)
                                            .setSmallIcon(R.mipmap.ic_launcher)
                                            .setContentTitle(getString(R.string.payment_notification_header))
                                            .setContentText(getString(R.string.payment_notification_content));

                            NotificationManagerCompat notificationManager =
                                    NotificationManagerCompat.from(TPVActivity.this);

                            notificationManager.notify(1, mBuilder.build());

                            socketio.disconnect();
                            socketio.close();
                        }
                    });
                } catch (URISyntaxException e) {
                    e.printStackTrace();
                }

                Intent sharingIntent = new Intent(android.content.Intent.ACTION_SEND);
                sharingIntent.setType("text/plain");
                sharingIntent.putExtra(android.content.Intent.EXTRA_SUBJECT, getString(R.string.payment_url));
                sharingIntent.putExtra(android.content.Intent.EXTRA_TEXT, paymentUrl);
                startActivity(Intent.createChooser(sharingIntent, getResources().getString(R.string.share)));

            }
        });

    }

    @Override
    public void onBackPressed() {
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        if (drawer.isDrawerOpen(GravityCompat.START)) {
            drawer.closeDrawer(GravityCompat.START);
        } else {
            super.onBackPressed();
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    @SuppressWarnings("StatementWithEmptyBody")
    @Override
    public boolean onNavigationItemSelected(MenuItem item) {
        // Handle navigation view item clicks here.
        int id = item.getItemId();

        if (id == R.id.nav_create_payment) {
            // Handle the camera action
        } else if (id == R.id.nav_list_payments) {
            Intent i = new Intent(this, TemplateActivity.class);
            startActivity(i);
        }

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        drawer.closeDrawer(GravityCompat.START);
        return true;
    }
}
