import { NativeModules, NativeEventEmitter, EmitterSubscription } from 'react-native';
import { AdEvent, AdEventListener, InterstitialAdModuleType } from './show_notes';

const { InterstitialAdModule } = NativeModules as { InterstitialAdModule: InterstitialAdModuleType };
const adEmitter = new NativeEventEmitter(InterstitialAdModule);



const loadInterstitial = (location: string): void => {
  InterstitialAdModule.loadInterstitial(location);
};

const showInterstitial = (location: string): void => {
  InterstitialAdModule.showInterstitial(location);
};

const addEventListener = (event: AdEvent, listener: AdEventListener): EmitterSubscription => {
  return adEmitter.addListener(event, listener);
};

const removeEventListener = (subscription: EmitterSubscription): void => {
  subscription.remove();
};

export default {
  loadInterstitial,
  showInterstitial,
  addEventListener,
  removeEventListener,
};

