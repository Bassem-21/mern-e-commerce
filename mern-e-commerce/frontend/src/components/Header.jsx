import React from 'react';

function Header() {
  return (
    <div className="flex justify-between items-center p-5 bg-[#0f0903]">
      <div className="flex gap-4">
        <div className="text-white text-xl">Logo</div>
      </div>
      <div className="text-white text-lg">
        <div className="text-[#FCAB2E] hover:text-[white] transition-colors cursor-pointer">Home</div>
      </div>
      <div className="flex gap-4 text-white text-lg">
        <div className="text-[#FCAB2E] hover:text-[white] transition-colors cursor-pointer">Account</div>
        <div className="text-[#FCAB2E] hover:text-[white] transition-colors cursor-pointer">Likes</div>
        <div className="text-[#FCAB2E] hover:text-[white] transition-colors cursor-pointer">Cart</div>
      </div>
    </div>
  );
}

export default Header;
