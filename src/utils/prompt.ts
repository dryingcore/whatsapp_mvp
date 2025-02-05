import inquirer from 'inquirer';
import MessageParserService from '../services/MessageParserService'; // Lógica de extração
import TransactionService from '../services/TransactionService'; // Armazenamento em JSON

export default class Prompt {
  static async askForTransaction() {
    const response = await inquirer.prompt([
      {
        type: 'input',
        name: 'message',
        message: "Digite o valor e a categoria no formato: R$15 com roupas ou 'resumo' para ver gastos",
        validate: (input: string) => {
          if (input.toLowerCase() === 'resumo') return true;
          return MessageParserService.parse(input) ? true : "Formato inválido! Use 'R$15 com roupas'";
        },
      },
    ]);

    if (response.message.toLowerCase() === 'resumo') {
      console.log(TransactionService.getSummary());
      return;
    }

    const transaction = MessageParserService.parse(response.message);
    if (transaction) {
      TransactionService.saveTransaction(transaction);
      console.log('✅ Transação salva com sucesso!');
    }
  }
}
