import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { NAVIGATION } from "../Constants/navConstants";

  export type RootStackParamsList = {
    WALKTHROUGH: undefined;
    LOGIN: undefined;
    SIGNUP: undefined;
    FORGOTPASS: undefined;
    HOMESCREEN: undefined;
    ADDNOTE:{uid:string, itemTitle:string, itemDesc:string};
    NOTESCREEN: undefined;
    SETTINGS: undefined;
    HOME: undefined;
    CHECKLIST: undefined;
    LAMP: undefined;
    ACCOUNT:undefined;
  };
   
    export interface HomeScreenProps {
      navigation: NativeStackNavigationProp<RootStackParamsList, typeof NAVIGATION.HOMESCREEN>
    }
   
    export interface LoginScreenProps {
      navigation: NativeStackNavigationProp<RootStackParamsList, typeof NAVIGATION.LOGIN>
    }

    export interface AddNoteScreenProps {
      navigation: NativeStackNavigationProp<RootStackParamsList, typeof NAVIGATION.ADDNOTE>
    }

    export interface WalkthroughScreenProps {
      navigation: NativeStackNavigationProp<RootStackParamsList, typeof NAVIGATION.WALKTHROUGH>
    }

    export interface SignupScreenProps {
      navigation: NativeStackNavigationProp<RootStackParamsList, typeof NAVIGATION.SIGNUP>
    }

    export interface ForgotPassScreenProps {
      navigation: NativeStackNavigationProp<RootStackParamsList, typeof NAVIGATION.FORGOTPASS>
    }

    export interface NoteScreenProps {
      navigation: NativeStackNavigationProp<RootStackParamsList, typeof NAVIGATION.NOTESCREEN>
    }

    export interface AccountScreenProps {
      navigation: NativeStackNavigationProp<RootStackParamsList, typeof NAVIGATION.ACCOUNT>
    }

