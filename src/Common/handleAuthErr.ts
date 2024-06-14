import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { showAlert } from "./alert";
import { ERR_CODE, ERRMSG, ERRTITLE } from "../Constants/strings";
import { statusCodes } from "@react-native-google-signin/google-signin";

export const handleSignInError = (e:any) => {
    const err: FirebaseAuthTypes.NativeFirebaseAuthError = e;
    const title = ERRTITLE.LOGIN;
    switch (err.code) {
      case ERR_CODE.INVALID :
        showAlert(title,ERRMSG.INVALID);
        break;
      case ERR_CODE.REQUESTS:
        showAlert(title,ERRMSG.REQUESTS);
        break;
      case ERR_CODE.USER_NOT_FOUND:
        showAlert(title,ERRMSG.USER_NOT_FOUND);
        break;
      case ERR_CODE.WRONG_PASSWORD:
        showAlert(title,ERRMSG.PASSWORD);
        break;
      case ERR_CODE.REQUEST_FAILED:
        showAlert(ERRTITLE.INTERNET,ERRMSG.REQUEST_FAILED);
        break;
      default:
        showAlert(title,`${err.message}`);
        break;
    }
  };
  

  export const handleSignUpError = (e:any) => {
    const err: FirebaseAuthTypes.NativeFirebaseAuthError = e;
    const title = ERRTITLE.SIGNUP;
    switch (err.code) {
      case ERR_CODE.ALREADY_IN_USE :
        showAlert(title,ERRMSG.ALREADY_IN_USE);
        break;
        case ERR_CODE.REQUEST_FAILED:
          showAlert(ERRTITLE.INTERNET,ERRMSG.REQUEST_FAILED);
          break;
      default:
        showAlert(title,`${err.message}`);
        break;
    }
  };

  export const handleGoogleError = (err:any) => {
    const message = undefined;
    switch (err.code) {
      case statusCodes.SIGN_IN_CANCELLED :
        showAlert(ERRMSG.GOOGLE_CANCELLED,message);
        break;
        case statusCodes.IN_PROGRESS:
          showAlert(ERRMSG.IN_PROGRESS,message);
          break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            showAlert(ERRMSG.PLAY_SERVICES,message);
            break;
      default:
        showAlert("Error",`${err.message}`);
        break;
    }
  };