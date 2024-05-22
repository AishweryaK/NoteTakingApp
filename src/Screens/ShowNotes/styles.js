import { StyleSheet } from "react-native";
import { APPCOL } from "../../Assets/Colors/appColors";
import { FONT } from "../../Constants/fontConstants";
import { dimensions } from "../../Constants/utility";

export const styles= StyleSheet.create(
    {
        wrapper: (colors)=>({ 
            flex: 1, 
            backgroundColor: colors.BACKGROUND,
        }),
        container:(colors)=>( {flex: 1,
            // alignItems: 'center',
            backgroundColor:colors.BACKGROUND,
            // paddingTop:30, 
            // borderWidth:2,
            marginBottom:10,
            marginHorizontal:8,
            borderRadius:20,
            // paddingVertical:20,
            padding:20,
            fontFamily:FONT.REGULAR,
    
            shadowColor: colors.SHADOW,
            shadowOffset: {width: -2, height: 4},
            shadowOpacity: 0.15,
            shadowRadius: 10,
            elevation:7,
        }),
        bottomButton:{borderRadius:1000, 
          width:dimensions.width*0.5,
          justifyContent:"flex-end",
        },
        txt:(colors)=>({
            fontFamily:FONT.EXTRA_BOLD,
            fontSize:16,
            lineHeight:22,
            color:colors.HEADERTITLE
          }),
          list: {
            paddingHorizontal:8,
            paddingTop:10
        },
        content:(colors)=>({
            fontFamily:FONT.BOLD,
            fontSize:14,
            lineHeight:18.2,
            opacity: 0.67,
            color:colors.HEADERTITLE
        }),
        input :{ 
        alignItems:"center", 
        paddingBottom:15
    },
    button: {
    flex:1, 
    flexDirection:"row", 
    justifyContent:"space-evenly",  
    width:dimensions.width*0.45, 
    paddingHorizontal:10
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: colors=>({
    width: 300,
    padding: 20,
    backgroundColor: colors.BACKGROUND,
    borderRadius: 10,
    alignItems: 'center',
  }),
  modalTitle: colors=>({
    fontSize: 20,
    fontFamily:FONT.BOLD,
    color: colors.TITLECOLOR,
    marginBottom: 10,
  }),
  modalMessage:(colors)=> ({
    fontSize: 16,
    marginBottom: 20,
    fontFamily:FONT.REGULAR,
    color:colors.TITLECOLOR
  }),
  modalButtons: {
    flexDirection: 'row',
    justifyContent: "space-around",
    width: '100%',
  },
  modalText:(colors)=>({
    fontFamily:FONT.BOLD,
    color:colors.HEADERTITLE,
    width:100,
    textAlign:"center",
    paddingVertical:10,
    // borderRadius:5,
    // borderColor:colors.BORDER,
    // borderWidth:1,

  }),

    }
)