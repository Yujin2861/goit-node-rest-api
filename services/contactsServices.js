const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(5),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (id, { name, email, phone }) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) return null;

  contacts[index] = { name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const newContacts = contacts.findIndex((item) => item.id === id);

  if (newContacts === -1) {
    return null;
  }

  const deleteContact = contacts[newContacts];
  contacts.splice(newContacts, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  console.log("Contact have been deleted");
  return deleteContact;

};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};