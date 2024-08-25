import { createSlice } from "@reduxjs/toolkit";

const initialState = { books: [], changed: false };
const booksSlice = createSlice({
  name: "books",
  initialState: initialState,
  reducers: {
    replaceBooks: (state, action) => {
      state.books = action.payload.books;
    },
    addBook: (state, action) => {
      const newBook = action.payload;
      const ExistingBook = state.books.find((book) => book.id === newBook.id);
      state.changed = true;
      if (ExistingBook) {
        ExistingBook.title = newBook.title;
        ExistingBook.description = newBook.description;
        ExistingBook.price = newBook.price;
      } else {
        state.books.push({
          id: newBook.id,
          title: newBook.title,
          description: newBook.description,
          price: newBook.price,
        });
      }
    },

    removeBook: (state, action) => {
      const id = action.payload;
      state.books = state.books.filter((book) => book.id !== id);
      state.changed = true;
    },
  },
});

export const booksAction = booksSlice.actions;
export default booksSlice.reducer;
