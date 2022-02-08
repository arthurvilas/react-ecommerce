import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from './api';

const Menu = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    setLoading(true);
    api
      .get('/products/list')
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const deleteProduct = (id) => {
    setLoading(true);
    api
      .delete(`/products/${id}`)
      .then(fetchProducts)
      .catch((error) => console.log(error));
  };

  useEffect(fetchProducts, []);

  if (loading) {
    return (
      <section className='menu section'>
        <div className='title'>
          <h2>Loading...</h2>
        </div>
      </section>
    );
  }

  return (
    <section className='menu section'>
      <div className='title'>
        <h2>Our Products</h2>
      </div>
      <div className='section-center'>
        {products.map((product) => {
          const { id, name, price, description, image } = product;
          return (
            <article key={id} className='menu-item'>
              <img src={image} alt={name} className='photo' />
              <div className='item-info'>
                <header>
                  <h4>{name}</h4>
                  <h4 className='price'>{price}</h4>
                </header>
                <p className='item-text'>{description}</p>
                <button className='btn' onClick={() => deleteProduct(id)}>
                  Delete
                </button>
                <Link to={`/products/${id}`}>
                  <button className='btn'>Update</button>
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Menu;
