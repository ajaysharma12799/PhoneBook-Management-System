import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { asyncAddContact, asyncUpdateContact } from '../features/Contacts/contactSlice';

function ContactForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const { currentContact } = useSelector((state) => state.Contact);

  useEffect(() => {
    if (currentContact) {
      setName(currentContact.name);
      setNumber(currentContact.number);
      setEmail(currentContact.email);
    } else {
      setName('');
      setNumber('');
      setEmail('');
    }
  }, [currentContact]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentContact) {
      if (name === '' || number === '' || email === '') {
        toast.error('Please Enter Correct Information');
      } else {
        const newUpdatedContact = {
          id: currentContact.id, name, number, email, date: currentContact.date,
        };
        dispatch(asyncUpdateContact({ id: currentContact.id, contact: newUpdatedContact }));
        setName('');
        setNumber('');
        setEmail('');
        toast.success('Contact Updated Successfully');
      }
    } else if (name === '' || number === '' || email === '') {
      toast.error('Please Enter Correct Information');
    } else {
      const newContact = {
        id: uuid(), name, number, email, date: new Date(),
      };
      dispatch(asyncAddContact(newContact));
      setName('');
      setNumber('');
      setEmail('');
      toast.success('Contact Added Successfully');
    }
  };

  const handleButton = name !== '' && number !== '' && email !== '';

  return (
    <section>
      <div className="mt-3 mb-3">
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="rounded-0 w-full px-5 py-2 border-2 border-[#3944f7] outline-none" placeholder="Enter Name" />
      </div>
      <div className="mt-3 mb-3">
        <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} className="rounded-0 w-full px-5 py-2 border-2 border-[#3944f7] outline-none" placeholder="Enter Number" />
      </div>
      <div className="mt-3 mb-3">
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-0 w-full px-5 py-2 border-2 border-[#3944f7] outline-none" placeholder="Enter Email" />
      </div>
      <div className="mt-3 mb-3">
        <button
          type="submit"
          disabled={!handleButton}
          onClick={handleSubmit}
          className={!handleButton ? 'rounded-0 w-full px-5 py-2 bg-gray-300 text-white' : 'rounded-0 w-full px-5 py-2 bg-[#3944f7] text-white'}
        >
          {currentContact ? 'Update Contact' : 'Add Contact'}
        </button>
      </div>
    </section>
  );
}

export default ContactForm;
