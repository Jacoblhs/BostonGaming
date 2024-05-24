import React from "react";

const Header = () => {
  return (
    <header className="h-32 flex bg-white text-black tracking-wider p-3 justify-evenly">
      
      <div className="flex items-center">
        <figure className="w-20 mx-2">
          <a href="/">
            <img src={"logo.png"} alt="logo" />
          </a>
        </figure>
        <p className="font-extrabold uppercase text-xl">Boston Gaming</p>
      </div>

      <nav className="flex items-center uppercase font-bold">
        <ul className="flex">
          <li className="mx-3"><a href="#products">Products</a></li>
          <li className="mx-3"><a href="#designyourown">Design your own</a></li>
          <li className="mx-3"><a href="#about">About</a></li>
          <li className="mx-3"><a href="#contact">Contact</a></li>
        </ul>
      </nav>

    </header>
  );
};

export default Header;
