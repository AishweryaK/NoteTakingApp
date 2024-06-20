import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../../Navigation/routeTypes";
import { NAVIGATION } from "../../Constants/navConstants";

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
  