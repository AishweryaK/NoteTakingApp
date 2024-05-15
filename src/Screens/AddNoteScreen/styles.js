import { StyleSheet } from "react-native";
import { APPCOLOR } from "../../Assets/Colors/appColors";
import { FONT } from "../../Constants/fontConstants";
import { dimensions } from "../../Constants/utility";

export const styles = StyleSheet.create(
    {
        container: { flex: 1, 
            backgroundColor:APPCOLOR.BACKGROUND 
        },
        view: { marginTop:10, 
        flexDirection:"row",
        justifyContent:"space-between", 
        marginHorizontal:20 
    },
    collButton : {borderWidth:2, 
        borderRadius:8, 
        padding:3, 
        borderColor:APPCOLOR.BORDER,
    },
    collText:{color:APPCOLOR.HEADERTITLE, 
        fontSize:14, 
        fontFamily:FONT.BOLD

    },
    heading:{
        fontFamily:FONT.EXTRA_BOLD, 
        fontSize:18, 
        color:APPCOLOR.HEADERTITLE,
    },
        title : { fontSize: 35,
             marginHorizontal: 20, 
            // marginTop: 5, 
            color:APPCOLOR.HEADERTITLE,
            opacity:0.67,
        },
        editor: {backgroundColor:APPCOLOR.BACKGROUND, 
            color:APPCOLOR.DARK_BLUE,
        },
        desc: { flex:1, 
            paddingHorizontal:16, 
            backgroundColor:APPCOLOR.BACKGROUND,
            color: APPCOLOR.HEADERTITLE,
        },
        buttonTxt: {color:APPCOLOR.WHITE,
            fontFamily:FONT.BOLD,
           textAlign:"center", 
           fontSize:20},
           toolbar: {backgroundColor:APPCOLOR.BLUE
           },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)', 
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40, 
  },
  collectionItem: {
    paddingVertical: 10,
  },
  collectionText: {
    fontFamily: FONT.REGULAR,
    fontSize: 16,
  },
  newCollectionInput: {
    borderWidth: 1,
    borderColor: APPCOLOR.BORDER,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: APPCOLOR.BLUE,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: FONT.REGULAR,
    fontSize: 16,
    color: 'white',
  },
  addTxt:{
    fontFamily:FONT.BOLD,
    fontSize:15,
    color:APPCOLOR.WHITE,
  }, 
  closeButtonView :{flexDirection:"row", 
  width:dimensions.width*0.45, 
  alignItems:"center", 
  justifyContent:"center"
},
inner : { flex: 1, 
  alignItems: "center" 
},
xButton:{borderColor:APPCOLOR.BORDER, 
  borderWidth:2, 
  borderRadius:100, 
  height:25, width:25, 
  alignItems:"center", 
  justifyContent:"center" 
},
});


    