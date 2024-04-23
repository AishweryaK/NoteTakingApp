import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import { NAVIGATION } from "../Constants/navConstants";


  export type RootStackParamList = {
    HOMESCREEN: undefined;
    LOGIN : undefined;
   };
   
   
   export type HomeScreenProps = NativeStackScreenProps<
    RootStackParamList,
    "HOMESCREEN">;
   
   
   export type LoginScreenProps = NativeStackScreenProps<
    RootStackParamList,
    "LOGIN">;