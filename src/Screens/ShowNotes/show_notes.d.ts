import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../../Navigation/routeTypes";
import { NAVIGATION } from "../../Constants/navConstants";
import { NativeModule } from "react-native/types";

export interface Note {
    id: string;
    title: string;
    desc: string;
    createdAt: FirebaseFirestoreTypes.Timestamp;
  }

  export interface EditCollProps {
    visible: boolean;
    onClose: () => void;
    label:string;
    navigation : NativeStackNavigationProp<RootStackParamsList, typeof NAVIGATION.NOTESCREEN>
  }

  export interface InterstitialAdModuleType extends NativeModule{
    loadInterstitial(location: string): void;
    showInterstitial(location: string): void;
  }

export type AdEvent = 'onAdLoaded' | 'onAdFailedToLoad' | 'onAdShown' | 'onAdDismissed';

export interface AdEventData {
  location: string;
  error?: string;
}

export type AdEventListener = (event: AdEventData) => void;
  