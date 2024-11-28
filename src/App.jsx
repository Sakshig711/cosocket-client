import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./containers/Home";
import UserProfile from "./containers/UserProfile";
import PrivateRoute from "./components/PrivateRoute";
import Inspection from "./containers/Inspection";
import Children from "./containers/Children";
import Product from "./containers/Product";
import Operation from "./containers/Operation";
import Details from "./containers/Details";
import Sourcing from "./containers/Sourcing";
import HowItWorks from "./containers/HowItWorks";
import ManufacturerPage from "./containers/ManufacturerPage";
import VariantDetails from "./containers/VariantDetails";
import SearchedProducts from "./containers/SearchedProducts";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="" element={<PrivateRoute />}>
          <Route path="/profile" element={<UserProfile />} />
        </Route>
        <Route path="/inspection/:product" element={<Inspection />} />
        <Route path="/sourcing/:product" element={<Sourcing />} />
        <Route path="/categories/:slug" element={<Children />} />
        <Route path="/products/:product" element={<Product />} />
        <Route path="/operations/:product" element={<Operation />} />
        <Route path="/manufacturer/:id" element={<Details />} />
        <Route path="/demo" element={<HowItWorks />} />
        <Route path="/top-manufacturers" element={<ManufacturerPage />} />
        <Route path="/variants/:variant" element={<VariantDetails />} />
        <Route path="/search" element={<SearchedProducts />} />
      </Routes>
    </Router>
  );
}

export default App;
