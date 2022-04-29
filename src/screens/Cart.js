/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import { View, Text, FlatList, Image, TouchableOpacity, Alert, TextInput } from 'react-native'
import React from 'react'
// import { TextInput } from 'react-native-rapi-ui';
import { useSelector, useDispatch } from 'react-redux'
import {
  CLEAR_CART,
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
  REMOVE_FROM_CART,
} from '../reducers/CartItem';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as firebase from 'firebase';
import { CardField, useStripe, useConfirmPayment, CardFieldInput, PaymentMethodCreateParams } from '@stripe/stripe-react-native';
// import { API_URL } from './Config';

export default function Cart({ navigation }) {
  const dispatch = useDispatch()
  const cartlist = useSelector(state => state.numberCart)
  const cartItems = useSelector(state => state.cartItems)
  const cartState = useSelector(state => state)
  const [cardDetails, setCardDetails] = React.useState();
  const { confirmPayment, loading } = useConfirmPayment();

  // const [card, setCard] = React.useState(CardFieldInput.Details | null);
  // const { confirmPayment, handleCardAction } = useStripe();
  const API_URL = "http://192.168.0.13:8000";
  // const { initPaymentSheet, presentPaymentSheet } = useStripe();
  // const [loading, setLoading] = React.useState(false);
  const SECRET_KEY = "sk_test_51Kku6eAuXLusLu101rJBf5nM1UNtY3bPdVxEbGbmKyEF75yKuOjhwvBoNJYUaFCiiWjmOlbYCQH3aaOnMSIGJiGL00RBr4j99w";

  const clearCart = item =>
    dispatch({
      type: CLEAR_CART,
      payload: item
    })

  const total = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
  // const total = useSelector(state => state.cartTotalAmount)
  console.log('cartList--', cartlist);
  console.log('total--', total);

  const [userData, setUserData] = React.useState({
    phoneNumber: '',
    displayName: '',
    address: ''
  });

  async function orderUser() {
    await firebase
      .firestore()
      .collection('order')
      .doc()
      .set({
        address: userData.address,
        displayName: userData.displayName,
        phoneNumber: userData.phoneNumber,
        totalPrice: total,
        isCheck: false,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        cartitems: cartItems,
      })
      .then(() => {
        console.log('Product updated!');
        Alert.alert(
          "Successful booking!",
        );
        clearCart(cartState)
        navigation.navigate('MainTabs')
      })
  }


  // const { confirmPayment, loading } = useConfirmPayment()
  const fetchPaymentIntentClientSecret = async () => {
    // const amount = total * 100;
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        payment_method_types: ["card"], //by default
        // amount: amount,
        // payment_method_types: ["card"],
      })
    })
    // const amountt = {
    //   amount: total * 100,
    // }
    const { clientSecret, error } = await response.json();
    return { clientSecret, error }
  }

  const handlePayPress = async () => {
    if (!cardDetails?.complete) {
      Alert.alert('Please enter cart and information')
      return
    }
    const billingDetails = {
      name: userData.displayName,
      phone: userData.phoneNumber,
    }
    // const totalPrice = {
    //   amount: total,
    // }
    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();
      //2. confirm the payment
      if (error) {
        console.log("Unable to process payment", error);
      } else {
        const { paymentIntent, error } = await confirmPayment(
          clientSecret,
          // amount = total * 100,
          {
            type: "Card",
            billingDetails: billingDetails,
          });
        if (error) {
          alert(`Payment Confirmation Error ${error.message}`);
        } else if (paymentIntent) {
          alert("Payment Successful");
          console.log("Payment successful ", paymentIntent);
          orderUser;
        }
      }
    } catch (e) {
      console.log(e);
      console.log('noooo');
    }
    //3.Confirm the payment with the card details
  };


  //   const response = await fetch(`${API_URL}/create-payment-intent`, {
  //     method: 'POST',
  //     header: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       paymentMethodType: 'card',
  //       currency: 'usd',
  //       amount: total
  //     })
  //   })
  //   const { clientSecret } = await response.json();

  //   const { error, paymentIntent } = await confirmPayment(clientSecret, {
  //     type: 'Card',
  //     billingDetails: {
  //       // userData.address,
  //       name: userData.displayName,
  //       // userData.phoneNumber,
  //     }
  //   })
  //   if (error) {
  //     Alert.alert(`Error code: ${error.code}`, error.message);
  //   } else if (paymentIntent) {
  //     Alert.alert(
  //       'Success',
  //       `The payment was confirmed successfully! currency: ${paymentIntent.currency}`
  //     );
  //     console.log('Success from promise', paymentIntent);
  //   }
  // };

  // // 1. fetch Intent Client Secret from backend
  // const clientSecret = await fetchPaymentIntentClientSecret();

  // // 2. Gather customer billing information (ex. email)
  // const billingDetails: PaymentMethodCreateParams.BillingDetails = {
  //   userData.displayName,
  // };

  // const {error, paymentIntent} = await confirmPayment(clientSecret, {
  //   type: 'Card',
  //   billingDetails,
  // });

  // if (error) {
  //   Alert.alert(`Error code: ${error.code}`, error.message);
  //   console.log('Payment confirmation error', error.message);
  // } else if (paymentIntent) {
  //   Alert.alert(
  //     'Success',
  //     `The payment was confirmed successfully! currency: ${paymentIntent.currency}`
  //   );
  //   console.log('Success from promise', paymentIntent);
  // }

  const renderRow = ({ item, index }) => {
    const removeItemFromCart = item =>
      dispatch({
        type: REMOVE_FROM_CART,
        payload: item
      })
    const increaseQuantity = item =>
      dispatch({
        type: INCREASE_QUANTITY,
        payload: item
      })
    const decreaseQuantity = item =>
      dispatch({
        type: DECREASE_QUANTITY,
        payload: item
      })



    return (
      // <TouchableOpacity
      //   onPress={() => {
      //     addItemToCart(item)
      //     // navigation.navigate('ProductDetail', { item: item })
      //   }}
      //   >
      //   </TouchableOpacity>
      <View style={{
        backgroundColor: '#fff',
        height: 250,
        marginBottom: 15,
      }}>
        <Image source={{ uri: item.image }} style={{ width: "100%", height: '80%' }} />
        <View style={{ justifyContent: 'space-between', padding: 10, flexDirection: 'row' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{item.name}</Text>
          <Text style={{ fontSize: 18, color: 'red' }}>${item.price}</Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => {
                if (item.quantity > 1) {
                  decreaseQuantity(item)
                } else {
                  removeItemFromCart(item)
                }
              }}>
              <FontAwesome5
                name={'minus-circle'}
                style={{ alignItems: 'center', marginRight: 10, }}
                size={20}
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 18, color: 'red' }}>{item.quantity}</Text>
            <TouchableOpacity
              onPress={() => increaseQuantity(item)}
            >
              <FontAwesome5
                style={{ alignItems: 'center', marginLeft: 10, }}
                size={20}
                name={'plus-circle'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }


  return (
    <View>
      {cartItems?.length !== 0 ? (
        <>
          <View style={{ maxHeight: '100%', marginBottom: 40 }}>
            <View style={{ margin: 10 }}>
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <TextInput
                  style={{ flex: 1, backgroundColor: '#fff', padding: 10, marginRight: 10 }}
                  placeholder="Name"
                  value={userData ? userData.displayName : ''}
                  onChangeText={(text) => setUserData({ ...userData, displayName: text })}
                />
                <TextInput
                  style={{ flex: 1, backgroundColor: '#fff', padding: 10, }}
                  placeholder="Phone Number"
                  value={userData ? userData.phoneNumber : ''}
                  onChangeText={(text) => setUserData({ ...userData, phoneNumber: text })}
                />
              </View>
              <TextInput
                style={{ backgroundColor: '#fff', padding: 10, }}
                placeholder="Address"
                value={userData ? userData.address : ''}
                onChangeText={(text) => setUserData({ ...userData, address: text })}
              />
            </View>
            <CardField
              postalCodeEnabled={true}
              placeholder={{
                number: '4242 4242 4242 4242',
              }}
              cardStyle={{
                backgroundColor: '#FFFFFF',
                textColor: '#000000',
              }}
              style={{
                width: '100%',
                height: 50,
                marginVertical: 10,
              }}
              onCardChange={(cardDetails) => {
                setCardDetails(cardDetails);
                console.log('cardDetails', cardDetails);
              }}
              onFocus={(focusedField) => {
                console.log('focusField', focusedField);
              }}
            />
            <FlatList
              data={cartItems}
              extraData={cartItems}
              keyExtractor={(item) => item.key.toString()}
              renderItem={renderRow} />
            <TouchableOpacity
              disable={!loading}
              style={{
                width: '100%',
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 10,
                // onPress={() => navigation.navigate('ServiceDetail')}
              }}
              // onPress={openPaymentSheet}
              onPress={handlePayPress}
            >
              <View
                style={{
                  width: '60%',
                  backgroundColor: '#fff',
                  borderRadius: 20,
                  borderColor: 'green',
                  borderWidth: 1,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{ fontSize: 18 }}>PAY TOTAL : ${total}</Text>
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={orderUser}>
              <FontAwesome5 size={30} color={'black'} name={'times-circle'}>
                <Text style={{}}>payyy</Text>
              </FontAwesome5>
            </TouchableOpacity> */}
          </View>
        </>
      ) : (
        <View>
          <TouchableOpacity
            style={{
              marginTop: 100,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}
            onPress={() => navigation.navigate('ServiceDetail')}>
            <Text style={{ fontSize: 18, color: 'red' }}>Add more products</Text>
            <FontAwesome5
              style={{ alignItems: 'center', marginLeft: 10, }}
              size={20}
              name={'cart-plus'}
              color={'red'}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}