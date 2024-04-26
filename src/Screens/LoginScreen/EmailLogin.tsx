import React, { useEffect, useState } from "react";
import { Alert, Image, SafeAreaView, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { GoogleSignin, GoogleSigninButton, statusCodes } from "@react-native-google-signin/google-signin";
import { NAVIGATION } from "../../Constants/navConstants";
import auth from "@react-native-firebase/auth"

