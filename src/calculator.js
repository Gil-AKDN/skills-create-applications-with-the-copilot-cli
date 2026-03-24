#!/usr/bin/env node

'use strict';

/**
 * Supported operations:
 * - addition: +
 * - subtraction: -
 * - multiplication: *, x, X, ×
 * - division: /, ÷
 */
const OPERATION_ALIASES = {
  '+': '+',
  '-': '-',
  '*': '*',
  x: '*',
  X: '*',
  '×': '*',
  '/': '/',
  '÷': '/'
};

function calculate(leftOperand, operator, rightOperand) {
  const normalizedOperator = OPERATION_ALIASES[operator];

  if (!normalizedOperator) {
    throw new Error(
      'Unsupported operator. Use one of: +, -, *, /, x, X, ×, ÷'
    );
  }

  if (!Number.isFinite(leftOperand) || !Number.isFinite(rightOperand)) {
    throw new Error('Both operands must be valid numbers.');
  }

  if (normalizedOperator === '/' && rightOperand === 0) {
    throw new Error('Division by zero is not allowed.');
  }

  switch (normalizedOperator) {
    case '+':
      return leftOperand + rightOperand;
    case '-':
      return leftOperand - rightOperand;
    case '*':
      return leftOperand * rightOperand;
    case '/':
      return leftOperand / rightOperand;
    default:
      throw new Error('Unable to perform the requested operation.');
  }
}

function printUsage() {
  console.error('Usage: node src/calculator.js <number> <operator> <number>');
  console.error('Example: node src/calculator.js 8 "*" 4');
}

function main() {
  const [leftInput, operator, rightInput] = process.argv.slice(2);

  if (process.argv.slice(2).length !== 3) {
    printUsage();
    process.exitCode = 1;
    return;
  }

  try {
    const result = calculate(Number(leftInput), operator, Number(rightInput));
    console.log(result);
  } catch (error) {
    console.error(error.message);
    printUsage();
    process.exitCode = 1;
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  calculate
};
