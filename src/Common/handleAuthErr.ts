import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { showAlert } from "./alert";
import { CODE, ERRMSG, ERRTITLE } from "../Constants/strings";

export const handleAuthError = (e:any) => {
    const err: FirebaseAuthTypes.NativeFirebaseAuthError = e;
    const title = ERRTITLE.LOGIN;
    switch (err.code) {
      case CODE.INVALID :
        showAlert(title,ERRMSG.INVALID);
        break;
      case CODE.REQUESTS:
        showAlert(title,ERRMSG.REQUESTS);
        break;
      case CODE.USERNOTFOUND:
        showAlert(title,ERRMSG.USERNOTFOUND);
        break;
      case CODE.PASSWORD:
        showAlert(title,ERRMSG.PASSWORD);
        break;
      case CODE.REQUESTFAILED:
        showAlert(ERRTITLE.INTERNET,ERRMSG.REQUESTFAILED);
        break;
      default:
        showAlert(title,`${err.message}`);
        break;
    }
  };
  