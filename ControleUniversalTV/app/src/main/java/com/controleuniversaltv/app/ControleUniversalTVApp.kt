package com.controleuniversaltv.app

import android.app.Application
import dagger.hilt.android.HiltAndroidApp

@HiltAndroidApp
class ControleUniversalTVApp : Application() {
    override fun onCreate() {
        super.onCreate()
    }
}
