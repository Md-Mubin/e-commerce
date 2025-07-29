import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Login from './Components/Login'
import LayoutOne from './Layouts/LayoutOne'
import Dashboard from './pages/Dashboard'
import AllProducts from './pages/AllProducts'
import OrderLists from './pages/OrderLists'
import AllCustomers from './pages/AllCustomers'
import ReviewsLists from './pages/ReviewsLists'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path='/admin' element={<Login />} />

            <Route path='/dashboard' element={<LayoutOne />}>
              <Route index element={<Dashboard />} />
              <Route path='/dashboard/products' element={<AllProducts />} />
              <Route path='/dashboard/orders' element={<OrderLists />} />
              <Route path='/dashboard/customers' element={<AllCustomers />} />
              <Route path='/dashboard/reviews' element={<ReviewsLists />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
