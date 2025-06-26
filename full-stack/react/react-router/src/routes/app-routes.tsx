import { Route, Routes } from 'react-router'

import { Home } from '../pages/home'
import { Products } from '../pages/products'
import { NotFound } from '../pages/not-found'
import { Details } from '../pages/details'
import { Layout } from '../components/layout'

export function AppRoutes() {
  return(
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/' index element={<Home />}  />
        <Route path='/products' element={<Products />}  />
        <Route path='/details/:id' element={<Details />}  />
      </Route>

      <Route path='*' element={<NotFound />}  />
    </Routes>
  )
}