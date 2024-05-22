import React, { useEffect, useState } from "react"
import { View, ImageBackground, Text } from "react-native";
import { homeStyles } from "./homeStyle";
// import SpaceIcon from "../../Assets/Svgs/SpaceIcon";
import { dimensions } from "../../Constants/utility";
import { useSelector } from "react-redux";
import { ICONS } from "../../Constants/iconConstants";
import DeviceInfo from "react-native-device-info";

function AvailSpace () {
    const theme = useSelector(state=>state.user.theme);
    const [totalStorage, setTotalStorage] = useState(null);
    // const [freeStorage, setFreeStorage] = useState(null);
    const [usedStorage, setUsedStorage] = useState(null);

    useEffect(() => {
        const getStorageInfo = async () => {
          try {
            const totalBytes = await DeviceInfo.getTotalDiskCapacity();
            const freeBytes = await DeviceInfo.getFreeDiskStorage();
    
            const totalGB = (totalBytes / 1073741824).toFixed(1);
            const usedGB = ((totalBytes- freeBytes) / 1073741824).toFixed(1);
    
            setTotalStorage(totalGB);
            setUsedStorage(usedGB);
          } catch (error) {
            console.error('Error fetching storage information:', error);
          }
        };
    
        getStorageInfo();
      }, []);

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
            >{usedStorage} GB of {totalStorage} GB Used</Text>
            </View>
            
         </View>
         </ImageBackground>
        </View>
        </View>
    )
}

export default AvailSpace;
