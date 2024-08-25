import {useEffect,useState,useRef} from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useSelector,useDispatch} from 'react-redux';
import Notification from './components/UI/Notifications';
import { sendCartData,fetchCartData } from './store/cart-action';
function App() {
  const isInitial = useRef(true)
  const dispatch = useDispatch()
  const showCart = useSelector(state=>state.ui.cartVisible);
  const notification = useSelector(state=>state.ui.notification);
  const cart = useSelector(state=>state.cart);

useEffect(()=>{
  dispatch(fetchCartData());
},[dispatch])

useEffect(()=>{
  if(isInitial.current){
    isInitial.current = false;
    return;
  }
  if(cart.cartChanged){
    dispatch(sendCartData(cart));
  }

},[cart,dispatch])
  return (
    <Layout>
      {notification && <Notification title={notification.title} status={notification.status} message={notification.message}/>}
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
