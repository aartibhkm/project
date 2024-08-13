import { combineReducers } from 'redux';
import cartReducer from './cartSlice';
import ExpandSlice from './ExpandSlice';
const rootReducer = combineReducers({
  cart: cartReducer,
  expandSidebar: ExpandSlice,
});

export default rootReducer;
