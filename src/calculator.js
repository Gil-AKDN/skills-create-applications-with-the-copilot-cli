#!/usr/bin/env node

'use strict';

/**
 * Supported operations:
 * - addition: +
 * - subtraction: -
 * - multiplication: *, x, X, ×
 * - division: /, ÷
 * - modulo: %
 * - power: ^, **
 * - square root: sqrt, √
 */
const OPERATION_ALIASES = {
  '+': '+',
  '-': '-',
  '*': '*',
  x: '*',
  X: '*',
  '×': '*',
  '/': '/',
  '÷': '/',
  '%': '%',
  '^': '^',
  '**': '^',
  sqrt: 'sqrt',
  '√': 'sqrt'
};

function assertFiniteNumber(value, message) {
  if (!Number.isFinite(value)) {
    throw new Error(message);
  }
}

function modulo(a, b) {
  assertFiniteNumber(a, 'Both operands must be valid numbers.');
  assertFiniteNumber(b, 'Both operands must be valid numbers.');

  if (b === 0) {
    throw new Error('Modulo by zero is not allowed.');
  }

  return a % b;
}

function power(base, exponent) {
  assertFiniteNumber(base, 'Both operands must be valid numbers.');
  assertFiniteNumber(exponent, 'Both operands must be valid numbers.');

  return base ** exponent;
}

function squareRoot(n) {
  assertFiniteNumber(n, 'The operand must be a valid number.');

  if (n < 0) {
    throw new Error('Square root of a negative number is not allowed.');
  }

  return Math.sqrt(n);
}

function calculate(leftOperand, operator, rightOperand) {
  const normalizedOperator = OPERATION_ALIASES[operator];

  if (!normalizedOperator) {
    throw new Error(
      'Unsupported operator. Use one of: +, -, *, /, %, ^, **, sqrt, √, x, X, ×, ÷'
    );
  }

  if (normalizedOperator === 'sqrt') {
    return squareRoot(leftOperand);
  }

  assertFiniteNumber(leftOperand, 'Both operands must be valid numbers.');
  assertFiniteNumber(rightOperand, 'Both operands must be valid numbers.');

  switch (normalizedOperator) {
    case '+':
      return leftOperand + rightOperand;
    case '-':
      return leftOperand - rightOperand;
    case '*':
      return leftOperand * rightOperand;
    case '/':
      if (rightOperand === 0) {
        throw new Error('Division by zero is not allowed.');
      }
      return leftOperand / rightOperand;
    case '%':
      return modulo(leftOperand, rightOperand);
    case '^':
      return power(leftOperand, rightOperand);
    case 'sqrt':
      return squareRoot(leftOperand);
    default:
      throw new Error('Unable to perform the requested operation.');
  }
}

function printUsage() {
  console.error('Usage: node src/calculator.js <number> <operator> <number>');
  console.error('   or: node src/calculator.js <sqrt|√> <number>');
  console.error('Example: node src/calculator.js 8 "*" 4');
  console.error('Example: node src/calculator.js sqrt 81');
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 2) {
    const [operator, input] = args;

    if (OPERATION_ALIASES[operator] !== 'sqrt') {
      printUsage();
      process.exitCode = 1;
      return;
    }

    try {
      console.log(squareRoot(Number(input)));
    } catch (error) {
      console.error(error.message);
      printUsage();
      process.exitCode = 1;
    }

    return;
  }

  if (args.length !== 3) {
    printUsage();
    process.exitCode = 1;
    return;
  }

  try {
    const [leftInput, operator, rightInput] = args;
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
  calculate,
  modulo,
  power,
  squareRoot
};
