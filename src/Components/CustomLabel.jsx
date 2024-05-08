import React from "react";
import { View, TouchableOpacity, Text, ImageBackground } from "react-native";
import LabelIcon from "../Assets/Svgs/LabelIcon";
import CircleIcon from "../Assets/Svgs/CircleIcon";
import WorkIcon from "../Assets/Svgs/WorkIcon";
import PersonalIcon from "../Assets/Svgs/PersonalIcon";
import { dimensions } from "../Constants/utility";
import FrameIcon from "../Assets/Svgs/FrameIcon";
import { labelStyles } from "../Common/styles";


function CustomLabel ({handlePress, text, number}) {

    return (
        <TouchableOpacity
        onPress={handlePress}
        style={labelStyles.container}
        >
        {/* <View style={labelStyles.container}> */}
        <ImageBackground source={require("../Assets/Images/LabelImg.png")} 
        style={labelStyles.bg}
        />
        <View style={labelStyles.icon}>
                    <FrameIcon />
                </View>
                <View style={labelStyles.txtView}>
                <Text style={labelStyles.title}>
                    {text}
                </Text>
                <Text style={labelStyles.txt}>
                   {number} Files
                </Text>
                </View>
        {/* </View> */}
        </TouchableOpacity>
    )
}

export default CustomLabel;

{/* <TouchableOpacity>
{/* <View style={{ position: "relative"
// , height: dimensions.width*0.50, width:dimensions.width*0.50 
}}> */}
    {/* <View style={{ position: "absolute", top: 62.5, left: 52.5, zIndex: 2 }}>
        <PersonalIcon />
    </View> */}
   
    {/* <View style={{ position: "absolute", top: 50, left: 40, zIndex: 1 }}>
        <FrameIcon />
    </View>
    
    <View style={{ position: "absolute", top: 0, left: 0 }}>
        <LabelIcon
        />
    </View>
    <View style={{flex:1, flexDirection:"column"}} >
        <Text>
            hi
        </Text>
        <Text>

        </Text>
    </View> */}
{/* </View>  */}




// </TouchableOpacity> */}


