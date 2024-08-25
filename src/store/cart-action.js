import { UIAction } from "../store/state-slice/UiSlice";
import { cartAction } from "./state-slice/cartSlice";

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      UIAction.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://food-order-app-a0b24-default-rtdb.firebaseio.com/bookscart.json",
        {
          method: "put",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        dispatch(
          UIAction.showNotification({
            status: "error",
            title: "error...",
            message: "Sending cart data failed!",
          })
        );
      }
    };
    try {
      await sendRequest();
      dispatch(
        UIAction.showNotification({
          status: "success",
          title: "success",
          message: "Sent cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        UIAction.showNotification({
          status: "error",
          title: "error...",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://food-order-app-a0b24-default-rtdb.firebaseio.com/bookscart.json"
      );
      if (!response.ok) {
        dispatch(
          UIAction.showNotification({
            status: "error",
            title: "error...",
            message: "Fetching  cart data failed!",
          })
        );
      }
      const data = await response.json();
      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartAction.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        UIAction.showNotification({
          status: "error",
          title: "error...",
          message: "Fetching  cart data failed!",
        })
      );
    }
  };
};
