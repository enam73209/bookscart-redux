import React, { useState } from "react";
import classes from "./NewBookForm.module.css";
import { useDispatch } from "react-redux";
import { UIAction } from "./../../store/state-slice/UiSlice";
import { booksAction } from "../../store/state-slice/booksSlice";
import { sendBookData } from "../../store/book-action";

const NewBookForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();
    if (
      title.trim() === "" ||
      description.trim() === "" ||
      price.trim() === ""
    ) {
      dispatch(
        UIAction.showNotification({
          status: "error",
          title: "error",
          message: "title , description or price must be filled",
        })
      );
      return;
    }
    const newBook = {
      id: Math.random().toString(),
      title,
      description,
      price: parseFloat(price),
    };
    dispatch(booksAction.addBook(newBook));
    await dispatch(sendBookData(newBook));
    // Reset form fields
    setTitle("");
    setDescription("");
    setPrice("");
  };
  return (
    <div className={classes["form-container"]}>
      <form onSubmit={submitHandler} className={classes["form-card"]}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default NewBookForm;
