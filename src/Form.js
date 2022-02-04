import axios from 'axios';
import React, { useState } from 'react';

const Form = ({ fetchProducts, url }) => {
  const [product, setProduct] = useState({
    name: '',
    price: 0,
    description: '',
    image: '',
  });

  const handleChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    setProduct({ ...product, [field]: value });
  };

  // REFATORAR!!
  const postData = (e) => {
    e.preventDefault();
    if (product.name && product.price && product.description && product.image) {
      axios
        .post('https://jsb-ecommerce-app.herokuapp.com/api/v1/products', {
          ...product,
        })
        .then(fetchProducts(url))
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      <form className='form' onSubmit={postData}>
        <div className='form-control'>
          <label htmlFor='name'>Name: </label>
          <input
            type='text'
            id='name'
            name='name'
            value={product.name}
            onChange={handleChange}
          />
        </div>

        <div className='form-control'>
          <label htmlFor='price'>Price: </label>
          <input
            type='number'
            id='price'
            name='price'
            value={product.price}
            onChange={handleChange}
          />
        </div>

        <div className='form-control'>
          <label htmlFor='description'>Description: </label>
          <input
            type='text'
            id='description'
            name='description'
            value={product.description}
            onChange={handleChange}
          />
        </div>

        <div className='form-control'>
          <label htmlFor='image'>ImageURL: </label>
          <input
            type='text'
            id='image'
            name='image'
            value={product.image}
            onChange={handleChange}
          />
        </div>

        <button type='submit'>add a product</button>
      </form>
    </>
  );
};

export default Form;
