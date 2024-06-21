import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AllProducts from './Pages/AllProducts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import CatgProducts from './Pages/CatgProducts';
import Home from './Pages/Home';
import Cart from './Pages/Cart';


// Create a client
const queryClient = new QueryClient()



function App() {
  return (
    <>
      <ToastContainer
        // position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* // Provide the client to your App */}

      <QueryClientProvider client={queryClient}>

        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/allproducts' element={<AllProducts />} />
            <Route path='/catgproducts/:name' element={<CatgProducts />} />
            <Route path='/cart' element={<Cart />} />

          </Routes>
        </Router>
      </QueryClientProvider>

    </>

  );
}

export default App;
