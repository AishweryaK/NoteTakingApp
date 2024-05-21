import { StyleSheet } from "react-native";
import { APPCOLOR } from "../../Assets/Colors/appColors";

export const styles = StyleSheet.create({
    wrapper: (colors) =>({ flex: 1,
    // justifyContent: 'center', 
    alignItems: 'center',
    // backgroundColor: '#2C3333', 
    // backgroundColor:"#DEBDE2",
    backgroundColor:colors.BACKGROUND,
    // paddingHorizontal: 15,
    paddingTop:30
    }),
    formContainer: {
        backgroundColor: '#9F6FCF', 
        padding: 20,
    borderRadius: 30,
    width: '100%',
    // paddingBottom:0,
    },
    title: {
        color: "#3A1B6B",
    fontSize: 26,
    fontWeight: '400', 
    marginBottom: 15,
    },
    inputWrapper: { 
        marginBottom: 20,
    },
    inputStyle: {
        borderColor: '#16213E',
        borderWidth: 1,
        borderRadius: 30,
        padding: 10,
        paddingHorizontal:20,
    },
    errorTxt: {
        fontSize: 12,
        color: '#FF0D10',
        paddingHorizontal:20,
        paddingBottom:10,
        textAlign:"left",
        paddingTop:5
    },
    submitBtn: {
        // backgroundColor: '#395B64',
    padding: 10,
    borderRadius: 30,
    justifyContent: 'center',
    marginBottom:20
    },
    submitBtnTxt: {
    // color: '#fff',
    color:"#BCA0DC",
    textAlign: 'center',
    fontSize: 18,
    // fontWeight:700,
    },
    bottom:{
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 60
    }
} )