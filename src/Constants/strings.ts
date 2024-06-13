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

export const CODE ={
    INVALID:'auth/invalid-credential',
    REQUESTS:'auth/too-many-requests',
    USERNOTFOUND:'auth/user-not-found',
    PASSWORD:'auth/wrong-password',
    REQUESTFAILED:'auth/network-request-failed',
}

export const ERRTITLE = {
    LOGIN : 'Error logging in',
    INTERNET :'No Internet Connection',
}

export const ERRMSG = {
    INVALID:'Incorrect email or password',
    REQUESTS:'All requests from this device are blocked due to unusual activity. Please try again later',
    USERNOTFOUND:'No user corresponding this email exists. Please Sign up',
    PASSWORD:'Incorrect Password. Please try again or reset your password.',
    REQUESTFAILED:'Please check your internet connection and try again.',
}