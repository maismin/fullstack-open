import React from 'react'
import Contact from './Contact'

const Contacts = ({ contacts, removeContact }) => {
  const result = contacts.map(contact => 
  <Contact 
    key={contact.name} 
    contact={contact} 
    removeContact={removeContact} />)

  return (
    <div>
      {result}
    </div>
  )
}

export default Contacts