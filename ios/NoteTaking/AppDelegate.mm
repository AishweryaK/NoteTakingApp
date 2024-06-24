#import "AppDelegate.h"
#import <Firebase.h>

#import <React/RCTBundleURLProvider.h>
#import <ChartboostSDK/Chartboost.h>


@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [FIRApp configure];
  self.moduleName = @"Note Taking";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  
  [Chartboost startWithAppID:@"6673c65803f52ff72e667223"
                  appSignature:@"a62698febdee80b09b4ff7d94d5cb302777a76c8"
                    completion:^(CHBStartError * _Nullable error) {
      if (error) {
        NSLog(@"Chartboost SDK initialization finished with error %@", error);
      } else {
        NSLog(@"Chartboost SDK initialization finished with success");
      }
    }];

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
//  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
