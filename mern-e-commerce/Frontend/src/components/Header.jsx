import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn'); // or sessionStorage
    if (loginStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleCheckUser = () => {
    navigate('/product-upload');
  };

  const goToHomePage = () => {
    navigate('/');
  };
  const logOut = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    navigate('/');
  }

  return (
    <div className="flex justify-between items-center p-5 bg-primary border-b-4 border-b-secondary">
      <div className="flex gap-4 items-center">
        <div className="text-white text-xl">QuickShop</div>
        <div className="text-text hover:text-[white] transition-colors cursor-pointer" onClick={goToHomePage}>Home</div>
      </div>
      <div className="text-black text-lg">
        <input type="text" />
        <button className="text-text ml-3">search</button>
      </div>
      <div className="flex gap-4 text-white text-lg">
        {isLoggedIn ? (
          <>
            <div className="text-text hover:text-[white] transition-colors cursor-pointer" onClick={handleCheckUser}>Add Item</div>
            <div className="text-text hover:text-[white] transition-colors cursor-pointer" onClick={() => navigate('/likes')}>Likes</div>
            <div className="text-text hover:text-[white] transition-colors cursor-pointer" onClick={() => navigate('/cart')}>Cart</div>
            <div className="text-text hover:text-[white] transition-colors cursor-pointer" onClick={() => navigate('/order')}>Order</div>
            <div className="text-text hover:text-[white] transition-colors cursor-pointer" onClick={logOut}>Log out</div>
          </>
        ) : (
          <div className="text-text hover:text-[white] transition-colors cursor-pointer" onClick={() => navigate('/login')}>Log in</div>
        )}
      </div>
    </div>
  );
}

export default Header;
