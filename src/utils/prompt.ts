import ReminderService from './../services/ReminderService';
import inquirer from 'inquirer';
import MessageParserService from '../services/MessageParserService';
import TransactionService from '../services/TransactionService';

export default class Prompt {
  static async askForTransactionOrReminder() {
    const response = await inquirer.prompt([
      {
        type: 'input',
        name: 'message',
        message: "Digite: 'R$15 com roupas' para gastos, 'aniversário' para lembretes ou 'resumo' para ver gastos",
        validate: (input: string) => {
          if (['resumo', 'aniversário'].includes(input.toLowerCase())) return true;
          return MessageParserService.parse(input) ? true : "Formato inválido! Use 'R$15 com roupas' ou 'aniversário'.";
        },
      },
    ]);

    if (response.message.toLowerCase() === 'resumo') {
      console.log(TransactionService.getSummary());
      return;
    }

    if (response.message.toLowerCase() === 'aniversário') {
      await Prompt.askForBirthday();
      return;
    }

    const transaction = MessageParserService.parse(response.message);
    if (transaction) {
      TransactionService.saveTransaction(transaction);
      console.log('✅ Transação salva com sucesso!');
    }
  }

  static async askForBirthday() {
    const { name, date } = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Digite o nome da pessoa:',
      },
      {
        type: 'input',
        name: 'date',
        message: 'Digite a data de aniversário (DD/MM):',
        validate: (input: string) => {
          return /^\d{2}\/\d{2}$/.test(input) ? true : 'Formato inválido! Use DD/MM (ex: 25/12)';
        },
      },
    ]);

    ReminderService.saveReminder({ name, date });
    console.log('🎉 Lembrete de aniversário salvo!');
  }
}
