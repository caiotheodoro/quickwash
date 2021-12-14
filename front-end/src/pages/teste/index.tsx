import { HeaderDashboard } from "../../components/HeaderDashboard";
import { useEffect, useState } from 'react';
import { TransactionsProvider } from "../../hooks/useTransactions";
import { Panel } from "../../components/Panel";
import { NewWashModal } from "../../components/NewWashModal";
import { getSession, useSession } from "next-auth/client";
import { useRouter } from 'next/router';
import { createServer, Model } from 'miragejs'
import { Button } from "@mui/material";
import { NewWashTest } from "../../components/NewWashTest";





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

      <Button onClick={handleOpenNewTransactionModal} id="testModal">
          Abrir modal
      </Button>


      <NewWashTest isOpen={isNewTransactionModal}
        onRequestClose={handleCloseNewTransactionModal} />
      
    </TransactionsProvider>
  );
}
