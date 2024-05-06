// import React, { useRef, useState } from "react";
// import { Dimensions, SafeAreaView, Text, TextInput } from "react-native";
// import { RichEditor, RichToolbar, actions } from "react-native-pell-rich-editor";
// import HTMLView from "react-native-htmlview";

// const width = Dimensions.get("window").width - 40;
// const height = Dimensions.get("window").height - 40;
// // console.log(width, "width")


// function AddNote () {
//     const [title, setTitle]= useState("");
//     const [desc, setDesc]= useState("");
//     const richText = useRef();
//     return(
//         <SafeAreaView style={{backgroundColor:"white"}}>
//             {/* <Text>
//                 Add Note
//             </Text> */}

//             <TextInput
//             value={title}
//             style={{fontSize:35, marginHorizontal:20, width , marginTop:20}} 
//             placeholder="Title" 
//             multiline={true}
//             maxLength={60}
//             onChangeText={(text)=>setTitle(text)} />

//             {/* <TextInput 
//             style={{fontSize:20, marginHorizontal:20, width,  marginTop:10 }}
//             placeholder="Note" 
//             multiline={true} /> */}

//             <RichEditor
//             // containerStyle={styles.editor}
//             ref={richText}
//             // style={styles.rich}
//             placeholder="Note"
//             onChange={(text) => setDesc(text)}
//             // editorInitializedCallback={editorInitializedCallback}
//             // onHeightChange={handleHeightChange}
//             // onChange={richTextHandle}
//             androidHardwareAccelerationDisabled={true}
//             initialHeight={10}
//             />


//             <RichToolbar
//             editor={richText}
//             iconTint="pink"
//             selectedIconTint="purple"
//             // disabledIconTint="blue"
//             actions={[
//                 actions.insertImage,
//                 actions.setBold,
//                 actions.setItalic,
//                 actions.setUnderline,
//                 actions.setStrikethrough,
//                 actions.insertBulletsList,
//                 actions.insertOrderedList,
//                 actions.insertLink,
//                 actions.checkboxList,
//               ]}
//             />


//         </SafeAreaView>
//     )
// }

// export default AddNote;


import React, { useRef, useState } from "react";
import { Dimensions, KeyboardAvoidingView, SafeAreaView, ScrollView, Text, TextInput, View,Keyboard, Alert, Linking, TouchableOpacity } from "react-native";
import { RichEditor, RichToolbar, actions } from "react-native-pell-rich-editor"; 
import { APPCOLOR } from "../../Assets/Colors/appColors";
import { homeStyles } from "../HomeScreen/homeStyle";
import { FONT } from "../../Constants/fontConstants";
import { NAVIGATION } from "../../Constants/navConstants";
import firestore from '@react-native-firebase/firestore';

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
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
            style={{ flex: 1, backgroundColor:APPCOLOR.BACKGROUND }}
            keyboardVerticalOffset={97}
            >
                    <TextInput
                    value={title}
                    style={{ fontSize: 35, marginHorizontal: 20, marginTop: 20, color:APPCOLOR.HEADERTITLE}} 
                    placeholder="Title" 
                    multiline={true}
                    maxLength={60}
                    onChangeText={(text)=>setTitle(text)} />

            {/* <ScrollView ref={scrollText}
            style={{ flex:1, borderWidth:5,borderColor:"red"}}> */}

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
                            console.log(result); // Log the result of the await statement
                        } catch (error) {
                            console.error("Error occurred while opening URL:", error);
                        }
                    }}
                    editorStyle={{backgroundColor:APPCOLOR.BACKGROUND, color:APPCOLOR.DARK_BLUE}}
                    style={{ flex:1, paddingHorizontal:16, backgroundColor:APPCOLOR.BACKGROUND
                }}
                containerStyle={{overflow:"scroll"}}
                />

            <View style={homeStyles.buttonShadow}>
            <TouchableOpacity 
          onPress={saveNote}>
            <Text style={{color:APPCOLOR.WHITE,
        fontFamily:FONT.BOLD,
       textAlign:"center", 
       fontSize:20}}>
              Save
            </Text>
          </TouchableOpacity>
            </View>

            {/* </ScrollView> */}

            <View 
            style={{}}
            >
                <RichToolbar
                style={{backgroundColor:APPCOLOR.BLUE}}
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
            </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
)
}

export default AddNote;


    //     <SafeAreaView style={{ backgroundColor:"white"}}>
    //   <ScrollView>
    //     <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}	style={{ flex: 1 }}>
    //       <Text>Description:</Text>
    //       <RichEditor
    //           ref={richText}
    //           placeholder="Note"
    //           onChange={ descriptionText => {
    //               console.log("descriptionText:", descriptionText);
    //           }}
    //       />
    //     </KeyboardAvoidingView>
    //   </ScrollView>

    //   <View style={{position:"absolute", right:0, left:0, bottom:0}}>

    //   <RichToolbar
    //     editor={richText}
    //     iconTint="pink"
    //     actions={[
    //                         // actions.insertImage,
    //                         actions.setBold,
    //                         actions.setItalic,
    //                         actions.setUnderline,
    //                         actions.setStrikethrough,
    //                         actions.insertBulletsList,
    //                         actions.insertOrderedList,
    //                         actions.insertLink,
    //                         actions.checkboxList,
    //                     ]}
    //     // iconMap={{ [actions.heading1]: handleHead }}
    //   />
    //   </View>
    // </SafeAreaView>




    // <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
    //   <ScrollView>
    //     <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
    //       <Text>Description:</Text>
    //       <RichEditor
    //         ref={richText}
    //         placeholder="Note"
    //         onChange={(descriptionText) => {
    //           console.log("descriptionText:", descriptionText);
    //         }}
    //       />
    //     </KeyboardAvoidingView>
    //   </ScrollView>

    //   <View style={{ position: "absolute", right: 0, left: 0, bottom: 0 }}>
    //     <RichToolbar
    //       editor={richText}
    //       iconTint="pink"
    //       actions={[
    //         actions.setBold,
    //         actions.setItalic,
    //         actions.setUnderline,
    //         actions.setStrikethrough,
    //         actions.insertBulletsList,
    //         actions.insertOrderedList,
    //         actions.insertLink,
    //         actions.checkboxList,
    //       ]}
    //     />
    //   </View>
    // </SafeAreaView>
  







// import React, { useRef, useState } from "react";
// import { Dimensions, KeyboardAvoidingView, SafeAreaView, ScrollView, Text, TextInput, View,Keyboard, Platform } from "react-native";
// import { RichEditor, RichToolbar, actions } from "react-native-pell-rich-editor";
// import HTMLView from "react-native-htmlview";

// const width = Dimensions.get("window").width ;
// const height = Dimensions.get("window").height;

// function AddNote () {
//     const [title, setTitle]= useState("");
//     const [desc, setDesc]= useState("");
//     const richText = useRef();
//     const scrollText = useRef();

//     console.log(desc)

//     return (
//         <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
//                     <TextInput
//                     value={title}
//                     style={{ fontSize: 35, marginHorizontal: 20, marginTop: 20, borderWidth:5 }} 
//                     placeholder="Title" 
//                     multiline={true}
//                     maxLength={60}
//                     onChangeText={(text)=>setTitle(text)} />
                    
//                     <ScrollView 
//             // style={{ flex:1, borderWidth:5,borderColor:"red"}}
//             >
//             <KeyboardAvoidingView behavior={Platform.OS = "ios" ? "padding" : "height" }
//             // style={{ flex: 1 }}
//             >
            

//                 <RichEditor
                
//                     ref={richText}
//                     placeholder="Note"
//                     onChange={(text) => setDesc(text)}
//                     androidHardwareAccelerationDisabled={true}
//                     // initialHeight={height}
//                     style={{borderWidth:2, borderColor:"pink"
//                 }}
//                 />

// </KeyboardAvoidingView>
//             </ScrollView>

//             <View 
//             style={{borderWidth:2,borderColor:"green", position:"absolute", bottom:0, right:0, left:0}}
//             >
//                 <RichToolbar
//                     editor={richText}
//                     iconTint="pink"
//                     selectedIconTint="purple"
//                     actions={[
//                         // actions.insertImage,
//                         actions.setBold,
//                         actions.setItalic,
//                         actions.setUnderline,
//                         actions.setStrikethrough,
//                         actions.insertBulletsList,
//                         actions.insertOrderedList,
//                         actions.insertLink,
//                         actions.checkboxList,
//                     ]}
//                 />
//             </View>
            
//         </SafeAreaView>
//     )
// }

// export default AddNote;
