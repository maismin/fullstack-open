import React, { useState, useEffect } from 'react'
import Contacts from './components/Contacts'
import AddContactForm from './components/AddContactForm'
import SearchBar from './components/SearchBar'
import Notification from './components/Notification'
import phonebook from './services/phonebook'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')
  const [ filteredPersons, setFilterPersons ] = useState(persons)
  const [ notification, setNotification ] = useState(null)
  const [ error, setError ] = useState(null)

  const fetchData = () => {
    phonebook
      .getAll()
      .then(contacts => {
        setPersons(contacts)
        setFilterPersons(contacts)
      })
  }

  useEffect(fetchData, [])

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterName = (event) => {
    setFilterName(event.target.value)
    if (event.target.value === '') {
      setFilterPersons(persons)
    } else {
      setFilterPersons(filteredPersons.filter( person => 
        person['name'].toLowerCase().includes(event.target.value.toLowerCase())))  
    }
  }

  const handleNotification = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const handleError = (message) => {
    setError(message)
    setTimeout(() => {
      setError(null)
    }, 3000)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const existingContact = persons.filter( person => 
      person['name'].toLowerCase() === (newName.toLowerCase()))

    if (existingContact.length === 1) {
      const existingPerson = existingContact[0]
      const result = window.confirm(
        `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`)

      if (result) {
        phonebook
          .update(existingPerson.id, {...existingPerson, number: newNumber})
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
            setFilterPersons(filteredPersons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
            handleNotification(`Updated ${existingPerson.name}'s number`)
          })
          .catch(error => {
            console.log(error)
            const newContacts = persons.filter(person => person.id !== existingPerson.id)
            setPersons(newContacts)
            setFilterPersons(newContacts.filter(person => 
              person['name'].toLowerCase().includes(filterName.toLowerCase())))
            handleError(`Information of ${existingPerson.name} has already been removed from server`)
          })
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      } 

      phonebook
        .create(newPerson)
        .then(contact => {
          const newPersons = persons.concat(contact)
          setPersons(newPersons)
          setFilterPersons(newPersons)
          setNewName('')
          setNewNumber('')
          handleNotification(`Added ${newPerson.name}`)
        })  
    }
  }

  const deletePerson = contact => {
    const result = window.confirm(`Delete ${contact.name} ?`)
    if (result) {
      phonebook
        .remove(contact.id)
        .then(data => {
          const newContacts = persons.filter(person => person.id !== contact.id)
          setPersons(newContacts)
          setFilterPersons(newContacts.filter(person => 
            person['name'].toLowerCase().includes(filterName.toLowerCase())))
          handleError(`Deleted ${contact.name}`)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={error} classType='error' />
      <Notification message={notification} classType='success'/>
      <SearchBar 
        filterName={filterName} 
        handleFilterName={handleFilterName} />

      <h3>add a new</h3>
      <AddContactForm 
        newName={newName} 
        handleNewName={handleNewName}
        newNumber={newNumber} 
        handleNewNumber={handleNewNumber} 
        addPerson={addPerson} />

      <h3>Numbers</h3>
      <Contacts 
        contacts={filteredPersons} 
        removeContact={deletePerson}/>
    </div>
  )
}

export default App