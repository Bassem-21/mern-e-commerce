import React from 'react';
import {  useNavigate } from 'react-router-dom';


function Header() {
const navigate = useNavigate();

const handleCheckUser =  () => {
  navigate('/product-upload');
}

const gotToHomePage = () => {
  navigate('/');
}
  return (
    <div className="flex justify-between items-center p-5 bg-[#0f0903] border-b-2 border-b-[#FCAB2E]">
      <div className="flex gap-4">
        <div className="text-white text-xl">Logo</div>
        <div className="text-[#FCAB2E] hover:text-[white] transition-colors cursor-pointer" onClick={gotToHomePage}>Home</div>
      </div>
      <div className="text-white text-lg">
        <input type="text" />
      </div>
      <div className="flex gap-4 text-white text-lg">
        <div className="text-[#FCAB2E] hover:text-[white] transition-colors cursor-pointer" onClick={handleCheckUser}>add item</div>
        <div className="text-[#FCAB2E] hover:text-[white] transition-colors cursor-pointer" onClick={() => navigate('/login')}>Account</div>
        <div className="text-[#FCAB2E] hover:text-[white] transition-colors cursor-pointer" onClick={() => navigate('/likes')}>Likes</div>
        <div className="text-[#FCAB2E] hover:text-[white] transition-colors cursor-pointer" onClick={() => navigate('/cart')}>Cart</div>
        <div className="text-[#FCAB2E] hover:text-[white] transition-colors cursor-pointer" onClick={() => navigate('/order')}>Order</div>
        
      </div>
    </div>
  );
}

export default Header;
