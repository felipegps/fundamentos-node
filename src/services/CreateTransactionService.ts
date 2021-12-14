import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {

  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {

    if (type != 'income' && type != 'outcome') {
      throw Error('Type can be -income or -outcome.');
    }

    if(type == 'outcome') {
      const balance = this.transactionsRepository.getBalance();

      if(balance.total - value < 0) {
        throw Error('Insuficient value');
      }
    }

    const transaction = this.transactionsRepository.create({ title, value, type });

    return transaction;

  }
}

export default CreateTransactionService;
