import { Theme } from "../Assets/Colors/themeColors";

export const THEME: { LIGHT: Theme; DARK: Theme } = {
    LIGHT: 'LIGHT',
    DARK: 'DARK',
  };

export const TITLE = {
    ADDNOTE : "Add Note",
    NOTES : "Notes",
    USERACCOUNT : "User Account",
    BACK : "BACK",
    LOGIN : "Log in",
    SIGNUP : "Sign up",
    FORGOT : "Forgot Password",
    SOMETHING : "Something",
    APP : "App"
}

export const SLICE = {
    USER : "user",
    INTERNET : "internet"
}

export const ERRCONSOLE = {
    DELETEPHOTOS : 'Error deleting photo: ',

}

export const ERR_CODE ={
    INVALID:'auth/invalid-credential',
    REQUESTS:'auth/too-many-requests',
    USER_NOT_FOUND:'auth/user-not-found',
    WRONG_PASSWORD:'auth/wrong-password',
    REQUEST_FAILED:'auth/network-request-failed',
    ALREADY_IN_USE : 'auth/email-already-in-use',

}

export const ERRTITLE = {
    LOGIN : 'Error logging in',
    INTERNET :'No Internet Connection',
    SIGNUP : 'Error signing up',
}

export const ERRMSG = {
    INVALID:'Incorrect email or password',
    REQUESTS:'All requests from this device are blocked due to unusual activity. Please try again later',
    USER_NOT_FOUND:'No user corresponding this email exists. Please Sign up',
    PASSWORD:'Incorrect Password. Please try again or reset your password.',
    REQUEST_FAILED:'Please check your internet connection and try again.',
    ALREADY_IN_USE : 'The email address is already in use',
    GOOGLE_CANCELLED: 'Google Sign-In Cancelled',
    IN_PROGRESS: 'Signin in progress',
    PLAY_SERVICES: 'Play Services not available'
}
