import { Console } from "console";
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

interface Get {
      dados: any;
      data: {
        amount: number;
        vehicle: string;
        type: string,
        createdAt: Date,
        plate: string,
        observation: string,
        scheduleDate: Date,
        payment: string,
      }[]

  }

  

type TransactionInput = Omit<TransactionsTableProps, "id" | 'createdAt'>;


interface TransactionsProviderProps {
    children: ReactNode;
}

interface TransactionsContextData {
    transactions: TransactionsTableProps[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
    retrieveTransactions: () => Promise<Get>;
}

const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<TransactionsTableProps[]>([]);
    const [soma,setSoma] = useState(0);
    
    useEffect(() => {
        (async () => {
            var teste = 'teste'
            if(location.href.split('/')[3] != teste){
                const response = await api.get('/subscribe');
                console.log(response.data);
                setTransactions(response.data);

        }
        })();
    }, []);


    async function createTransaction(transactionInput: TransactionInput) {

        
        const response = await api.post('/subscribe', {...transactionInput, createdAt: new Date().toISOString()});
        
        const responseRetrieve = await api.get('/subscribe');
       
        setTransactions(responseRetrieve.data);
       // const transct : TransactionsTableProps = response.data.transaction;

      //  setTransactions([
       //     ...transactions,
       //     transct
       // ]);
    }

    async function retrieveTransactions() {

        
        
        const responseRetrieve = await api.get('/subscribe');
       
        return responseRetrieve.data;
       // const transct : TransactionsTableProps = response.data.transaction;

      //  setTransactions([
       //     ...transactions,
       //     transct
       // ]);
    }

    

    return (
        <TransactionsContext.Provider value={{ transactions, createTransaction,retrieveTransactions }}>
            {children}
        </TransactionsContext.Provider>
    );
}

export function useTransactions() {
    const context = useContext(TransactionsContext);

    return context;
}