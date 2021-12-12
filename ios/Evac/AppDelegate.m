#import "AppDelegate.h"

#import <GoogleMaps/GoogleMaps.h>
#import <Firebase.h>

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

@implementation AppDelegate
- (void)applicationDidBecomeActive:(UIApplication *)application{
   [UIApplication sharedApplication].applicationIconBadgeNumber = 0;
 }

-(void)applicationDidEnterBackground:(UIApplication *)application{
   [UIApplication sharedApplication].applicationIconBadgeNumber = 0;
 }

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [GMSServices provideAPIKey:@"AIzaSyDB3eQrzJmvz3lK_B-u86y5tjS2WhLB_w0"];
  if ([FIRApp defaultApp] == nil) {
    [FIRApp configure];
    
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
      if (![defaults boolForKey:@"notFirstRun"]) {
        [defaults setBool:YES forKey:@"notFirstRun"];
        [defaults synchronize];
        [[FIRAuth auth] signOut:NULL];
      }
  }
  
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"Evac"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
