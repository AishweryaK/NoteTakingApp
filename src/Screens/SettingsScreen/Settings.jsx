import React from "react";
import { View, Text } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

function Settings () {
    return (
        <View>
            <Text>
                Settings
            </Text>
            <View>
            <Ionicons name="settings" size={24} color="black" />
            </View>
        </View>
    )
}

export default Settings;