import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../../services/api";

type User = {
  id: string;
  title: string;
  amount: number;
  type: string;
  category: string;
  createAt: string;
};

type TransactionInput = {
  title: string;
  amount: number;
  type: string;
  category: string;
};

interface TransactionsContextProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: User[];
  createTransactions: (transaction: TransactionInput) => Promise<void>;
}

export const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsContextProps) {
  const [transactions, setTransactions] = useState<User[]>([]);

  useEffect(() => {
    api
      .get("/transactions")
      .then((response) => setTransactions(response.data.tarnsactions));
  }, []);

  async function createTransactions(transactionInput: TransactionInput) {
    const response = await api.post("/transactions", {
      ...transactionInput,
      createAt: new Date(),
    });
    const { tarnsaction } = response.data;
    setTransactions([...transactions, tarnsaction]);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransactions }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  return context;
}
