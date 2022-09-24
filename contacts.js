const fs = require("fs/promises");
const path = require('path');
const { nanoid } = require("nanoid");
var ID = nanoid();

const contactsPath = path.join(__dirname, 'db/contacts.json');
//console.log('contactsPath :>> ', contactsPath);

const updateContacts = async (contacts) => await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async() => {
	//console.log('contactsPath :>> ', contactsPath);
	const contacts = await fs.readFile(contactsPath);
	return JSON.parse(contacts);
}

const getContactById = async(contactId) => {
	const contacts = await listContacts();
	const searchedContact = contacts.find(contact => contact.id === String(contactId));
	return searchedContact || null;
}

const removeContact = async(contactId) => {
	const contacts = await listContacts();
	const id = contacts.findIndex(contact => contact.id === String(contactId));
	if (id === -1) {
		return null;
	}
	const [result] = contacts.splice(id, 1);
	await updateContacts(contacts);
	return result;
}

// const addContact = async(name, email, phone) => {
// 	const contacts = await listContacts();
// 	const ID = nanoid();
// 	console.log('id :>> ', ID);
// 	const newContact = {
// 		id: '89',
// 		name: name,
// 		email: email,
// 		phone: phone,
// 	};
// 	contacts.push(newContact);
// 	await updateContacts(contacts);
// 	return newContact;
// }

const addContact = async(data) => {
	const contacts = await listContacts();
	// const ID = nanoid();
	//console.log('id :>> ', ID);
	const newContact = {
		id: ID,
		...data,
	};
	contacts.push(newContact);
	await updateContacts(contacts);
	return newContact;
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
}