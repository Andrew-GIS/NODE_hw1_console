// import { program } from 'commander';
//const { program } = require("commander");
// import contacts from '../hw1_console/contacts.js';

const argv  = require("yargs").argv;
// const { hideBin } = require("yargs/helpers");
const contacts = require('./contacts');

// TODO: рефакторить
const invokeAction = async({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.log(allContacts);
      break;

    case "get":
      const searchedContact = await contacts.getContactById(id);
      console.log(searchedContact);
      break;

    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      console.log(newContact);
      break;

    case "remove":
      const removeContact = await contacts.removeContact(id);
      console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

// const arr = hideBin(process.argv);
// const {argv} = yargs(arr);
invokeAction(argv);