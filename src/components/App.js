import React, { Component } from 'react';
import ContactsForm from './ContactsForm';
import ContactsList from './ContactsList';
import SectionBlock from './Section';
import ContactsFilter from './ContactsFilter';

import { v4 as uuidv4 } from 'uuid';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', phone: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', phone: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', phone: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', phone: '227-91-26' },
    ],
    nameFilter: '',
  };

  addContact = ({ name, number }) => {
    if (this.state.contacts.find(contact => contact.name === name)) {
      alert(`${name} is in the list of your contacts`);
      return;
    }
    const contact = {
      id: uuidv4(),
      name,
      number,
    };
    this.setState(state => {
      return { contacts: [...state.contacts, contact] };
    });
  };

  filterContactList = () => {
    return this.state.contacts.filter(item =>
      item.name.toLowerCase().includes(this.state.nameFilter.toLowerCase()),
    );
  };

  deleteContact = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(e => e.id !== id),
      };
    });
  };

  contactsFilterInput = inputValue => {
    this.setState({
      nameFilter: inputValue,
    });
  };

  render() {
    const { nameFilter } = this.state;
    const visibleContacts = this.filterContactList();
    return (
      <>
        <SectionBlock title="Phonebook">
          <ContactsForm addContact={this.addContact} />
          <ContactsFilter
            value={nameFilter}
            OnInputFilter={this.contactsFilterInput}
          />
          <ContactsList
            items={visibleContacts}
            onDeleteContact={this.deleteContact}
          />
        </SectionBlock>
      </>
    );
  }
}
