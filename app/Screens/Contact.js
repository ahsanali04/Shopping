import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts, updateContacts, updateCart, selectCart } from '../redux/slices/dataSlice';
import tailwind from 'tailwind-react-native-classnames';
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";





const Contact = ({ navigation }) => {
  const contacts = useSelector(selectContacts)
  const cart = useSelector(selectCart)
  const dispatch = useDispatch()

  const Add = (item) => {
    console.log(item)
    const id = item.id
    const object = cart.find(obj => obj.id === id);
    if (!!object) {
      /* alert('Already in the cart') */
      navigation.navigate('Cart')
    } else {
      dispatch(updateCart([...cart, item]))
      navigation.navigate('Cart')
    }

  }

  return (
    <View style={[tailwind`flex-1 relative`, { backgroundColor: '#e6e6e6' }]}>
      <View style={[tailwind`relative bg-white`, { paddingBottom: responsiveHeight(2), borderBottomLeftRadius: responsiveWidth(4), borderBottomRightRadius: responsiveWidth(4) }]}>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row', }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={tailwind`absolute top-4 left-4 z-10`}>
            <Ionicons name="ios-arrow-back-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Add(contacts)} style={tailwind`absolute top-4 right-4 z-10`}>
            <AntDesign name='shoppingcart' color={'#000'} size={24} />
          </TouchableOpacity>
        </View>
        <View style={tailwind`mt-12`}>

          <Image
            source={{ uri: contacts.image }}
            style={[{ height: responsiveHeight(50), width: responsiveWidth(76), marginHorizontal: responsiveWidth(12) }]}
            resizeMode="contain"
          />

          <View style={tailwind`absolute bottom-4 left-0 px-4`}>
            <Text style={tailwind`text-white font-bold text-2xl`}></Text>
            <Text style={tailwind`text-white text-xs`}></Text>
          </View>
        </View>
      </View>
      <View style={{ marginHorizontal: responsiveWidth(4), marginTop: responsiveHeight(2) }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', justifyContent: 'space-between' }}>
          <Text style={{ color: 'black' }}>{contacts.category}</Text>
          <View style={{ justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
            <FontAwesome name='star' color={'#ffd700'} size={28} />
            <Text style={{ color: 'black' }}> {contacts?.rating?.rate}</Text>
          </View>
        </View>
      </View>



      <View style={{ marginHorizontal: responsiveWidth(4), marginTop: responsiveHeight(2) }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', justifyContent: 'space-between' }}>
          <View style={{ width: responsiveWidth(70) }}>
            <Text style={{ color: 'black', fontSize: responsiveFontSize(2), fontWeight: 'bold' }}>{contacts.title}</Text>
          </View>
          <View style={{ justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>

            <Text style={{ color: 'black' }}>$ {contacts.price}</Text>
          </View>
        </View>

      </View>

      <Text style={{ marginHorizontal: responsiveWidth(4), marginTop: responsiveHeight(2), fontSize: responsiveFontSize(3), color: 'black', fontWeight: 'bold' }}>Description</Text>
      <ScrollView style={{ marginBottom: responsiveHeight(2) }}>
        <View>
          <Text style={{ color: 'black', marginTop: responsiveHeight(1), marginHorizontal: responsiveWidth(4), marginVertical: responsiveHeight(2), paddingBottom: responsiveHeight(2) }}>{contacts.description}</Text>
        </View>
      </ScrollView>

    </View>
  )
}

export default Contact

const styles = StyleSheet.create({})  