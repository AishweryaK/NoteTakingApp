import React, {useMemo} from "react";
import { View, TouchableOpacity, Text, ImageBackground, FlatList } from "react-native";
import FrameIcon from "../Assets/Svgs/FrameIcon";
import { labelStyles } from "../Common/styles";
import CustomLabel from "./CustomLabel";
import { NAVIGATION } from "../Constants/navConstants";

const data = [
    { id: 1, text: "Personal", number: 4 },
    { id: 2, text: "Academic", number: 1 },
    { id: 3, text: "Work", number: 1 },
    { id: 4, text: "Others", number: 1 },
];

// function CustomLabel ({handlePress, text, number}) {

//     return (
//         <TouchableOpacity
//         onPress={handlePress}
//         style={labelStyles.container}
//         >
//         {/* <View style={labelStyles.container}> */}
//         <ImageBackground source={require("../Assets/Images/LabelImg.png")} 
//         style={labelStyles.bg}
//         />
//         <View style={labelStyles.icon}>
//                     <FrameIcon />
//                 </View>
//                 <View style={labelStyles.txtView}>
//                 <Text style={labelStyles.title}>
//                     {text}
//                 </Text>
//                 <Text style={labelStyles.txt}>
//                    {number} Files
//                 </Text>
//                 </View>
//         {/* </View> */}
//         </TouchableOpacity>
//     )
// }

function CustomList({navigation, userUid}) {

    // const renderItem = ({ item }) => (
    //     <View style={{marginBottom:30}}>
    //     <CustomLabel handlePress={() => navigation.navigate(NAVIGATION.NOTESCREEN, {uid:userUid, itemText :item.text})} text={item.text} number={item.number} />
    //     </View>
    // );

    const renderItem = useMemo(() => {
        return ({ item }) => (
            <View style={{marginBottom:30}}>
          <CustomLabel
            handlePress={() =>
              navigation.navigate(NAVIGATION.NOTESCREEN, { uid: userUid, itemText: item.text })
            }
            text={item.text}
            number={item.number}
          />
          </View>
        );
      }, [navigation, userUid]);


    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
        />
    );
}

export default CustomList;
