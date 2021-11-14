import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/GlobalStyles";
import Modal from "react-modal";
import { useState } from "react";

Modal.setAppElement("#root");

export function App() {
  const [isNewTransactionModalIsOpen, setIsNewTransactionModalIsOpen] =
    useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalIsOpen(true);
  }
  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalIsOpen(false);
  }
  return (
    <>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />
      <GlobalStyle />

      <Modal
        isOpen={isNewTransactionModalIsOpen}
        onRequestClose={handleCloseNewTransactionModal}
      >
        <h2>Cadastrar transação</h2>
      </Modal>
    </>
  );
}
