import { HeaderDashboard } from "../../components/HeaderDashboard";
import { useEffect, useState } from 'react';
import { TransactionsProvider } from "../../hooks/useTransactions";
import { Panel } from "../../components/Panel";
import { NewWashModal } from "../../components/NewWashModal";
import { useSession } from "next-auth/client";
import { useRouter } from 'next/router';
import { createServer, Model } from 'miragejs'


createServer({

  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          vehicle: 'Astra',
          type: 'Premium',
          amount: 100,
          createdAt: new Date('2021-02-12 09:00:00'),
        },
        
        {
          id: 2,
          vehicle: 'Gol',
          type: 'Comum',
          amount: 300,
          createdAt: new Date('2020-02-12 09:00:00'),
        },]
    });
  },

  routes() {
    this.namespace = 'api';
    this.get('/transactions', () => {
      return this.schema.all('transaction');
    });


    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);


      return schema.create('transaction', data);
    })
  }
});


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

      <HeaderDashboard onOpenNewTransactionModal={handleOpenNewTransactionModal} />

      <Panel />

      <NewWashModal isOpen={isNewTransactionModal}
        onRequestClose={handleCloseNewTransactionModal}
      />

    </TransactionsProvider>
  );
}


