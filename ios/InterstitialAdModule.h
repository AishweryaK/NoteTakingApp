//
//  InterstitialAdModule.h
//  NoteTaking
//
//  Created by Alok Raj on 24/06/24.
//

//#ifndef InterstitialAdModule_h
//#define InterstitialAdModule_h

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <ChartboostSDK/Chartboost.h>
#import <ChartboostSDK/CHBInterstitial.h>

@interface InterstitialAdModule : RCTEventEmitter <RCTBridgeModule, CHBInterstitialDelegate>
@end

