import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
    buttonShadow: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 4,
        position:"absolute", right:40, bottom:40, height:60, width:60, 
              borderRadius:30, backgroundColor:"#3A1B6B", justifyContent:"center",
              elevation:15,
      },
      buttonText: {
        color:"white",
       textAlign:"center", 
       fontSize:25}
});