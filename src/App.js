import { useEffect, useState } from 'react';
import Menu from './Menu';

const url = 'https://jsb-ecommerce-app.herokuapp.com/api/v1/products/list';

function App() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const fetchProducts = async (url) => {
    try {
      const res = await fetch(url);
      const products = await res.json();
      setLoading(false);
      setProducts(products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => fetchProducts(url), []);

  if (loading) {
    return (
      <main>
        <h2>Loading...</h2>
      </main>
    );
  }

  return (
    <main>
      <section className='menu section'>
        <div className='title'>
          <h2>Our Products</h2>
        </div>
        <Menu products={products} />
      </section>
    </main>
  );
}

export default App;
