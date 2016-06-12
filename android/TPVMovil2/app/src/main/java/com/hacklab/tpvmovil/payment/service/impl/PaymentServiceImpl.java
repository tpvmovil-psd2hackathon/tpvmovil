package com.hacklab.tpvmovil.payment.service.impl;

import java.io.IOException;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

/**
 * Created by Alejandro on 11/06/2016.
 */
public class PaymentServiceImpl {

    public static final String BASE_URL = "http://highfredo.me:1337/";

    public static final MediaType JSON
            = MediaType.parse("application/json; charset=utf-8");

    private OkHttpClient client = new OkHttpClient();

    public String login() throws IOException {
        String url = BASE_URL+"user/login";

        RequestBody body = RequestBody.create(JSON, "{}");
        Request request = new Request.Builder()
                .url(url)
                .post(body)
                .build();
        Response response = client.newCall(request).execute();
        return response.body().string();
    }

    public String createPayment(String json) throws IOException {
        String url = BASE_URL+"api/payment";

        RequestBody body = RequestBody.create(JSON, json);
        Request request = new Request.Builder()
                .url(url)
                .put(body)
                .build();
        Response response = client.newCall(request).execute();
        return response.body().string();
    }

}
