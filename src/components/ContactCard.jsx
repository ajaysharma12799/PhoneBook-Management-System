/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { AiFillEdit, AiFillPhone, AiFillMail } from 'react-icons/ai';
import { BsFillTrashFill, BsFillPersonFill, BsCalendarDate } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { asyncDeleteContact, asyncSetCurrentContact } from '../features/Contacts/contactSlice';

function ContactCard({ contact }) {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(asyncDeleteContact(id));
    toast.success('Contact Deleted Successfully');
  };

  const handleCurrentContact = (id) => {
    dispatch(asyncSetCurrentContact(id));
  };

  return (
    <div className="border-2 rounded-0 border-[#3944f7] mt-3 mb-2 p-2 w-full">
      <div className="mt-2 mb-2">
        <div className="flex items-center mt-2 mb-2">
          <span><BsFillPersonFill /></span>
          <h1 className="ml-3 text-xl">
            { contact.name.toUpperCase() }
          </h1>
        </div>
        <div className="flex items-center mt-2 mb-2">
          <span><AiFillPhone /></span>
          <p className="ml-3 text-xl">{ contact.number }</p>
        </div>
        <div className="flex items-center mt-2 mb-2">
          <span><AiFillMail /></span>
          <p className="ml-3 text-xl">{ contact.email.toUpperCase() }</p>
        </div>
        <div className="flex items-center mt-2 mb-2">
          <span><BsCalendarDate /></span>
          <p className="ml-3 text-xl">
            <Moment format="DD/MM/YYYY">{contact.date}</Moment>
          </p>
        </div>
      </div>
      <div
        className="mt-5 flex justify-between"
      >
        <button type="submit" className="text-green-900" onClick={() => handleCurrentContact(contact.id)}>
          <AiFillEdit />
        </button>
        <button type="submit" className="text-red-600" onClick={() => handleDelete(contact.id)}>
          <BsFillTrashFill />
        </button>
      </div>
    </div>
  );
}

ContactCard.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactCard;
