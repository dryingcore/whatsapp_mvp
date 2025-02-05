import fs from 'fs';
import path from 'path';

const FILE_PATH = path.resolve('transactions.json');

export default class TransactionService {
  static loadTransactions(): { amount: number; category: string }[] {
    if (!fs.existsSync(FILE_PATH)) return [];

    const data = fs.readFileSync(FILE_PATH, 'utf-8');
    return JSON.parse(data);
  }

  static saveTransaction(transaction: { amount: number; category: string }) {
    const transactions = this.loadTransactions();
    transactions.push(transaction);

    fs.writeFileSync(FILE_PATH, JSON.stringify(transactions, null, 2), 'utf-8');
  }

  static getSummary() {
    const transactions = this.loadTransactions();
    if (transactions.length === 0) return 'Nenhuma transação registrada.';

    const total = transactions.reduce((sum, t) => sum + t.amount, 0);
    const categoryTotals = transactions.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

    const insights = Object.entries(categoryTotals)
      .map(([category, amount]) => `- ${category}: R$${amount.toFixed(2)}`)
      .join('\n');

    return `Resumo de gastos:\nTotal: R$${total.toFixed(2)}\n${insights}`;
  }
}
