import React from "react"
import { View, ImageBackground, Text } from "react-native";
import { homeStyles } from "./homeStyle";
// import SpaceIcon from "../../Assets/Svgs/SpaceIcon";
import { dimensions } from "../../Constants/utility";

function AvailSpace () {
    return (
        <View style={homeStyles.imgView}
        >
            <ImageBackground source={require("../../Assets/Images/AvailableSpace.png")} 
        resizeMode="stretch"
         style={homeStyles.img} 
         > 
         <View
          style={{ flex: 1, display: 'flex', flexDirection:"row", justifyContent:"space-evenly", 
          paddingTop:20,  width: dimensions.width*0.5
         }}>
            
            {/* <Text style={{justifyContent:"center"}}> hi </Text>
            <Text> bye</Text> */}
         </View>
         </ImageBackground>
        </View>
    )
}

export default AvailSpace;
