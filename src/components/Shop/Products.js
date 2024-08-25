import NewBookForm from './NewBookForm';
import ProductItem from './ProductItem';
import classes from './Products.module.css';
import { useState, useEffect,useRef } from 'react';
import { sendBookData,FetchBookData } from '../../store/book-action';
import { useSelector,useDispatch } from 'react-redux';

const Products = (props) => {
  const isInitials = useRef(true);
  const dispatch = useDispatch();
  const books = useSelector(state=>state.books);

  useEffect(()=>{
      dispatch(FetchBookData());
  },[dispatch])
  const DummyData = [
    {
      id: 1,
      title:'My First Book',
      description: 'This is a first book - amazing!',
      price:6
    },
    {
      id: 2,
      title:'My Second Book',
      description: 'This is a 2nd book - amazing!',
      price:5
    },
    {
      id: 3,
      title:'My Third Book',
      description: 'This is a 2nd book - amazing!',
      price:4
    }
  ]
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <NewBookForm/>
      <ul>
        {books.books.map((item)=>
        <ProductItem
        key={item.id}
        id = {item.id}
        title={item.title}
        price={item.price}
        description={item.description}
      />
        )}
      </ul>
    </section>
  );
};

export default Products;
