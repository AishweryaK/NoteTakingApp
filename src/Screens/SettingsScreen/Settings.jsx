import React from "react";
import { View, Text } from "react-native";
import { ICONS } from "../../Constants/iconConstants";
// import { ICONS } from "../../Constants/iconConstants";
// import HOME from ""

function Settings () {
    return (
        <View>
            <Text>
                Settings
            </Text>
            {/* {ICONS.HOME(20,20)} */}
            <View>{ICONS.HOME(20,20)}</View>
        </View>
    )
}

export default Settings;