import { Header } from "../../components/Header";
import { useState } from 'react';
import { TransactionsProvider } from "../../hooks/useTransactions";
import { Panel } from "../../components/Panel";
import { NewWashModal } from "../../components/NewWashModal";


export default function Dashboard() {
  const [isNewTransactionModal, setIsNewTransactionModal] = useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModal(true);
  }
  function handleCloseNewTransactionModal() {
    setIsNewTransactionModal(false);
  }
  return (
    <TransactionsProvider>

      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />

      <Panel />

      <NewWashModal isOpen={isNewTransactionModal}
        onRequestClose={handleCloseNewTransactionModal}
      />

    </TransactionsProvider>
  );
}


