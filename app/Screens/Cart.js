import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import tailwind from 'tailwind-react-native-classnames';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart, selectContacts, updateCart } from '../redux/slices/dataSlice';
import { selectUser } from '../redux/slices/authSlice';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Loader from '../components/loader';
import axios from 'axios';



const Cart = ({ navigation }) => {
  const cart = useSelector(selectCart)
  const dispatch = useDispatch()
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false)



  const deleteItem = (item) => {
    setLoading(true)
    console.log(item.id)
    dispatch(updateCart(cart.filter((user => user.id !== item.id))
    ))
    setLoading(false)
  }




  const minus = (item) => {
    if (item.quantity <= 1) {
      return
    } else {
      const updatedCart = cart.map((user) => {
        if (user.id === item.id) {
          user.quantity = user.quantity - 1
        }

        return user;
      });
      dispatch(updateCart(updatedCart));

    }

  }

  const plus = (item) => {
    const updatedCart = cart.map((user) => {
      if (user.id === item.id) {
        user.quantity = user.quantity + 1
      }

      return user;
    });
    dispatch(updateCart(updatedCart));


  }

  const total = () => {
    var bill = 0
    cart.map(item => {
      bill = bill + item.price * (item.quantity)
    })
    alert(`Total bill =  $ ${bill.toFixed(2)}`)
  }



  return (
    <View style={{ backgroundColor: '#e6e6e6', flex: 1 }}>
      <Loader visible={loading} />
      <View style={{ justifyContent: 'space-between', flexDirection: "row", alignItems: 'center', backgroundColor: 'white', paddingHorizontal: responsiveWidth(4), paddingBottom: responsiveHeight(3) }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={[tailwind` z-10`, { marginTop: responsiveHeight(3) }]}>
          <Ionicons name="ios-arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: responsiveHeight(3) }}>
          <Text style={{ color: '#000', alignItems: 'center', justifyContent: 'center', fontSize: responsiveFontSize(2.4), fontWeight: 'bold' }}>Cart</Text>
          <AntDesign name='shoppingcart' color={'#000'} size={28} />
          {cart.length > 0 ? (
            <View
              style={{
                position: 'absolute', backgroundColor: '#5B79E0', width: responsiveWidth(4), height: responsiveWidth(4), borderRadius: responsiveWidth(2), right: responsiveWidth(0.01), bottom: responsiveHeight(2.1), alignItems: 'center', justifyContent: 'center',
              }}>
              <Text
                style={{ alignItems: 'center', justifyContent: 'center', color: "#FFFFFF", fontSize: 8, }}>
                {cart.length}
              </Text>
            </View>
          ) : (
            <></>
          )}
        </View>
      </View>
      {(!(!!cart.length)) && (
        <View style={tailwind`mt-10 justify-center px-5 items-center`}>
          <Text style={tailwind`text-center text-gray-500`}>You have no items yet! click add to cart icon and order the products! 👶</Text>
        </View>
      )}
      <ScrollView>
        {cart.map(item => (
          <View key={item.id} style={{ marginTop: responsiveHeight(1) }}>
            <View style={{ height: responsiveHeight(8.5), backgroundColor: 'white', justifyContent: 'space-around', flexDirection: 'row', paddingHorizontal: responsiveWidth(2) }}>
              <Image
                source={{ uri: item.image }}
                style={[{ height: responsiveHeight(8), width: responsiveWidth(20) }]}
                resizeMode="contain"
              />
              <View style={{ justifyContent: 'center', marginLeft: responsiveWidth(1) }}>
                <Text style={{ color: 'black' }}>{item.title.length > 20 ? item.title.substring(0, 20) + '....' : item.title}</Text>
                <Text style={{ color: 'black' }}>${item.price * item.quantity}</Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <TouchableOpacity onPress={() => minus(item)} style={{ height: responsiveWidth(8), width: responsiveWidth(8), borderRadius: responsiveWidth(4), backgroundColor: '#e6e6e6', marginLeft: responsiveWidth(2), alignItems: 'center', justifyContent: 'center' }}>
                  <AntDesign name='minus' color={'black'} size={16} />
                </TouchableOpacity>
                <Text style={{ color: 'black', marginLeft: responsiveWidth(2), fontWeight: 'bold' }}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => plus(item)} style={{ height: responsiveWidth(8), width: responsiveWidth(8), borderRadius: responsiveWidth(4), backgroundColor: '#e6e6e6', marginLeft: responsiveWidth(2), alignItems: 'center', justifyContent: 'center' }}>
                  <AntDesign name='plus' color={'black'} size={16} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteItem(item)} style={[tailwind`font-bold`, { marginLeft: responsiveWidth(2) }]}>
                  <MaterialIcons name='delete' color={'black'} size={28} style={[tailwind`font-bold`]} />
                </TouchableOpacity>

              </View>

            </View>

          </View>
        ))}
        {cart.length !==0 &&(
        <TouchableOpacity onPress={() => total()} style={{ height: responsiveHeight(8.5), backgroundColor: '#5B79E0', alignItems: 'center', justifyContent: 'center', marginTop: responsiveHeight(1), marginBottom: responsiveHeight(1) }}>
          <Text style={{ color: '#fff', fontSize: responsiveFontSize(2), fontWeight: 'bold' }}>PROCEED TO CHECKOUT</Text>
        </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({})