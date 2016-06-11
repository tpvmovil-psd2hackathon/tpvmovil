package com.hacklab.tpvmovil;

import android.app.Application;

import com.squareup.leakcanary.LeakCanary;

/**
 * Created by Alejandro on 11/06/2016.
 */
public class TPVMovilApplication extends Application {

    @Override public void onCreate() {
        super.onCreate();
        LeakCanary.install(this);
    }

}
