import { Theme } from "../Assets/Colors/themeColors";

export const THEME: { LIGHT: Theme; DARK: Theme } = {
    LIGHT: 'LIGHT',
    DARK: 'DARK',
  };

  export const CLIENT_ID = {
    WEB:'630539047377-kfbbhc2l502b6gh679v5v7el4b618vou.apps.googleusercontent.com'
  }

export const TITLE = {
    ADDNOTE : "Add Note",
    NOTES : "Notes",
    USERACCOUNT : "User Account",
    BACK : "BACK",
    LOGIN : "Log in",
    SIGNUP : "Sign up",
    FORGOT : "Forgot Password",
    SOMETHING : "Something",
    APP : "App",
    LOGOUT : 'Logout'
}

export const SLICE = {
    USER : "user",
    INTERNET : "internet"
}

export const CONSTANTS = {
    PASSWORD:'password',
    CONFIRM_PASSWORD:'confirmPassword',
    EMAIL:'email',
    YES:'Yes',
    NO:'No',
}

export const ERR_CONSOLE = {
    DELETE_PHOTOS : 'Error deleting photo: ',
    DELETE_COLLECTION : 'Error deleting collection: ',
    DID_CANCEL:'User cancelled image picker',
    IMAGE_PICKER_ERR:'ImagePicker Error: ',
    PROFILE: "Error updating profile: ",
    SAVE_NOTE:'Error saving note:',
    OPENING_URL:'Error occurred while opening URL: ',
    STORAGE_INFO:'Error fetching storage information: ',
    DELETE_NOTE:'Error deleting note: ',
}

export const ERR_CODE ={
    INVALID:'auth/invalid-credential',
    REQUESTS:'auth/too-many-requests',
    USER_NOT_FOUND:'auth/user-not-found',
    WRONG_PASSWORD:'auth/wrong-password',
    REQUEST_FAILED:'auth/network-request-failed',
    ALREADY_IN_USE : 'auth/email-already-in-use',

}

export const ERR_TITLE = {
    LOGIN : 'Error logging in',
    INTERNET :'No Internet Connection',
    SIGNUP : 'Error signing up',
    ERROR : 'Error',
    ACTION_NOT_ALLOWED : 'Action Not Allowed',
    NO_URL:'No URL provided',
    EMPTY_NOTE:'Empty note',
    SUCCESS:'Success',
    EMAIL_SENT:'Email sent successfully!',
    SEND_EMAIL:'Error sending email'

}

export const ERR_MSG = {
    INVALID:'Incorrect email or password',
    REQUESTS:'All requests from this device are blocked due to unusual activity. Please try again later',
    USER_NOT_FOUND:'No user corresponding this email exists. Please Sign up',
    PASSWORD:'Incorrect Password. Please try again or reset your password.',
    REQUEST_FAILED:'Please check your internet connection and try again.',
    ALREADY_IN_USE : 'The email address is already in use',
    GOOGLE_CANCELLED: 'Google Sign-In Cancelled',
    IN_PROGRESS: 'Signin in progress',
    PLAY_SERVICES: 'Play Services not available',
    CANNOT_DELETE :'You cannot delete default collections.',
    ENTER_URL:'Please enter a URL',
    NOTE_DISCARDED:'It will be discarded',
    PASSWORD_INCORRECT:'Current password is incorrect',
    PASSWORD_SAME:'The new password cannot be the same as the current password.',
    FILL_ALL_FIELDS:'Please fill in all the fields.',
    CHANGED_PASSWORD:'Password changed successfully',
    SET_PASSWORD:'Please set a new password',
    INCORRECT_EMAIL:'Incorrect email'
}

export const COLLECTION = {
    USERS : 'users',
    PERSONAL :'Personal',
    ACADEMIC:'Academic',
    WORK:'Work',
    OTHERS:'Others',
}

export const DEFAULT_NOTE= {
    DESCRIPTION : 'This is where you write your description...',
}

export const IMAGES = {
    LABEL_LIGHT:require('../Assets/Images/LabelImg.png'),
    LABEL_DARK:require('../Assets/Images/Label_dark.png'),
    USER_IMG:require('../Assets/Images/userImg.jpeg'),
    HOME_LIGHT: require('../Assets/Images/AvailableSpace.png'),
    HOME_DARK:require('../Assets/Images/Home_dark.png'),
}

export const CUSTOM_LABEL = {
    FILES : "Files"
}

export const CUSTOM_LIST = {
    DELETE_COLLETION :'Delete Collection',
    ARE_YOU_SURE:'Are you sure you want to delete the',
    COLLECTION:'collection?',
}

export const GOOGLE = {
    CONTINUE :'Continue with Google'
}

export const UPLOAD_IMAGE = {
    GALLERY :'Set Image From Gallery',
    CAMERA:'Upload From Camera',
    REMOVE:'Remove Image',
    CANCEL:'Cancel',
}

export const ADDNOTE = {
    COLLECTIONS : 'Collections',
    CLOSE:'X',
    ADD_COLLECTION:"Add Collection",
    ENTER_COLLECTION:'*Enter collection name',
    ADD:'Add',
    TITLE:'Title',
    NOTE:'Note',
    SAVE:'Save',
}

export const DIALOG={
    LINK_URL:'Enter Link URL',
    ENTER_URL:"Enter URL",
    OK:'OK',
    CANCEL:'Cancel',
}

export const CHANGE_PASSWORD ={
    CHANGE:'Change Password',
    CURRENT: "Current Password",
    NEW:"New Password",
    CONFIRM_NEW:"Confirm New Password",
    CANCEL:"Cancel",
}

export const FEATURES = {
    NEW_FEATURES:'New features coming soon!!!'
}

export const FORGOT_PASSOWRD={
    VERIFY:'Verify',
    FORGOT : 'Forgot Password?'
}

export const HOME ={
    SPACE: 'Available Space',
    GB_OF:'GB of',
    GB_USED:'GB Used',
    WELCOME: 'Welcome,',
    NOTES_APP:'Notes App'
}

export const SETTINGS = {
    ARE_YOU_SURE:'Are you sure you want to logout?',
    THEME:'Theme',
    ACCOUNT:'Account',
    SETTINGS:'Settings'
}
