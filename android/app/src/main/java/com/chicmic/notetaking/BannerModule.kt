package com.chicmic.notetaking
//
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
//    override fun getName(): String {
//        return "BannerModule"
//    }
//
//    @ReactMethod
//    fun initializeChartboost(appId: String, appSignature: String) {
//        Chartboost.startWithAppId(reactContext, "6672a0b7a38c3eb3060060a4", "680855b52d2d3ee3a2936e01df846fd8ee42efe5")
//        Chartboost.onCreate(reactContext.currentActivity)
//        Chartboost.onStart(reactContext.currentActivity)
//    }
//
//    @ReactMethod
//    fun showBannerAd(placementId: String) {
//        val rootView = reactContext.currentActivity?.findViewById<FrameLayout>(android.R.id.content)
//        val banner = Banner(reactContext, placementId)
//        val layoutParams = LinearLayout.LayoutParams(
//            LinearLayout.LayoutParams.MATCH_PARENT,
//            LinearLayout.LayoutParams.WRAP_CONTENT
//        )
//        rootView?.addView(banner, 0, layoutParams)
//        banner.show()
//    }
//}
