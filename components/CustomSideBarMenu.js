import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from "react-native";
import { DrawerItems } from "react-navigation-drawer";
import { Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import firebase from "firebase";
import db from "../config";
import axios from "axios";

export default class CustomSideBarMenu extends Component{
    state={
        userId: firebase.auth().currentUser.email,
        image: "#",
        name: "",
        docId:"",
    };

    selectPicture = async()=> {
        const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1,

        });

        if (!cancelled) {
            this.uplaodingImage(uri, this.state.userId);
        }
    };

    uplaodImage = async (uri, imageName) =>{
        var response = await fetch(uri);
        var blob = await response.blob();

        var ref = firebase
        .storage()
        .ref()
        .child("user_profiles/" + imageName);

        return ref.put(blob).then((response) => {
            this.fetchImage(imageName);
          });
        };
      
        fetchImage = (imageName) => {
          var storageRef = firebase
            .storage()
            .ref()
            .child("user_profiles/" + imageName);

        //get the downloaded uri
        storageRef
        .getDownloadURL()
        .then((url)=>{
            this.setState({image: url});
        })
        .catch((error)=>{
            this.setState({ image: "#" });
        });
    }


    getUserProfile(){
        db.collection("users")
        .where("email_id", "==", this.state.userId)
        .onSnapshot((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                this.setState({
                    name: doc.data().first_name+" "+doc.data().last_name,
                    docid: doc.id,
                    image: doc.data().image
                });
            });
        });
    }

    componentDidMount(){
        this.fetchImage(this.state.userid);
        this.getUserProfile();
    }
    render (){
        return(
            <View style={{flex:1}}>
                <View 
                style={{flex:0.5,
                alignitems:'center', 
                backgroundColor:'orange'}}
                >
                    <Avatar 
                    rounded
                    source={{
                        uri:this.state.image,
                    }}
                    size=" medium"
                    onPress = {()=>this.selectPicture()}
                    containerStyle={ style.imageContainer}
                    showEditButton
                    />
                    <Text style={{fontWeight: "100", fontSize: 20, paddingTop: 10}}>
                        {this.state.name}
                   </Text> 
            </View>
                <View style={StyleSheet.drawerItemsContainer}>
                    <DrawerItems {...this.props}/>
                </View>
                <View style={StyleSheet.logOutContainer}>
                    <TouchableOpacity style={StyleSheet.logOutButton}
                    onPress = {()=>{
                        this.props.navigation.navigate('WelcomeScreen')
                        firebase.auth().signOut()
                    }}>
                        <Text>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
                      )
                }
    }

    var styles = StyleSheet.create({
        container : {
            flex:1
        },
        logOutContainer : {
            flex:0.2,
            justifyContent : 'flex-end',
            paddingBottom:30
        },
        logOutButton : {
            fontsize: 30,
            fontWeight: 'bold'
        },
        imageContainer:{
            flex: 0.75,
            width: "40%", 
            height: "20%",
            marginLeft: 20,
            marginTop: 30,
            borderradius: 40,
        },
        logOutText: { 
            fontSize: 30,
            fontWeight: "bold",
        },
    })