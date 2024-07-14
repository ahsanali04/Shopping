import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Image, RefreshControl } from 'react-native'
import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts, updateContacts, updateUsers, selectCart, selectUsers, updateCart, updateQuantity, selectQuantity } from '../redux/slices/dataSlice';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import AntDesign from 'react-native-vector-icons/AntDesign'
import tailwind from 'tailwind-react-native-classnames';
import axios from 'axios'
import Entypo from 'react-native-vector-icons/Entypo'
import Loader from '../components/loader';


const Home = ({ navigation }) => {
  const [Query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const lowerCaseSearch = Query.toLowerCase();
  const dispatch = useDispatch()
  const contacts = useSelector(selectContacts)
  const cart = useSelector(selectCart)
  const users = useSelector(selectUsers)
  const [refreshing, setRefreshing] = React.useState(false);
  const [secureText, setSecureText] = useState(false)
  const quantity = useSelector(selectQuantity)
  const [loading, setLoading] = useState(true)


  const Get = useCallback(async () => {

    const response = await axios.get("https://fakestoreapi.com/products/");
    const result = await response.data;
    result.forEach(object => {
      object.quantity = 1;
    });
    console.log(result)
    dispatch(updateUsers(result))
    setLoading(false)
  }, [])

  useEffect(() => {
    Get()
  }, [Get])




  const Detail = (select) => {
    dispatch(updateContacts(select))
    console.log(select.id)
    navigation.navigate('contact')
  }

  const categories = [
    {
      name: "electronics",
      id: 1
    },
    {
      name: "jewelery",
      id: 2
    },
    {
      name: "men's clothing",
      id: 3
    },
    {
      name: "women's clothing",
      id: 4
    }]


  const category = async (select) => {
    console.log(select.name)
    const name = select.name
    setLoading(true)
    const response = await axios.get(`https://fakestoreapi.com/products/category/${name}`);
    const result = await response.data;
    result.forEach(object => {
      object.quantity = 1;
    });
    console.log(result)
    dispatch(updateUsers(result))
    setLoading(false)
  }

  const refresh = useCallback(() => {
    onRefresh()
  }, [refreshing]);

  const onRefresh = async () => {
    setRefreshing(true);
    const response = await axios.get("https://fakestoreapi.com/products/");
    const result = await response.data;
    result.forEach(object => {
      object.quantity = 1;
    });
    dispatch(updateUsers(result))
    setRefreshing(false)
  }

  const Add = (item) => {
    setLoading(true)
    console.log(item)
    const id = item.id
    const object = cart.find(obj => obj.id === id);
    if (!!object) {
      /* alert('Already in the cart') */
      setLoading(false)
      navigation.navigate('Cart')
    } else {
      dispatch(updateCart([...cart, item]))
      setLoading(false)
      navigation.navigate('Cart')
    }

  }

  return (
    <View style={{ flex: 1, backgroundColor: '#e6e6e6' }}>
      <Loader visible={loading} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity style={{ marginTop: responsiveWidth(4), marginLeft: responsiveWidth(4) }} onPress={() => navigation.openDrawer()}>
          <AntDesign name='menuunfold' color={'black'} size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={{ marginTop: responsiveWidth(4), marginRight: responsiveWidth(4) }}>
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
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', justifyContent: 'space-between', marginHorizontal: responsiveWidth(4), borderRadius: responsiveWidth(2), marginTop: responsiveHeight(2), }}>

        <TextInput
          placeholder="Search"
          placeholderTextColor="#009387"
          color="#009387"
          style={[tailwind`px-1 py-3 w-60  bg-white  border-gray-200 `, { borderRadius: responsiveWidth(2), marginHorizontal: responsiveWidth(4), justifyContent: 'center', alignItems: 'center' }]}
          onChangeText={(text) => setQuery(text)}
          value={Query}


        />

        <View >

          <AntDesign name='search1' color={'#009387'} size={24} style={{ marginHorizontal: responsiveWidth(4) }} />


        </View>
      </View>
      <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{
        flexDirection: 'row',
        justifyContent: 'space-evenly'
      }} style={{ marginTop: responsiveHeight(2), height: responsiveHeight(14), marginHorizontal: responsiveWidth(2) }} horizontal={true}>
        {categories.map(cate => (

          <TouchableOpacity onPress={() => category(cate)} key={cate.id} style={{ justifyContent: 'space-evenly', flexDirection: 'row', height: responsiveHeight(6), width: responsiveWidth(35), backgroundColor: 'white', borderRadius: responsiveWidth(5), marginBottom: responsiveHeight(2), alignItems: 'center', marginHorizontal: responsiveWidth(2) }}>
            <Text style={{ color: 'black' }}>{cate.name}</Text>
          </TouchableOpacity>


        ))}

      </ScrollView>

      <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      } showsVerticalScrollIndicator={false} style={{ marginHorizontal: responsiveWidth(4) }} contentContainerStyle={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly'
      }}>
        {users?.filter((e) => e.title.toLowerCase().includes(lowerCaseSearch)).map(item => (
          <View key={item.id} style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <View style={{ backgroundColor: '#fff', borderRadius: responsiveWidth(2), marginBottom: responsiveHeight(1), }}>
              <TouchableOpacity onPress={() => Detail(item)} style={{ height: responsiveHeight(37), width: responsiveWidth(45), marginTop: responsiveHeight(2), backgroundColor: '#fff', borderRadius: responsiveWidth(2), }}>
                <Image source={{ uri: item.image }} style={{ height: responsiveHeight(22), width: responsiveWidth(35), marginTop: responsiveHeight(2), marginHorizontal: responsiveWidth(5), }} resizeMode="contain" />
                <Text style={{ color: "black", marginHorizontal: responsiveWidth(5), marginTop: responsiveHeight(1) }}>{item.title.length > 30 ? item.title.substring(0, 30) + '...' : item.title}</Text>
                <Text style={{ color: "black", marginHorizontal: responsiveWidth(5), marginTop: responsiveHeight(1), fontWeight: 'bold' }}>{item.category}</Text>
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: responsiveWidth(5), marginBottom: responsiveHeight(2) }}>
                <Text style={{ color: '#000' }}>${item.price}</Text>
                <TouchableOpacity onPress={() => Add(item)}>
                  <AntDesign name='shoppingcart' color={'#000'} size={24} />
                </TouchableOpacity>
              </View>

            </View>

          </View>
        ))}
      </ScrollView>

    </View>
  )
}


export default Home

const styles = StyleSheet.create({})