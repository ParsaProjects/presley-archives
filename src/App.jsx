import { useState } from 'react'
import './App.css'
import Header from './components/header'
import ImageHolder from './components/ImageHolder'
import ProductModal from './components/ProductModal'

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  return (
    <>
      <Header/>
      <ImageHolder onImageClick={setSelectedProduct}/>
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </>
  )
}

export default App
