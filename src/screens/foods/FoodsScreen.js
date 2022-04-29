import { FlatList, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as firebase from 'firebase';
import { useSelector, useDispatch } from 'react-redux'
import { ADD_TO_CART } from '../../reducers/CartItem';

const FoodsScreen = () => {
  const dispatch = useDispatch()

  const cartlist = useSelector(state => state.numberCart)

  // const total = useSelector(state => state.cartTotalAmount)
  console.log('cartList--', cartlist);
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true);
  // firebase.firestore.setLogLevel('debug')

  useEffect(() => {
    const subscriber = firebase
      .firestore()
      .collection('products')
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          products.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
          console.log(documentSnapshot.data())
        });
        // setProducts(products);
        setLoading(false);
        // console.log(products);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  const renderRow = ({ item, index }) => {
    const addItemToCart = item => dispatch({ type: ADD_TO_CART, payload: item });
    return (
      <TouchableOpacity
        onPress={() => {
          addItemToCart(item)
          // navigation.navigate('ProductDetail', { item: item })
        }}
      >
        <View style={styles.body}>
          <Image source={{ uri: item.image }} style={{ width: "100%", height: '80%' }} />
          <View style={styles.title}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{item.name}</Text>
            <Text style={{ fontSize: 18, color: 'red' }}>${item.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: 'bold', fontSize: 25 }}>List Foods</Text>
      <View
        style={{ maxHeight: 450 }}>
        <FlatList
          data={products}
          extraData={products}
          keyExtractor={(item) => item.key.toString()}
          renderItem={renderRow} />
        {/* <View style={{ marginBottom: 100 }} /> */}
      </View>
    </View>
  )
}

export default FoodsScreen

const styles = StyleSheet.create({
  container: { padding: 10, backgroundColor: '#ddd' },
  body: {
    backgroundColor: '#fff',
    height: 250,
    marginBottom: 15,
  },
  title: { justifyContent: 'space-between', padding: 10, flexDirection: 'row' }
})