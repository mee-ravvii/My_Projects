import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Register from './pages/Register'
import ProductGrid from './adminpages/ProductsGrid'
import UpdateProducts from './adminpages/UpdateProducts'
import DeleteProducts from './adminpages/DeleteProducts'
import AddProducts from './adminpages/AddProducts'
import ProtectedAdminRoute from './adminpages/ProtectedAdminRoute'

function App() {
  
  return (
      <BrowserRouter>
        
      <Routes>


        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        <Route element={<ProtectedAdminRoute />}>

          <Route
            path="/admin/products"
            element={<ProductGrid />}
          />

          <Route
            path="/admin/products/update/:id"
            element={<UpdateProducts />}
          />

          <Route
            path="/admin/products/add"
            element={<AddProducts />}
          />

        </Route>

      </Routes>

      </BrowserRouter>
  )
}

export default App
