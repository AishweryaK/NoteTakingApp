#import "InterstitialAdModule.h"
#import <React/RCTLog.h>
#import <ChartboostSDK/ChartboostSDK-Swift.h>


@implementation InterstitialAdModule {
  CHBInterstitial *interstitial;
}

RCT_EXPORT_MODULE();

+ (BOOL)requiresMainQueueSetup {
  return YES;
}

- (NSArray<NSString *> *)supportedEvents {
  return @[@"onAdLoaded", @"onAdFailedToLoad", @"onAdShown", @"onAdDismissed"];
}

RCT_EXPORT_METHOD(loadInterstitial:(NSString *)location) {
  dispatch_async(dispatch_get_main_queue(), ^{
    self->interstitial = [[CHBInterstitial alloc] initWithLocation:location delegate:self];
    [self->interstitial cache];
  });
}

RCT_EXPORT_METHOD(showInterstitial:(NSString *)location) {
  dispatch_async(dispatch_get_main_queue(), ^{
    if (self->interstitial.isCached) {
      [self->interstitial showFromViewController:RCTPresentedViewController()];
    } else {
      RCTLogInfo(@"Interstitial not ready");
    }
  });
}


// CHBInterstitialDelegate methods
- (void)didCacheAd:(CHBCacheEvent *)event error:(nullable CHBCacheError *)error {
  if (error) {
      [self sendEventWithName:@"onAdFailedToLoad" body:@{@"location": event.ad.location, @"error": error.localizedDescription}];
    } else {
      [self sendEventWithName:@"onAdLoaded" body:@{@"location": event.ad.location}];
    }
}

- (void)didFailToCacheAd:(CHBCacheEvent *)event withError:(nullable CHBCacheError *)error {
  [self sendEventWithName:@"onAdFailedToLoad" body:@{@"location": event.ad.location, @"error": error.localizedDescription}];
}

- (void)didShowAd:(CHBShowEvent *)event error:(nullable CHBShowError *)error {
  [self sendEventWithName:@"onAdShown" body:@{@"location": event.ad.location}];
}

- (void)didDismissAd:(CHBCacheEvent *)event {
  [self sendEventWithName:@"onAdDismissed" body:@{@"location": event.ad.location}];
}

@end

