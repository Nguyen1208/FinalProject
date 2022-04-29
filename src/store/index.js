import {createStore} from 'redux'
import cartItemsReducer from '../reducers/CartItem'

const store = createStore(cartItemsReducer)

export default store