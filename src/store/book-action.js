import { UIAction } from "./state-slice/UiSlice";
import { booksAction } from "./state-slice/booksSlice";
export const sendBookData = (book) => {
  return async (dispatch) => {
    dispatch(
      UIAction.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending book data!",
      })
    );

    const sendData = async () => {
      const response = await fetch(
        "https://food-order-app-a0b24-default-rtdb.firebaseio.com/books.json",
        {
          method: "Post",
          body: JSON.stringify(book),
        }
      );
      if (!response.ok) {
        dispatch(
          UIAction.showNotification({
            status: "error",
            title: "error",
            message: "Sending book data Failed!",
          })
        );
      }
    };

    try {
      await sendData();
      dispatch(
        UIAction.showNotification({
          status: "success",
          title: "success",
          message: "book data has been sent successfully!",
        })
      );
    } catch (error) {
      dispatch(
        UIAction.showNotification({
          status: "error",
          title: "error",
          message: "Sending book data Failed!",
        })
      );
    }
  };
};

export const FetchBookData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://food-order-app-a0b24-default-rtdb.firebaseio.com/books.json"
      );
      if (!response.ok) {
        dispatch(
          UIAction.showNotification({
            status: "error",
            title: "error",
            message: "Something went wrong fetching books data!",
          })
        );
      }

      const data = response.json();
      return data;
    };
    try {
      const booksData = await fetchData();
      const loadedBooks = [];
      for (const key in booksData) {
        loadedBooks.push({
          id: key,
          ...booksData[key],
        });
      }
      dispatch(
        booksAction.replaceBooks({
          books: loadedBooks || [],
        })
      );
    } catch (error) {
      dispatch(
        UIAction.showNotification({
          status: "error",
          title: "error",
          message: "Something went wrong fetching books data!",
        })
      );
    }
  };
};
