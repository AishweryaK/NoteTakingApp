import {Theme} from '../Assets/Colors/themeColors';

export const THEME: {LIGHT: Theme; DARK: Theme} = {
  LIGHT: 'LIGHT',
  DARK: 'DARK',
};

export const CLIENT_ID = {
  WEB: '630539047377-kfbbhc2l502b6gh679v5v7el4b618vou.apps.googleusercontent.com',
};

export const TITLE = {
  ADDNOTE: 'Add Note',
  NOTES: 'Notes',
  USERACCOUNT: 'User Account',
  BACK: 'BACK',
  LOGIN: 'Log in',
  SIGNUP: 'Sign up',
  FORGOT: 'Forgot Password',
  SOMETHING: 'Something',
  APP: 'App',
  LOGOUT: 'Logout',
};

export const SLICE = {
  USER: 'user',
  INTERNET: 'internet',
};

export const CONSTANTS = {
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  PASSWORD: 'password',
  CONFIRM_PASSWORD: 'confirmPassword',
  EMAIL: 'email',
  YES: 'Yes',
  NO: 'No',
  INCREMENT:'increment',
  DECREMENT:'decrement',
  CANCEL:'Cancel'
};

export const ERR_CONSOLE = {
  DELETE_PHOTOS: 'Error deleting photo: ',
  DELETE_COLLECTION: 'Error deleting collection: ',
  DID_CANCEL: 'User cancelled image picker',
  IMAGE_PICKER_ERR: 'ImagePicker Error: ',
  PROFILE: 'Error updating profile: ',
  SAVE_NOTE: 'Error saving note:',
  OPENING_URL: 'Error occurred while opening URL: ',
  STORAGE_INFO: 'Error fetching storage information: ',
  DELETE_NOTE: 'Error deleting note: ',
  NOT_FOUND:'Collection not found',

};

export const ERR_CODE = {
  INVALID: 'auth/invalid-credential',
  REQUESTS: 'auth/too-many-requests',
  USER_NOT_FOUND: 'auth/user-not-found',
  WRONG_PASSWORD: 'auth/wrong-password',
  REQUEST_FAILED: 'auth/network-request-failed',
  ALREADY_IN_USE: 'auth/email-already-in-use',
};

export const ERR_TITLE = {
  LOGIN: 'Error logging in',
  INTERNET: 'No Internet Connection',
  SIGNUP: 'Error signing up',
  ERROR: 'Error',
  ACTION_NOT_ALLOWED: 'Action Not Allowed',
  NO_URL: 'No URL provided',
  EMPTY_NOTE: 'Empty note',
  SUCCESS: 'Success',
  EMAIL_SENT: 'Email sent successfully!',
  SEND_EMAIL: 'Error sending email',
  UPDATING_COLLECTION : 'Error updating collection:',
};

export const ERR_MSG = {
  INVALID: 'Incorrect email or password',
  REQUESTS:
    'All requests from this device are blocked due to unusual activity. Please try again later',
  USER_NOT_FOUND: 'No user corresponding this email exists. Please Sign up',
  PASSWORD: 'Incorrect Password. Please try again or reset your password.',
  REQUEST_FAILED: 'Please check your internet connection and try again.',
  ALREADY_IN_USE: 'The email address is already in use',
  GOOGLE_CANCELLED: 'Google Sign-In Cancelled',
  IN_PROGRESS: 'Signin in progress',
  PLAY_SERVICES: 'Play Services not available',
  CANNOT_DELETE: 'You cannot delete default collections.',
  ENTER_URL: 'Please enter a URL',
  NOTE_DISCARDED: 'It will be discarded',
  PASSWORD_INCORRECT: 'Current password is incorrect',
  PASSWORD_SAME: 'The new password cannot be the same as the current password.',
  FILL_ALL_FIELDS: 'Please fill in all the fields.',
  CHANGED_PASSWORD: 'Password changed successfully',
  SET_PASSWORD: 'Please set a new password',
  INCORRECT_EMAIL: 'Incorrect email',
  SAME_USERNAME: 'User Name same as before. Please try again.',
  USERNAME_CHANGED: 'User Name changed successfully',
};

export const COLLECTION = {
  USERS: 'users',
  PERSONAL: 'Personal',
  ACADEMIC: 'Academic',
  WORK: 'Work',
  OTHERS: 'Others',
};

export const DEFAULT_NOTE = {
  DESCRIPTION: 'This is where you write your description...',
};

export const IMAGES = {
  LABEL_LIGHT: require('../Assets/Images/LabelImg.png'),
  LABEL_DARK: require('../Assets/Images/Label_dark.png'),
  USER_IMG: require('../Assets/Images/userImg.jpeg'),
  HOME_LIGHT: require('../Assets/Images/AvailableSpace.png'),
  HOME_DARK: require('../Assets/Images/Home_dark.png'),
  DIARY: require('../Assets/Images/Diary.png'),
};

export const CUSTOM_LABEL = {
  FILES: 'Files',
};

export const CUSTOM_LIST = {
  DELETE_COLLETION: 'Delete Collection',
  ARE_YOU_SURE: 'Are you sure you want to delete the',
  COLLECTION: 'collection?',
};

export const GOOGLE = {
  CONTINUE: 'Continue with Google',
};

export const UPLOAD_IMAGE = {
  GALLERY: 'Gallery',
  CAMERA: 'Camera',
  REMOVE: 'Remove',
  CANCEL: 'Cancel',
};

export const NAME_CHANGE = {
  USERNAME_CHANGE: 'Change User Name',
  FIRST_NAME: 'Enter First Name',
  LAST_NAME: 'Enter Last Name',
  CANCEL: 'Cancel',
  CHANGE: 'Change Username',
};

export const ADDNOTE = {
  COLLECTIONS: 'Collections',
  CLOSE: 'X',
  ADD_COLLECTION: 'Add Collection',
  ENTER_COLLECTION: '* Enter collection name',
  ERROR:'Error adding collection:',
  ADD: 'Add',
  TITLE: 'Title',
  NOTE: 'Note',
  SAVE: 'Save',
};

export const DIALOG = {
  LINK_URL: 'Enter Link URL',
  ENTER_URL: 'Enter URL',
  OK: 'OK',
  CANCEL: 'Cancel',
};

export const CHANGE_PASSWORD = {
  CHANGE: 'Change Password',
  CURRENT: 'Current Password',
  NEW: 'New Password',
  CONFIRM_NEW: 'Confirm New Password',
  CANCEL: 'Cancel',
};

export const FEATURES = {
  NEW_FEATURES: 'New features coming soon!!!',
};

export const FORGOT_PASSOWRD = {
  VERIFY: 'Verify',
  FORGOT: 'Forgot Password?',
};

export const HOME = {
  SPACE: 'Available Space',
  GB_OF: 'GB of',
  GB_USED: 'GB Used',
  WELCOME: 'Welcome,',
  NOTES_APP: 'Notes App',
};

export const SETTINGS = {
  ARE_YOU_SURE: 'Are you sure you want to logout?',
  THEME: 'Theme',
  ACCOUNT: 'Account',
  SETTINGS: 'Settings',
};

export const SHOW_NOTES = {
  CREATED_AT: 'createdAt',
  PLACEHOLDER: 'Search',
  EDIT_COLLECTION:'Edit Collection',
  ADD_NOTE: 'Add a note to start your collection!',
  NO_NOTES: 'No matching notes',
  NEW_NOTES: 'Add New Notes',
  DELETE_NOTES: 'Delete Note',
  ARE_YOU_SURE: 'Are you sure you want to delete this note?',
  SAME_COLL_ERR: 'New Collection name same as Current',
  ALREADY_EXISTS:'Collection with same name already exists',
};

export const SIGN_UP = {
  NAME_REGEX: /^[A-Za-z]+$/gi,
  EMAIL_REGEX: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
  PASSWORD_REGEX:
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])(?!.*\s).{8,25}$/,
  CONFIRM_PWD_REGEX: 'password',
  TOO_SHORT: 'Too Short!',
  TOO_LONG: 'Too Long!',
  ENTER_FIRST_NAME: '* Please enter your First Name',
  ENTER_LAST_NAME: '* Please enter your Last Name',
  ONLY_FN_ALPHABETS: 'First Name should only contain alphabets',
  ONLY_LN_ALPHABET: 'Last Name should only contain alphabets',
  INVALID_EMAIL: 'Invalid email',
  ENTER_EMAIL: '* Please enter your Email',
  ENTER_PASSWORD: '* Please enter a Password',
  PWD_TEXT:
    'Password should consist of one or more uppercase, numbers and special characters, but no spaces',
  PWD_DONT_MATCH: 'Your passwords do not match',
  PWD_REQUIRED: '* Password Confirmation required',
  SUMBIT: 'Submit',
};

export const WLKTHROUGH = {
  SAVE_NOTES: 'Save and share notes',
  CREATE_ACCOUNT: 'Create Account',
  HAVE_ACCOUNT: 'Have an account?',
};
