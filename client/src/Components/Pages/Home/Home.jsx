import React from 'react'
import Carousel from './Carousel'
import Introduce from './Introduce'
import ProductList from './ProductList'
import Map from './Map'

export default function Home() {
  return (
    <div>
      <Carousel/>
      <Introduce/>
      <ProductList/>
      <Map/>
    </div>
  )
}
