import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import ContactForm from './components/ContactForm';
import Navbar from './components/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import 'react-circular-progressbar/dist/styles.css';
import { asyncFetchAllContacts } from './features/Contacts/contactSlice';
import ContactList from './components/ContactList';
import SearchBox from './components/SearchBox';

function App() {
  const [toggleSearch, setToggleSearch] = useState(false);
  const dispatch = useDispatch();
  const { contacts } = useSelector((state) => state.Contact);
  const value = contacts.length;

  useEffect(() => {
    dispatch(asyncFetchAllContacts());
  }, [dispatch]);

  return (
    <div className="mb-5">
      <Navbar toggleSearch={toggleSearch} setToggleSearch={setToggleSearch} />
      <ToastContainer />
      <div className="container mx-auto mt-5 mb-5">
        {
          toggleSearch && <SearchBox />
        }
      </div>
      <div className="container mx-auto md:w-[15%] w-[50%] mt-5 mb-5">
        <CircularProgressbar
          styles={buildStyles({
            textSize: '16px',
            pathColor: '#3944f7',
            textColor: '#3944f7',
            trailColor: '#d6d6d6',
            backgroundColor: '#3e98c7',
          })}
          value={value}
          maxValue={10000}
          strokeWidth={5}
          text={`${value} Contact`}
        />
      </div>
      <section className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 text-xl w-[90%] md:w-full">
        <ContactForm />
        <ContactList />
      </section>
    </div>
  );
}

export default App;
