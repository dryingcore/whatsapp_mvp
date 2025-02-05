function extractData(message: string) {
  const regex = /^R\$\s*(\d+(?:[.,]\d{2})?)\s+com\s+(\w+)$/;
  const match = message.match(regex);

  if (!match) return null;

  return {
    amount: parseFloat(match[1].replace(',', '.')),
    category: match[2].toLowerCase(),
  };
}

// Testes
console.log(extractData('R$15 com roupas')); // { amount: 15, category: 'roupas' }
console.log(extractData('R$ 30.50 com comida')); // { amount: 30.5, category: 'comida' }
console.log(extractData('R$100,75 com lazer')); // { amount: 100.75, category: 'lazer' }
console.log(extractData('R$10.00 com gasolina')); // { amount: 10, category: 'gasolina' }
console.log(extractData('15 com roupas')); // null (inválido)
console.log(extractData('R$15,00comroupas')); // null (inválido)
