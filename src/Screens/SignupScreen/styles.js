import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    wrapper: (colors) =>({ flex: 1,
    alignItems: 'center',
    backgroundColor:colors.BACKGROUND,
    paddingTop:30
    }),
    errorTxt: {
        fontSize: 12,
        color: '#FF0D10',
        paddingHorizontal:20,
        paddingBottom:10,
        textAlign:"left",
        paddingTop:5
    },
    bottom:{
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 60
    }
} )