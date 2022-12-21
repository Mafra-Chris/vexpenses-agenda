import Contacts from './components/Contacts/Contacts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Header, AppContainer, Title, AddContact, Input } from './GlobalStyle';
import Modal from 'react-modal';
import { useState } from 'react';
import Form from './components/Form/Form';
function App() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const modalStyles = {
    overlay: {
      backgroundColor: 'rgb(37 37 37 / 75%)',
    },
    content: {
      inset: '20px',
    },
  };
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <AppContainer id="App" className="App">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add contact modal"
        style={modalStyles}
        ariaHideApp={false}
      >
        <Form type="create"></Form>
      </Modal>
      <Header>
        <Title>Agenda</Title>
        <AddContact onClick={openModal}>
          <FontAwesomeIcon icon={faUserPlus} /> Adicionar contato
        </AddContact>
      </Header>
      <Contacts></Contacts>
    </AppContainer>
  );
}

export default App;
