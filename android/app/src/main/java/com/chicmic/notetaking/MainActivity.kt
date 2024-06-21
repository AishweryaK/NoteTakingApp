package com.chicmic.notetaking
import android.os.Bundle;
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.chartboost.sdk.Chartboost
import com.chartboost.sdk.ads.Banner
import com.chartboost.sdk.ads.Interstitial
import android.widget.Toast
import com.chartboost.sdk.callbacks.BannerCallback
import com.chartboost.sdk.events.CacheError
import com.chartboost.sdk.events.CacheEvent
import com.chartboost.sdk.events.ClickError
import com.chartboost.sdk.events.ClickEvent
import com.chartboost.sdk.events.ImpressionEvent
import com.chartboost.sdk.events.ShowError
import com.chartboost.sdk.events.ShowEvent

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "Note Taking"

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(null)

    Chartboost.startWithAppId(applicationContext, "6672a0b7a38c3eb3060060a4", "680855b52d2d3ee3a2936e01df846fd8ee42efe5") { startError ->
      if (startError == null) {
        Toast.makeText(this@MainActivity.applicationContext, "SDK is initialized", Toast.LENGTH_SHORT).show()
      } else {
        Toast.makeText(this@MainActivity.applicationContext, "SDK initialized with error: ${startError.code.name}", Toast.LENGTH_SHORT).show()
      }
    }
  }

//  val chartboostBanner:Banner = Banner(applicationContext, "start", Banner.BannerSize.STANDARD, object : BannerCallback {
//
//    override fun onAdLoaded(cacheEvent: CacheEvent, cacheError: CacheError?) {
//      if (cacheError != null) {
//        /* Handle error */
//      } else {
//        chartboostBanner.show()
//      }
//    }
//
//    override fun onAdRequestedToShow(showEvent: ShowEvent) {
//
//    }
//
//    override fun onAdShown(showEvent: ShowEvent, showError: ShowError?) {
//
//    }
//
//    override fun onAdClicked(clickEvent: ClickEvent, clickError: ClickError?) {
//
//    }
//
//    override fun onImpressionRecorded(impressionEvent: ImpressionEvent) {
//
//    }
//  }, null)

//  val chartboostBanner: Banner = Banner(
//    applicationContext,
//    "start",
//    Banner.BannerSize.STANDARD,
//    object : BannerCallback {
//      override fun onAdLoaded(cacheEvent: CacheEvent, cacheError: CacheError?) {
//        if (cacheError != null) {
//          /* Handle error */
//        } else {
//          chartboostBanner.show()
//        }
//      }
//
//      override fun onAdRequestedToShow(showEvent: ShowEvent) {
//        // Handle event when ad is requested to show
//      }
//
//      override fun onAdShown(showEvent: ShowEvent, showError: ShowError?) {
//        // Handle event when ad is shown
//      }
//
//      override fun onAdClicked(clickEvent: ClickEvent, clickError: ClickError?) {
//        // Handle event when ad is clicked
//      }
//
//      override fun onImpressionRecorded(impressionEvent: ImpressionEvent) {
//        // Handle impression event
//      }
//    },
//    null
//  )


  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
