import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './containers/Home';
import UserProfile from './containers/UserProfile';
import PrivateRoute from './components/PrivateRoute';
import Inspection from './containers/Inspection';
import Children from './containers/Children';
import Product from './containers/Product';
import Operation from './containers/Operation';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path='/' element = {<Home />} />
        <Route path='' element = {<PrivateRoute />}>
            <Route path='/profile' element = {<UserProfile />} />
            <Route path='/inspection/:product' element = {<Inspection />} />
        </Route>
        <Route path='/categories/:slug' element = {<Children />} />
        <Route path='/products/:product' element = {<Product />} />
        <Route path='/operations/:product' element = {<Operation />} />
      </Routes>
    </Router>
  );
  
}

export default App
