import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Form from './Form';
import Menu from './Menu';
import Home from './Home';
import About from './About';
import Navbar from './Navbar';

function App() {
  return (
    <main>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/products' element={<Menu />} />
          <Route path='/products/:id' element={<Form />}></Route>
          <Route path='/new' element={<Form />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
