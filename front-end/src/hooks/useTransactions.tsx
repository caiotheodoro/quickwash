import { Children, createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";



interface TransactionsTableProps {
    id: number;
    vehicle: string;
    amount: number;
    type: string;
    createdAt: string;
    plate: string,
    observation: string,
    scheduleDate: Date,
    coupon: string,
    payment: 'card' | 'cash',
    vehicleType: 'Carro' | 'Moto' | 'Caminhão' | 'Outros',

}



type TransactionInput = Omit<TransactionsTableProps, "id" | 'createdAt'>;


interface TransactionsProviderProps {
    children: ReactNode;
}

interface TransactionsContextData {
    transactions: TransactionsTableProps[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
    retrieveTransaction: (userId: string) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<TransactionsTableProps[]>([]);
    const [soma,setSoma] = useState(0);



    async function createTransaction(transactionInput: TransactionInput) {

        
        const response = await api.post('/subscribe', {...transactionInput, createdAt: new Date().toISOString()});
        
        console.log(response);
       // const transct : TransactionsTableProps = response.data.transaction;

      //  setTransactions([
       //     ...transactions,
       //     transct
       // ]);
    }

    async function retrieveTransaction(userId: string) {

        const response = await api.get('/subscribe');
        console.log(response);
        console.log(userId)
  
    }

    return (
        <TransactionsContext.Provider value={{ transactions, createTransaction, retrieveTransaction }}>
            {children}
        </TransactionsContext.Provider>
    );
}

export function useTransactions() {
    const context = useContext(TransactionsContext);

    return context;
}