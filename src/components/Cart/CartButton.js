import classes from './CartButton.module.css';
import { useDispatch ,useSelector} from 'react-redux';
import {UIAction}  from '../../store/state-slice/UiSlice';

const CartButton = (props) => {
  const totalCartItem = useSelector(state=>state.cart.totalQuantity)
  const dispatch = useDispatch();
  const cartShowHandler = ()=>{
    dispatch(UIAction.toggleCart());
  }
  return (
    <button onClick={cartShowHandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalCartItem}</span>
    </button>
  );
};

export default CartButton;
