import { Header } from "../../components/Header";
import { useState } from 'react';
import Modal from 'react-modal';



export default function Dashboard() {
  const [isNewTransactionModal, setIsNewTransactionModal] = useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModal(true);
  }
  function handleCloseNewTransactionModal() {
    setIsNewTransactionModal(false);
  }
  return (
    <>

      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />



    </>
  );
}


