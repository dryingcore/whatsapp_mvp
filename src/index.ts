import Prompt from './utils/prompt';
import ReminderService from './services/ReminderService';

async function main() {
  while (true) {
    await Prompt.askForTransactionOrReminder();

    // Verifica aniversários futuros
    console.log(ReminderService.getUpcomingBirthdays());
  }
}

main();
