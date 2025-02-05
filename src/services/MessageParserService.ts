export default class MessageParserService {
  private static readonly MESSAGE_REGEX = /^R\$\s*(\d+(?:[.,]\d{2})?)\s+com\s+(\w+)$/;

  static parse(message: string) {
    const match = message.match(this.MESSAGE_REGEX);

    if (!match) return null;

    return {
      amount: parseFloat(match[1].replace(',', '.')),
      category: match[2].toLowerCase(),
    };
  }
}
