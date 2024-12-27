import React from 'react'
import Header from './Header'
import useStore from "../store/store"; 
function Likes() {
  const  { likedProducts }  = useStore();
  
  
  return (
   <>
   <Header/>
   <div>Liked Products: {likedProducts.map(product => product.name)}</div>
    
   </>
  )
}

export default Likes