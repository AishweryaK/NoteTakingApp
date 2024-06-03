import { StyleSheet } from "react-native";
import { APPCOL } from "../../Assets/Colors/appColors";
import { FONT } from "../../Constants/fontConstants";
import { dimensions } from "../../Constants/utility";

export const showStyles= StyleSheet.create(
    {
        wrapper: (colors)=>({ 
            flex: 1, 
            backgroundColor: colors.BACKGROUND,
        }),
        container:(colors)=>( {flex: 1,
            backgroundColor:colors.BACKGROUND,
            marginBottom:10,
            marginHorizontal:8,
            borderRadius:20,
            padding:20,
            fontFamily:FONT.REGULAR,
    
            shadowColor: colors.SHADOW,
            shadowOffset: {width: -2, height: 4},
            shadowOpacity: 0.15,
            shadowRadius: 10,
            elevation:7,
            maxHeight:100
            //width: (dimensions.width - 18) / 2,
  //     maxHeight:100,
  //     backgroundColor: 'gray',
  //     margin: 4,
  //     borderRadius: 18,
  //     overflow:"hidden",
        }),
        bottomButton:{borderRadius:1000, 
          width:dimensions.width*0.5,
          justifyContent:"flex-end",
        },
        txt:(colors)=>({
            fontFamily:FONT.EXTRA_BOLD,
            fontSize:16,
            lineHeight:22,
            color:colors.HEADERTITLE,
            // backgroundColor:"blue"
          }),
          list: {
            paddingHorizontal:4,
            paddingTop:10,
          
            // backgroundColor:"red"
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
  }),
  noNotes: (colors)=>(
  {
    flex:1, 
  color:colors.HEADERTITLE, 
  textAlign:"center", 
  justifyContent:"center", 
  textAlignVertical:"center", 
  fontFamily:FONT.BOLD,
  fontSize:16,
  opacity:0.5, 
  paddingHorizontal:16
}),
    }
)