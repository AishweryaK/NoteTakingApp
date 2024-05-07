import React, { useRef, useState } from "react";
import { Dimensions, KeyboardAvoidingView, SafeAreaView, ScrollView, Text, TextInput, View,Keyboard, Alert, Linking, TouchableOpacity } from "react-native";
import { RichEditor, RichToolbar, actions } from "react-native-pell-rich-editor"; 
import { APPCOLOR } from "../../Assets/Colors/appColors";
import { homeStyles } from "../HomeScreen/homeStyle";
import { FONT } from "../../Constants/fontConstants";
import { NAVIGATION } from "../../Constants/navConstants";
import firestore from '@react-native-firebase/firestore';
import { styles } from "./styles";

// const width = Dimensions.get("window").width ;
// const height = Dimensions.get("window").height;

function AddNote ({route, navigation}) {
    const [title, setTitle]= useState("");
    const [desc, setDesc]= useState("");
    const richText = useRef();
    // const scrollText = useRef();
    const {uid} = route.params;
    console.log(uid)

    console.log(desc, "THIS IS DESC")
    // console.log(scrollText.current)

    // const handleHead = ({tintColor}) => <Text style={{color: tintColor}}>H1</Text>

    const saveNote = async () => {
        try {
            await firestore()
        .collection('users')
        .doc(uid)
        .collection('notes')
        .add({
          title: title,
          desc: desc,
        });
            setTitle("");
            setDesc("");
            console.log("Note saved successfully!");
            navigation.navigate(NAVIGATION.HOMESCREEN);
        } catch (error) {
            console.error("Error saving note:", error);
        }
    };

    return (
        // <SafeAreaView style={{ flex: 1, backgroundColor: "red" }}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
            style={styles.container}
            keyboardVerticalOffset={97}
            >
                    <TextInput
                    value={title}
                    style={styles.title} 
                    placeholder="Title" 
                    multiline={true}
                    maxLength={60}
                    onChangeText={(text)=>setTitle(text)} />


                <RichEditor
                    ref={richText}
                    placeholder="Note"
                    onChange={(text) => setDesc(text)}
                    androidHardwareAccelerationDisabled={true}
                    initialHeight={80}
                    scrollEnabled
                    // onLink={
                    //      async (url)=> await Linking.openURL(url) 
                    // }
                    onLink={async (url) => {
                        try {
                            const result = await Linking.openURL(url);
                            console.log(result);
                        } catch (error) {
                            console.error("Error occurred while opening URL:", error);
                        }
                    }}
                    editorStyle={styles.editor}
                    style={styles.desc}
                containerStyle={{overflow:"scroll"}}
                />

            <View style={homeStyles.buttonShadow}>
            <TouchableOpacity 
          onPress={saveNote}>
            <Text style={styles.buttonTxt}>
              Save
            </Text>
          </TouchableOpacity>
            </View>


            {/* <View 
            style={{}}
            > */}
                <RichToolbar
                style={styles.toolbar}
                    editor={richText}
                    iconTint={APPCOLOR.GRAY}
                    selectedIconTint={APPCOLOR.DARK_BLUE}
                    actions={[
                        // actions.insertImage,
                        actions.setBold,
                        actions.setItalic,
                        actions.setUnderline,
                        actions.setStrikethrough,
                        actions.insertBulletsList,
                        actions.insertOrderedList,
                        actions.insertLink,
                        actions.checkboxList,
                    ]}
                />
            {/* </View> */}
            </KeyboardAvoidingView>
        // </SafeAreaView>
)
}

export default AddNote;


   