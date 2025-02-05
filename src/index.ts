import Prompt from './utils/prompt';

async function main() {
  while (true) {
    await Prompt.askForTransaction();
  }
}

main();
