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
