import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchContact, asyncFetchAllContacts } from '../features/Contacts/contactSlice';

function SearchBox() {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(searchContact(value));
  };

  const handleClear = (e) => {
    e.preventDefault();
    dispatch(asyncFetchAllContacts());
    setValue('');
  };

  return (
    <div className="w-[90%] md:w-full mx-auto">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="rounded-0 border-2 border-[#3944f7] w-full p-2 outline-none"
        placeholder="Search Contact by Name or Number"
      />
      <div className="flex justify-between items-center mt-2 flex-col md:flex-row">
        <button type="submit" className="border-2 border-[#3944f7] hover:bg-[#3944f7] text-black hover:text-white text-lg md:text-xl rounded-0 mb-2 md:mb-0 w-full md:w-fit px-5 py-2 transition-all ease-in-out duration-200" onClick={(e) => handleClick(e)}>
          Search
        </button>
        <button type="submit" className="border-2 border-[#C43B21] hover:bg-[#C43B21] text-black hover:text-white text-lg md:text-xl rounded-0 w-full md:w-fit px-5 py-2 transition-all ease-in-out duration-200" onClick={(e) => handleClear(e)}>
          Clear
        </button>
      </div>
    </div>
  );
}

export default SearchBox;
