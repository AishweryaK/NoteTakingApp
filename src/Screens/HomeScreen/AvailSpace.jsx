import React from "react"
import { View, ImageBackground, Text } from "react-native";
import { homeStyles } from "./homeStyle";
// import SpaceIcon from "../../Assets/Svgs/SpaceIcon";
import { dimensions } from "../../Constants/utility";
import { useSelector } from "react-redux";
import { ICONS } from "../../Constants/iconConstants";
import { getThemeColors, themeColors } from "../../Assets/Colors/themeColors";

function AvailSpace () {
    const theme = useSelector(state=>state.user.theme);
    // const colors= getThemeColors(theme);
    return (
        <View style={{alignItems:"center"}}>
        <View style={homeStyles.imgView}
        >
            <ImageBackground source={theme==="LIGHT" ? require("../../Assets/Images/AvailableSpace.png")
                : require("../../Assets/Images/Home_dark.png")
            } 
        resizeMode="stretch"
         style={homeStyles.img} 
         > 
         <View
          style={homeStyles.textStyle}>
            
            {/* <Text style={{justifyContent:"center"}}> hi </Text>
            <Text> bye</Text> */}
            {/* {ICONS.PIECHART(60,60)} */}
            <View style={homeStyles.availsp}>
            <Text style={homeStyles.availText}
            >Available Space</Text>
            <Text style={homeStyles.availTextTwo}
            >20.2 GB of 25 GB Used</Text>
            </View>
            
         </View>
         </ImageBackground>
        </View>
        </View>
    )
}

export default AvailSpace;
