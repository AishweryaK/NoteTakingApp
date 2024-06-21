import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { showAlert } from "./alert";
import { ERR_CODE, ERR_MSG, ERR_TITLE, TITLE } from "../Constants/strings";
import { statusCodes } from "@react-native-google-signin/google-signin";

export const handleAuthError = (e:any, context:string) => {
    const err: FirebaseAuthTypes.NativeFirebaseAuthError = e;
    const title = context === TITLE.LOGIN ? ERR_TITLE.LOGIN : ERR_TITLE.SEND_EMAIL;
    switch (err.code) {
      case ERR_CODE.INVALID :
        showAlert(title,context === TITLE.LOGIN ? ERR_MSG.INVALID : ERR_MSG.INCORRECT_EMAIL);
        break;
      case ERR_CODE.REQUESTS:
        showAlert(title,ERR_MSG.REQUESTS);
        break;
      case ERR_CODE.USER_NOT_FOUND:
        showAlert(title,ERR_MSG.USER_NOT_FOUND);
        break;
      case ERR_CODE.WRONG_PASSWORD:
        showAlert(title,ERR_MSG.PASSWORD);
        break;
      case ERR_CODE.REQUEST_FAILED:
        showAlert(ERR_TITLE.INTERNET,ERR_MSG.REQUEST_FAILED);
        break;
        case ERR_CODE.INVALID_EMAIL:
          showAlert(title,ERR_MSG.INVALID_EMAIL);
          break;
      default:
        showAlert(title,`${err.message}`);
        break;
    }
  };
  

  export const handleSignUpError = (e:any) => {
    const err: FirebaseAuthTypes.NativeFirebaseAuthError = e;
    const title = ERR_TITLE.SIGNUP;
    switch (err.code) {
      case ERR_CODE.ALREADY_IN_USE :
        showAlert(title,ERR_MSG.ALREADY_IN_USE);
        break;
        case ERR_CODE.REQUEST_FAILED:
          showAlert(ERR_TITLE.INTERNET,ERR_MSG.REQUEST_FAILED);
          break;
      default:
        showAlert(title,`${err.message}`);
        break;
    }
  };

  export const handleGoogleError = (err:any) => {
    const message = '';
    switch (err.code) {
      case statusCodes.SIGN_IN_CANCELLED :
        showAlert(message,ERR_MSG.GOOGLE_CANCELLED);
        break;
        case statusCodes.IN_PROGRESS:
          showAlert(message,ERR_MSG.IN_PROGRESS);
          break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            showAlert(message,ERR_MSG.PLAY_SERVICES);
            break;
      default:
        showAlert(ERR_TITLE.ERROR,`${err.message}`);
        break;
    }
  };

