import React, { useRef, useState, useEffect } from "react";
import { Dimensions, KeyboardAvoidingView, Modal, Text, TextInput, View, FlatList, Linking, TouchableOpacity } from "react-native";
import { RichEditor, RichToolbar, actions } from "react-native-pell-rich-editor"; 
import { APPCOLOR } from "../../Assets/Colors/appColors";
import { homeStyles } from "../HomeScreen/homeStyle";
import { FONT } from "../../Constants/fontConstants";
import { NAVIGATION } from "../../Constants/navConstants";
import firestore from '@react-native-firebase/firestore';
import { styles } from "./styles";


function AddNote ({route, navigation}) {
    const [title, setTitle]= useState("");
    const [desc, setDesc]= useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [collections, setCollections] = useState([]);
    const [newCollection, setNewCollection] = useState("");
    const [selectedCollection, setSelectedCollection] = useState(null);
    const richText = useRef();
    const descRef = useRef("")

    const {uid, itemTitle, itemDesc, itemID} = route.params;

    useEffect(() => {
        if (itemTitle && itemDesc) {
            setTitle(itemTitle);
            setDesc(itemDesc);
        }
    }, [itemTitle, itemDesc]);

    useEffect(() => {
        const userDocRef = firestore().collection('users').doc(uid);
    
        const unsubscribe = userDocRef.onSnapshot((snapshot) => {
            if (snapshot.exists) {
                const userData = snapshot.data();
                if (userData.collections) {
                    setCollections(userData.collections);
                }
            }
        });
    
        return () => unsubscribe();
    }, [uid]); 
    

//     useEffect(() => {
//     console.log(title, "title");
//     console.log(desc,"desc")
//   }, [title, desc]);

    // console.log(uid, "UID")

    // console.log(desc, "THIS IS DESC")
    // console.log(scrollText.current)

    // const handleHead = ({tintColor}) => <Text style={{color: tintColor}}>H1</Text>

    const handleDesc = (text) => {
     setDesc(text);
     descRef.current= desc;
    }

    const saveNote = async () => {
        try {
            if(itemID) 
            {
                await firestore().collection('users')
                .doc(uid).collection('Personal')
                .doc(itemID)
                .update(
                    {
                        title: title,
                        desc: desc,
                    }
                )
                // navigation.navigate(NAVIGATION.NOTESCREEN);
            }
         else
         {   await firestore()
        .collection('users')
        .doc(uid)
        .collection('Personal')
        .add({
          title: title,
          desc: desc,
        }); 

        // navigation.navigate(NAVIGATION.HOMESCREEN);

    }
            setTitle("");
            setDesc("");
            
            console.log("Note saved successfully!");
            if(itemID) {
            navigation.goBack(); }
            else
            navigation.navigate(NAVIGATION.HOMESCREEN)
            
        } catch (error) {
            console.error("Error saving note:", error);
        }
    };

    const addCollection = async () => {
        if (newCollection.trim() === "") return;
        try {
            const updatedCollections = [...collections, { text: newCollection, number: 1 }];
            await firestore().collection('users').doc(uid).set({
                collections: updatedCollections
            }, { merge: true });
            setModalVisible(false);
            setNewCollection("");
        } catch (error) {
            console.error("Error adding collection:", error);
        }
    };

    const renderCollectionItem = ({ item }) => (
        <TouchableOpacity style={styles.collectionItem} onPress={() => handleCollectionSelection(item)}>
            <Text style={styles.collectionText}>{item.text}</Text>
        </TouchableOpacity>
    );
    const handleCollectionSelection = (collection) => {
        setSelectedCollection(collection);
        setModalVisible(false); 
    };
    



    return (
        // <SafeAreaView style={{ flex: 1, backgroundColor: "red" }}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
            style={styles.container}
            keyboardVerticalOffset={97}
            >
                <View style={styles.header}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.headerText}>Collections</Text>
        </TouchableOpacity>
    </View>
    <Modal
        animationType="slide"
        // transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            setModalVisible(!modalVisible);
        }}
    >
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Collections</Text>
                <FlatList
                    data={collections}
                    renderItem={renderCollectionItem}
                    keyExtractor={(item, index) => index.toString()}
                />
                <TextInput
                    style={styles.newCollectionInput}
                    placeholder="Add New Collection"
                    value={newCollection}
                    onChangeText={setNewCollection}
                />
                <TouchableOpacity style={styles.addButton} onPress={addCollection}>
                    <Text style={{}}>Add</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
                {/* <View style={{backgroundColor:"blue", marginTop:10, flexDirection:"row",
                    justifyContent:"space-between"
                }}>
                    <View></View>
                    <Text>
                        Hello
                    </Text>

                </View> */}
                    <TextInput
                    value={title}
                    style={styles.title} 
                    placeholder="Title" 
                    multiline={true}
                    maxLength={60}
                    onChangeText={(text)=>setTitle(text)}
                    placeholderTextColor={APPCOLOR.HEADERTITLE}
                    />


                <RichEditor
                    ref={richText}
                    placeholder="Note"
                    initialContentHTML={desc}
                    onChange={handleDesc}
                    androidHardwareAccelerationDisabled={true}
                    initialHeight={80}
                    scrollEnabled
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








// import React, { useRef, useState, useEffect } from "react";
// import { Dimensions, KeyboardAvoidingView, SafeAreaView, ScrollView, Text, TextInput, View,Keyboard, Alert, Linking, TouchableOpacity } from "react-native";
// import { RichEditor, RichToolbar, actions } from "react-native-pell-rich-editor"; 
// import { APPCOLOR } from "../../Assets/Colors/appColors";
// import { homeStyles } from "../HomeScreen/homeStyle";
// import { FONT } from "../../Constants/fontConstants";
// import { NAVIGATION } from "../../Constants/navConstants";
// import firestore from '@react-native-firebase/firestore';
// import { styles } from "./styles";


// function AddNote ({route, navigation}) {
//     const [title, setTitle]= useState("");
//     const [desc, setDesc]= useState("");
//     const richText = useRef();
//     const descRef = useRef("")

//     const {uid, itemTitle, itemDesc, itemID} = route.params;

//     useEffect(() => {
//         if (itemTitle && itemDesc) {
//             setTitle(itemTitle);
//             setDesc(itemDesc);
//         }
//     }, [itemTitle, itemDesc]);

//     useEffect(() => {
//     console.log(title, "title");
//     console.log(desc,"desc")
//   }, [title, desc]);

//     // console.log(uid, "UID")

//     // console.log(desc, "THIS IS DESC")
//     // console.log(scrollText.current)

//     // const handleHead = ({tintColor}) => <Text style={{color: tintColor}}>H1</Text>

//     const handleDesc = (text) => {
//      setDesc(text);
//      descRef.current= desc;
//     }

//     const saveNote = async () => {
//         try {
//             if(itemID) 
//             {
//                 await firestore().collection('users')
//                 .doc(uid).collection('Personal')
//                 .doc(itemID)
//                 .update(
//                     {
//                         title: title,
//                         desc: desc,
//                     }
//                 )
//                 // navigation.navigate(NAVIGATION.NOTESCREEN);
//             }
//          else
//          {   await firestore()
//         .collection('users')
//         .doc(uid)
//         .collection('Personal')
//         .add({
//           title: title,
//           desc: desc,
//         }); 

//         // navigation.navigate(NAVIGATION.HOMESCREEN);

//     }
//             setTitle("");
//             setDesc("");
            
//             console.log("Note saved successfully!");
//             if(itemID) {
//             navigation.goBack(); }
//             else
//             navigation.navigate(NAVIGATION.HOMESCREEN)
            
//         } catch (error) {
//             console.error("Error saving note:", error);
//         }
//     };

//     return (
//         // <SafeAreaView style={{ flex: 1, backgroundColor: "red" }}>
//             <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
//             style={styles.container}
//             keyboardVerticalOffset={97}
//             >
//                 <View style={{backgroundColor:"blue", marginTop:10, flexDirection:"row",
//                     justifyContent:"space-between"
//                 }}>
//                     <View></View>
//                     <Text>
//                         Hello
//                     </Text>

//                 </View>
//                     <TextInput
//                     value={title}
//                     style={styles.title} 
//                     placeholder="Title" 
//                     multiline={true}
//                     maxLength={60}
//                     onChangeText={(text)=>setTitle(text)}
//                     placeholderTextColor={APPCOLOR.HEADERTITLE}
//                     />


//                 <RichEditor
//                     ref={richText}
//                     placeholder="Note"
//                     initialContentHTML={desc}
//                     onChange={handleDesc}
//                     androidHardwareAccelerationDisabled={true}
//                     initialHeight={80}
//                     scrollEnabled
//                     onLink={async (url) => {
//                         try {
//                             const result = await Linking.openURL(url);
//                             console.log(result);
//                         } catch (error) {
//                             console.error("Error occurred while opening URL:", error);
//                         }
//                     }}
//                     editorStyle={styles.editor}
//                     style={styles.desc}
//                 containerStyle={{overflow:"scroll"}}
//                 />

//             <View style={homeStyles.buttonShadow}>
//             <TouchableOpacity 
//           onPress={saveNote}>
//             <Text style={styles.buttonTxt}>
//               Save
//             </Text>
//           </TouchableOpacity>
//             </View>


//             {/* <View 
//             style={{}}
//             > */}
//                 <RichToolbar
//                 style={styles.toolbar}
//                     editor={richText}
//                     iconTint={APPCOLOR.GRAY}
//                     selectedIconTint={APPCOLOR.DARK_BLUE}
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
//             {/* </View> */}
//             </KeyboardAvoidingView>
//         // </SafeAreaView>
// )
// }

// export default AddNote;



   