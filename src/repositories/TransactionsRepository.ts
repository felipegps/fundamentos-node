import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {

    const transactions = this.transactions;

    const listOutCome = transactions.filter(transaction => transaction.type == 'outcome');
    const listInCome = transactions.filter(transaction => transaction.type == 'income');

    let totalOutCome = 0;
    for (let i of listOutCome) {
      totalOutCome += i.value;
    }

    let totalInCome = 0;
    for (let i of listInCome) {
      totalInCome += i.value;
    }

    return {income: totalInCome, outcome: totalOutCome, total: totalInCome - totalOutCome};

  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
