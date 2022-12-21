import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Name, Number, Card, Letter, EditButton, DeleteButton } from './Style';
import { useEffect, useState } from 'react';
import { Contact } from '../../ts/interfaces/contacts';
import { deleteContact, getContacts } from '../../services/contactsApi';
import Modal from 'react-modal';
import {
  Button,
  ButtonSecondary,
  ModalButtons,
  ModalTitle,
  Input,
  List,
} from '../../GlobalStyle';
import Form from '../Form/Form';
export default function Contacts() {
  const [contactsList, setContactsList] = useState<Contact[]>([]);
  const [searchList, setSearchList] = useState<Contact[]>([]);
  const getContactsList = async () => {
    try {
      setContactsList(await getContacts());
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const deleteModalStyles = {
    overlay: {
      backgroundColor: 'rgb(37 37 37 / 75%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: { inset: 'auto', margin: 'auto' },
  };
  const modalStyles = {
    overlay: {
      backgroundColor: 'rgb(37 37 37 / 75%)',
    },
    content: {
      inset: '20px',
    },
  };
  const [deleteModalIsOpen, setIsDeleteOpen] = useState(false);
  const [viewModalIsOpen, setIsViewOpen] = useState(false);
  const [editModalIsOpen, setIsEditOpen] = useState(false);
  const [currentId, setCurrent] = useState<number>(0);
  function openDeleteModal(id: number) {
    setCurrent(id);
    setIsDeleteOpen(true);
  }
  function closeDeleteModal() {
    setIsDeleteOpen(false);
  }
  async function delContact() {
    try {
      await deleteContact(currentId);
      getContactsList();
      closeDeleteModal();
    } catch (error: any) {
      console.log(error.message);
    }
  }

  function searchContact(name: string) {
    name = name.toLowerCase();

    for (let i = 0; i < searchList.length; i++) {
      if (!searchList[i].name.toLowerCase().includes(name)) {
        searchList.splice(i, 1);
      }
    }
  }
  useEffect(() => {
    getContactsList();
  }, []);
  return (
    <div>
      <Modal
        isOpen={deleteModalIsOpen}
        onRequestClose={closeDeleteModal}
        contentLabel="Delete Contact Modal"
        style={deleteModalStyles}
        ariaHideApp={false}
      >
        <ModalTitle>Tem certeza que deseja apagar este contato?</ModalTitle>
        <ModalButtons>
          <ButtonSecondary onClick={closeDeleteModal}>Não</ButtonSecondary>
          <Button onClick={delContact}>Sim</Button>
        </ModalButtons>
      </Modal>

      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={() => setIsEditOpen(false)}
        contentLabel="Edit Contact Modal"
        style={modalStyles}
        ariaHideApp={false}
      >
        <Form type="edit" id={currentId}></Form>
      </Modal>
      <Modal
        isOpen={viewModalIsOpen}
        onRequestClose={() => setIsViewOpen(false)}
        contentLabel="View Contact Modal"
        style={modalStyles}
        ariaHideApp={false}
      >
        <Form type="view" id={currentId}></Form>
      </Modal>
      <Input type="text" placeholder="Buscar contato" />
      <List>
        {contactsList.map((element) => {
          return (
            <Card key={element.id}>
              <div
                onClick={() => {
                  if (element.id) {
                    setCurrent(element.id);
                    setIsViewOpen(true);
                  }
                }}
              >
                <Name>{element.name}</Name>
                <Number>{element.phonenumbers[0].phone}</Number>
              </div>

              <div>
                <EditButton
                  onClick={() => {
                    if (element.id) {
                      setCurrent(element.id);
                      setIsEditOpen(true);
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </EditButton>
                <DeleteButton
                  onClick={() => {
                    if (element.id) {
                      openDeleteModal(element.id);
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </DeleteButton>
              </div>
            </Card>
          );
        })}
      </List>
    </div>
  );
}
