import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/GlobalStyles";
import { useState } from "react";
import { NewTransactionModal } from "./components/NewTransactionModal";
import Modal from "react-modal";
import { TransactionsProvider } from "./components/hooks/useTransactions";

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
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />
      <GlobalStyle />
      <NewTransactionModal
        isOpen={isNewTransactionModalIsOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
    </TransactionsProvider>
  );
}
