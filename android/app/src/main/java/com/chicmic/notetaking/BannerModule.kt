package com.chicmic.notetaking

//import android.view.Gravity
//import android.widget.FrameLayout
//import android.widget.LinearLayout
//import android.widget.Toast
//import com.chartboost.sdk.Chartboost
//import com.chartboost.sdk.ads.Banner
//import com.facebook.react.bridge.ReactApplicationContext
//import com.facebook.react.bridge.ReactContextBaseJavaModule
//import com.facebook.react.bridge.ReactMethod
//
//class BannerModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
//
//    init {
//        Chartboost.startWithAppId(reactContext, "6672a0b7a38c3eb3060060a4", "680855b52d2d3ee3a2936e01df846fd8ee42efe5") { startError ->
//            if (startError == null) {
//                Toast.makeText(reactContext, "SDK", Toast.LENGTH_SHORT).show()
//            } else {
//                Toast.makeText(reactContext.applicationContext, "SDK initialized with error: ${startError.code.name}", Toast.LENGTH_SHORT).show()
//            }
//        }
//    }
//    override fun getName(): String {
//        return "BannerModule"
//    }
//
//    @ReactMethod
//    fun showToast (message:String) {
//        val toast =Toast.makeText(reactContext, message , Toast.LENGTH_SHORT).show()
//    }
//
//
////    @ReactMethod
////    fun initializeChartboost(appId: String, appSignature: String) {
////        Chartboost.startWithAppId(reactContext, "6672a0b7a38c3eb3060060a4", "680855b52d2d3ee3a2936e01df846fd8ee42efe5")
////        Chartboost.onCreate(reactContext.currentActivity)
////        Chartboost.onStart(reactContext.currentActivity)
////    }
//
////    @ReactMethod
////    fun showBannerAd(placementId: String) {
////        val rootView = reactContext.currentActivity?.findViewById<FrameLayout>(android.R.id.content)
////        val banner = Banner(reactContext, placementId)
////        val layoutParams = LinearLayout.LayoutParams(
////            LinearLayout.LayoutParams.MATCH_PARENT,
////            LinearLayout.LayoutParams.WRAP_CONTENT
////        )
////        rootView?.addView(banner, 0, layoutParams)
////        banner.show()
////    }
//
//}

import android.util.Log
import android.view.Gravity
import android.view.ViewGroup
import android.view.ViewGroup.LayoutParams
import android.widget.FrameLayout
import android.widget.Toast
import com.chartboost.sdk.Chartboost
import com.chartboost.sdk.ads.Banner
import com.chartboost.sdk.callbacks.BannerCallback
import com.chartboost.sdk.events.CacheError
import com.chartboost.sdk.events.CacheEvent
import com.chartboost.sdk.events.ClickError
import com.chartboost.sdk.events.ClickEvent
import com.chartboost.sdk.events.ImpressionEvent
import com.chartboost.sdk.events.ShowError
import com.chartboost.sdk.events.ShowEvent
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class BannerModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private var chartboostBanner: Banner? = null

    init {
        Chartboost.startWithAppId(reactContext, "6672a0b7a38c3eb3060060a4", "680855b52d2d3ee3a2936e01df846fd8ee42efe5") { startError ->
            if (startError == null) {
//                Toast.makeText(reactContext, "SDK initialized", Toast.LENGTH_SHORT).show()
            } else {
                Toast.makeText(reactContext.applicationContext, "SDK initialized with error: ${startError.code.name}", Toast.LENGTH_SHORT).show()
            }
        }
    }

    override fun getName(): String {
        return "BannerModule"
    }

    @ReactMethod
    fun showToast(message: String) {
        Toast.makeText(reactContext, message, Toast.LENGTH_SHORT).show()
    }

    @ReactMethod
    fun showBannerAd() {
        val context = reactContext
        if (chartboostBanner == null) {
            chartboostBanner = Banner(context, "banner_ad",  Banner.BannerSize.STANDARD, object : BannerCallback {
                override fun onAdClicked(event: ClickEvent, error: ClickError?) {
//                    Toast.makeText(reactContext, "Banner ad clicked", Toast.LENGTH_SHORT).show()
                    Log.d("clickEvent", "clickEvent")
                }

                override fun onAdLoaded(event: CacheEvent, error: CacheError?) {
                    Toast.makeText(context, "Banner ad loaded", Toast.LENGTH_SHORT).show()
                    displayBanner()
//                    Toast.makeText(context, "Banner ad after", Toast.LENGTH_SHORT).show()
                    Log.d("cacheEvent", "cacheEvent")
                }

                override fun onAdRequestedToShow(event: ShowEvent) {
//                    Toast.makeText(reactContext, "Banner ad Requested", Toast.LENGTH_SHORT).show()
                }

                override fun onAdShown(event: ShowEvent, error: ShowError?) {
                    Toast.makeText(reactContext, "Banner ad Shown", Toast.LENGTH_SHORT).show()
//                    chartboostBanner?.show()
//                    displayBanner()
                }

                override fun onImpressionRecorded(event: ImpressionEvent) {
//                    Toast.makeText(reactContext, "Impression", Toast.LENGTH_SHORT).show()
                }
            }, null)
            chartboostBanner?.cache()
        }
        chartboostBanner?.show()
    }

//    @ReactMethod
//    fun hideBannerAd() {
//        Toast.makeText(reactContext, "hide", Toast.LENGTH_SHORT).show()
//        chartboostBanner?.detach()
//    }

    @ReactMethod
    fun hideBannerAd() {
        currentActivity?.runOnUiThread {
            val rootLayout = currentActivity?.findViewById<FrameLayout>(android.R.id.content)
            if (chartboostBanner?.parent != null) {
                Log.d("BannerModule", "Removing banner from parent")
                (chartboostBanner?.parent as? ViewGroup)?.removeView(chartboostBanner)
            }
            chartboostBanner = null
        }
    }

    private fun displayBanner() {
        val params = FrameLayout.LayoutParams(
            LayoutParams.MATCH_PARENT,
            LayoutParams.WRAP_CONTENT
        )
        params.gravity = Gravity.BOTTOM

//        currentActivity?.runOnUiThread {
//            val rootLayout = currentActivity?.findViewById<FrameLayout>(android.R.id.content)
//            rootLayout?.addView(chartboostBanner, params)
//        }

        currentActivity?.runOnUiThread {
            if (chartboostBanner?.parent != null) {

                (chartboostBanner?.parent as? ViewGroup)?.removeView(chartboostBanner)
            }

            val rootLayout = currentActivity?.findViewById<FrameLayout>(android.R.id.content)
            rootLayout?.addView(chartboostBanner, params)
        }
    }
}


