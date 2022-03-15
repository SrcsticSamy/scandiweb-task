import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import ProductDetails from './Pages/ProductDetails';
import Bag from './Pages/Bag';
import Error from './Pages/Error';

class App extends Component {


  render() {
    return (
      <Router>
        <Navbar/>

        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/bag' element={<Bag/>}/>
          <Route path='/product/:id' element={<ProductDetails/>}/>
          <Route path='*' element={<Error/>}/>
        </Routes>
        
      </Router>

    )
  }
}


export default App;
