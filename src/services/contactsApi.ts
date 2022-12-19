import axios from 'axios'
import { Contact } from '../ts/interfaces/contacts'

const BASE_URL = 'http://localhost:3000'

export async function getContacts() {
  try {
    let contacts: Contact[]
    const response = await axios.get(`${BASE_URL}/contacts`)
    contacts = response.data

    return contacts
  } catch (error) {
    throw new Error(
      'Erro ao buscar contatos!'
    )
  }
}
export async function getContact(id: number) {
  try {
    let contact: Contact
    const response = await axios.get(`${BASE_URL}/contacts/${id}`)
    contact = response.data

    return contact
  } catch (error) {
    throw new Error(
      'Erro ao buscar contato!'
    )
  }
}
export async function postContact(contact: Contact) {
  try {

    await axios.post(`${BASE_URL}/contacts/`, contact)

  } catch (error) {
    throw new Error(
      'Erro ao salvar contato!'
    )
  }
}
export async function editContact(contact: Contact) {
  try {

    await axios.put(`${BASE_URL}/contacts/${contact.id}`, contact)

  } catch (error) {
    throw new Error(
      'Erro ao editar contato!'
    )
  }
}
export async function deleteContact(id: number) {
  try {
    await axios.delete(`${BASE_URL}/contacts/${id}`)

  } catch (error) {
    throw new Error(
      'Erro ao deletar contato!'
    )
  }
}