import { StyleSheet, Text, View, TouchableOpacity, Platform, Alert,PermissionsAndroid,Image,TextInput} from 'react-native'
import React,{useState} from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import ImagePicker from 'react-native-image-crop-picker';
import {androidCameraPermission} from '../components/permissions'
import Entypo from 'react-native-vector-icons/Entypo'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts, updateContacts, updateUsers, selectCart, selectUsers, updateCart, updateQuantity, selectQuantity } from '../redux/slices/dataSlice';
import DocumentPicker from 'react-native-document-picker'
import RNFetchBlob from 'rn-fetch-blob'
import { loginUser } from '../redux/slices/authSlice';

const Settings = () => {
  const dispatch = useDispatch()
  const users = useSelector(selectUsers)
  const [url,setUrl]= useState("")
  
  

  const REMOTE_IMAGE_PATH = url
  /*  "https://images.unsplash.com/photo-1539593395743-7da5ee10ff07?ixlib=rb-4.0.3.png" */ 
  const checkPermission = async () => {
 if(!url){
  alert('Enter URL')
  return
}
    if (Platform.OS === 'ios') {
      downloadImage();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'App needs access to your storage to download Photos',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Storage Permission Granted.');
          downloadImage();
        } else {
          alert('Storage Permission Not Granted');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const downloadImage = () => {
 
    var filename = REMOTE_IMAGE_PATH.replace(/^.*[\\\/]/, '')
    console.log(filename)
    let date = new Date();
    let image_URL = REMOTE_IMAGE_PATH;    
    let ext = getExtention(image_URL);
    ext = '.' + ext[0];
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
       
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/file_' + 
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: `${ext}`,
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then(res => {
        console.log(JSON.stringify(res));
        setUrl("")
        alert('Image Downloaded Successfully.');
      });
  };

  const getExtention = filename => {
    /*  To get the file extension */
    return /[.]/.exec(filename) ?
             /[^.]+$/.exec(filename) : undefined;
  };


  const selectImage=async()=>{
    const permissionStatus =await androidCameraPermission()
    if(permissionStatus || Platform.OS == 'ios'){
      Alert.alert(
        'Take or select an image',
        'Choose an option',
        [
          {text: 'Camera', onPress: onCamera},
          {text: 'Gallery', onPress: onGallery},
          {text: 'Cancel', onPress: ()=>{} },
        ]
      )

    }
  }

  const onCamera=()=>{
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      ImageUpload(image.path)
    });
  }
  
  const onGallery=()=>{
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
      ImageUpload(image.path)
    });
  }

  const ImageUpload=async(path)=>{
    const  record = {
      title: 'test product',
      price: 13.5,
      description: 'Test product...',
      image:path,
      category: 'electronic',
    }
   console.log(record)
   const response = await axios.post("https://fakestoreapi.com/products/",record)
   response.data.quantity = 1;
   dispatch(updateUsers([...users, response.data]))
   console.log(response.data)
  }

  const upload=async()=>{
    try{
   const doc = await DocumentPicker.pick({
    type:[DocumentPicker.types.allFiles]
   });
   console.log(doc)
  }catch(error){
    alert(error)
  }
  }

  return (
    <View style={{justifyContent:'center', marginTop:responsiveHeight(5)}}>
      <View style={{alignItems:'center'}}>
      <TouchableOpacity onPress={() => selectImage()} style={{height:responsiveHeight(12), width:responsiveHeight(12),backgroundColor:'#e6e6e6',borderRadius:responsiveHeight(2), marginTop:responsiveHeight(1),justifyContent:'center', alignItems:'center'}}>
        <Entypo  name='camera' size={34} />
      </TouchableOpacity>
      <Text style={{color:'blue', marginTop:responsiveHeight(1)}}>Image</Text>
      </View>
      <TouchableOpacity onPress={()=> upload()} style={{height:responsiveHeight(8),backgroundColor:'#5B79E0',marginHorizontal:responsiveWidth(2),borderRadius:responsiveWidth(2),marginTop:responsiveHeight(2),justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
      <Entypo name='upload' size={24} color='#fff'/>
        <Text style={{color:'#fff',fontSize:responsiveFontSize(2), fontWeight:'bold'}}>  Upload File</Text>
      </TouchableOpacity>
      <TextInput
      placeholder='Enter URL'
      placeholderTextColor={'#009387'}
      color="#009387"
      style={{backgroundColor:'#e6e6e6',paddingHorizontal:responsiveWidth(2), marginHorizontal:responsiveWidth(2), marginTop:responsiveHeight(2),height:responsiveHeight(8),borderRadius:responsiveWidth(2)}} 
      onChangeText={setUrl}
      value={url}
      />
      <TouchableOpacity onPress={()=> checkPermission()} style={{height:responsiveHeight(8),backgroundColor:'#5B79E0',marginHorizontal:responsiveWidth(2),borderRadius:responsiveWidth(2),marginTop:responsiveHeight(2),justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
      <Entypo name='download' size={24} color='#fff'/>
        <Text style={{color:'#fff',fontSize:responsiveFontSize(2), fontWeight:'bold'}}>  Download File</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({})