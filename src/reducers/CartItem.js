export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY'
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY'
export const CLEAR_CART = 'CLEAR_CART'



const initialState = {
  numberCart: 0,
  cartItems: [],
  cartTotalAmount: 0,

}

const cartItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      if (state.numberCart == 0) {
        let cart = {
          key: action.payload.key,
          name: action.payload.name,
          image: action.payload.image,
          price: action.payload.price,
          quantity: 1,
        }
        state.cartItems.push(cart);
        console.log('hehehe');
      } else {
        let check = false;
        state.cartItems.map((item, key) => {
          if (item.key == action.payload.key) {
            state.cartItems[key].quantity++;
            check = true;
          }
        });
        console.log('hehehe');
        if (!check) {
          let _cart = {
            key: action.payload.key,
            name: action.payload.name,
            image: action.payload.image,
            price: action.payload.price,
            quantity: 1,
          }
          state.cartItems.push(_cart);
        }
      }
      return {
        ...state,
        numberCart: state.numberCart + 1
      }

    case DECREASE_QUANTITY:
      return {
        ...state,
        numberCart: state.numberCart - 1,
        cartItems: state.cartItems.map(item =>
          item.key == action.payload.key
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
      }

    case INCREASE_QUANTITY:
      return {
        ...state,
        numberCart: state.numberCart + 1,
        cartItems: state.cartItems.map(item =>
          item.key === action.payload.key
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      }
    case REMOVE_FROM_CART:
      return {
        ...state,
        numberCart: state.numberCart - 1,
        cartItems: state.cartItems.filter(item => item.key !== action.payload.key)
      }

    case CLEAR_CART:
      return {
        numberCart: 0,
        cartItems: [],
        cartTotalAmount: 0,
      }

  }
  return state
}

export default cartItemsReducer