import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from './api';

const Form = () => {
  const { id } = useParams();
  console.log(useParams());
  console.log(id);

  const [product, setProduct] = useState({
    name: '',
    price: 0,
    description: '',
    image: '',
  });

  const fetchProduct = (id) => {
    api
      .get(`/products/${id}`)
      .then((res) => {
        console.log(res.data);
        const targetProduct = res.data;
        setProduct(targetProduct);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (id) {
      const targetProduct = fetchProduct(id);
    }
  }, []);

  const handleChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    setProduct({ ...product, [field]: value });
  };

  const postData = (e) => {
    e.preventDefault();
    if (product.name && product.price && product.description && product.image) {
      api
        .post('/products', {
          ...product,
        })
        .then(() =>
          setProduct({
            name: '',
            price: 0,
            description: '',
            image: '',
          })
        )
        .catch((error) => console.log(error));
    }
  };

  const putData = (e) => {
    e.preventDefault();
    if (product.name && product.price && product.description && product.image) {
      api
        .put(`/products/${id}`, {
          ...product,
        })
        .then(() => console.log('edited!'))
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      <form className='form' onSubmit={id ? putData : postData}>
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

        <button type='submit'>{id ? 'edit product' : 'create product'}</button>
      </form>
    </>
  );
};

export default Form;
