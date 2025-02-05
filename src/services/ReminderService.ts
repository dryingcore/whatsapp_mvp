import fs from 'fs';
import path from 'path';

const FILE_PATH = path.resolve('reminders.json');

type Reminder = { name: string; date: string };

export default class ReminderService {
  static loadReminders(): Reminder[] {
    if (!fs.existsSync(FILE_PATH)) return [];

    const data = fs.readFileSync(FILE_PATH, 'utf-8');
    return JSON.parse(data);
  }

  static saveReminder(reminder: Reminder) {
    const reminders = this.loadReminders();
    reminders.push(reminder);

    fs.writeFileSync(FILE_PATH, JSON.stringify(reminders, null, 2), 'utf-8');
  }

  static getUpcomingBirthdays(): string {
    const reminders = this.loadReminders();
    if (reminders.length === 0) return 'Nenhum aniversário registrado.';

    const today = new Date();
    const upcoming = reminders.filter(r => {
      const [day, month] = r.date.split('/').map(Number);
      const birthday = new Date(today.getFullYear(), month - 1, day);
      return birthday >= today;
    });

    if (upcoming.length === 0) return 'Nenhum aniversário próximo.';

    return `Próximos aniversários:\n${upcoming.map(r => `🎂 ${r.name} - ${r.date}`).join('\n')}`;
  }
}
