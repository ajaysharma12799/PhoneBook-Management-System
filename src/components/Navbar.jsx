import React from 'react';
import PropTypes from 'prop-types';
import { AiOutlineSearch } from 'react-icons/ai';

function Navbar({ toggleSearch, setToggleSearch }) {
  return (
    <nav className="h-[5%] bg-[#3944f7] navbar">
      <div className="container mx-auto px-5 md:px-1 py-5 flex justify-between items-center">
        <h1 className="uppercase text-xl">
          <p className="text-white">PhoneBook Management</p>
        </h1>
        <button
          type="submit"
          onClick={() => setToggleSearch(!toggleSearch)}
          className="text-white w-fit cursor-pointer text-2xl"
        >
          <AiOutlineSearch />
        </button>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  toggleSearch: PropTypes.bool.isRequired,
  setToggleSearch: PropTypes.func.isRequired,
};

export default Navbar;
