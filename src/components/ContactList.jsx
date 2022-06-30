import React from 'react';
import { useSelector } from 'react-redux';
import ContactCard from './ContactCard';

function ContactList() {
  const { contacts } = useSelector((state) => state.Contact);
  return (
    <div>
      {
        contacts.length === 0 ? (
          <h1 className="text-lg md:text-2xl text-center mt-2">No Contacts Present</h1>
        ) : (
          <div className="">
            {
              contacts.map((contact) => <ContactCard key={contact.id} contact={contact} />)
            }
          </div>
        )
      }
    </div>
  );
}

export default ContactList;
