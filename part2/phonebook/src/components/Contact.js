import React from 'react'

const Contact = ({ contact, removeContact }) => 
  <div>{contact.name} {contact.number} 
    <button onClick={() => removeContact(contact)}>
      delete
    </button>
  </div>

export default Contact