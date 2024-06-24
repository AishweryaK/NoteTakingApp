package com.chicmic.notetaking

import android.util.Log
import android.widget.Toast
import com.chartboost.sdk.Chartboost
import com.chartboost.sdk.ads.Banner
import com.chartboost.sdk.ads.Interstitial
import com.chartboost.sdk.callbacks.BannerCallback
import com.chartboost.sdk.callbacks.InterstitialCallback
import com.chartboost.sdk.events.CacheError
import com.chartboost.sdk.events.CacheEvent
import com.chartboost.sdk.events.ClickError
import com.chartboost.sdk.events.ClickEvent
import com.chartboost.sdk.events.DismissEvent
import com.chartboost.sdk.events.ImpressionEvent
import com.chartboost.sdk.events.ShowError
import com.chartboost.sdk.events.ShowEvent
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class InterstitialModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private var chartboostInterstitial: Interstitial? = null

    init {
        Chartboost.startWithAppId(reactContext, "6672a0b7a38c3eb3060060a4", "680855b52d2d3ee3a2936e01df846fd8ee42efe5") { startError ->
            if (startError == null) {
                // SDK initialized successfully
                Log.d("Chartboost", "SDK initialized successfully")
            } else {
                // SDK initialization failed
                Toast.makeText(reactContext, "SDK initialized with error: ${startError.code.name}", Toast.LENGTH_SHORT).show()
            }
        }
    }

    override fun getName(): String {
        return "InterstitialModule"
    }

    @ReactMethod
    fun showToast(message: String) {
        Toast.makeText(reactContext, message, Toast.LENGTH_SHORT).show()
    }

    @ReactMethod
    fun showInterstitialAd() {
        if (chartboostInterstitial == null) {
            chartboostInterstitial = Interstitial("interstitial_ad", object : InterstitialCallback {

                override fun onAdDismiss(event: DismissEvent) {
                    Log.d("Chartboost", "Interstitial ad dismissed")
                    chartboostInterstitial = null
                }

                override fun onAdLoaded(event: CacheEvent, error: CacheError?) {
                    if(error == null)
                    {
                        chartboostInterstitial?.show()
                    }
                }

                override fun onAdRequestedToShow(event: ShowEvent) {

                }

                override fun onAdShown(event: ShowEvent, error: ShowError?) {

                }

                override fun onAdClicked(event: ClickEvent, error: ClickError?) {
                    if (error == null) {
                        Log.d("Chartboost", "Interstitial ad clicked")
                    }
                }

                override fun onImpressionRecorded(event: ImpressionEvent) {
                }
            }, null)
        }

        chartboostInterstitial?.cache()
    }
}
