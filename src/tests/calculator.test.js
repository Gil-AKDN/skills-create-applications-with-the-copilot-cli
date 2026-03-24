'use strict';

const { calculate, modulo, power, squareRoot } = require('../calculator');

describe('calculate', () => {
  describe('addition', () => {
    test('adds two positive numbers', () => {
      expect(calculate(2, '+', 3)).toBe(5);
    });

    test('adds negative and decimal numbers', () => {
      expect(calculate(-1.5, '+', 4)).toBe(2.5);
    });
  });

  describe('subtraction', () => {
    test('subtracts two numbers', () => {
      expect(calculate(10, '-', 4)).toBe(6);
    });

    test('returns a negative result when appropriate', () => {
      expect(calculate(3, '-', 8)).toBe(-5);
    });
  });

  describe('multiplication', () => {
    test('multiplies two numbers', () => {
      expect(calculate(45, '*', 2)).toBe(90);
    });

    test('supports x and X aliases', () => {
      expect(calculate(6, 'x', 7)).toBe(42);
      expect(calculate(6, 'X', 7)).toBe(42);
    });

    test('supports the multiplication symbol alias', () => {
      expect(calculate(9, '×', 3)).toBe(27);
    });
  });

  describe('division', () => {
    test('divides two numbers', () => {
      expect(calculate(20, '/', 5)).toBe(4);
    });

    test('supports the division symbol alias', () => {
      expect(calculate(20, '÷', 5)).toBe(4);
    });

    test('returns decimal results when needed', () => {
      expect(calculate(7, '/', 2)).toBe(3.5);
    });

    test('throws on division by zero', () => {
      expect(() => calculate(8, '/', 0)).toThrow(
        'Division by zero is not allowed.'
      );
    });
  });

  describe('modulo', () => {
    test('returns the remainder of two numbers', () => {
      expect(calculate(10, '%', 3)).toBe(1);
      expect(modulo(10, 3)).toBe(1);
    });

    test('returns zero when the left operand is evenly divisible', () => {
      expect(calculate(10, '%', 5)).toBe(0);
    });

    test('throws on modulo by zero', () => {
      expect(() => calculate(8, '%', 0)).toThrow(
        'Modulo by zero is not allowed.'
      );
    });
  });

  describe('power', () => {
    test('raises a base to an exponent', () => {
      expect(calculate(2, '^', 5)).toBe(32);
      expect(calculate(2, '**', 5)).toBe(32);
      expect(power(3, 4)).toBe(81);
    });

    test('supports zero and negative exponents', () => {
      expect(calculate(9, '^', 0)).toBe(1);
      expect(calculate(2, '^', -2)).toBe(0.25);
    });
  });

  describe('square root', () => {
    test('returns the square root of a number', () => {
      expect(calculate(81, 'sqrt')).toBe(9);
      expect(calculate(81, '√')).toBe(9);
      expect(squareRoot(49)).toBe(7);
    });

    test('throws on negative numbers', () => {
      expect(() => calculate(-9, 'sqrt')).toThrow(
        'Square root of a negative number is not allowed.'
      );
    });

    test('returns zero for zero input', () => {
      expect(calculate(0, 'sqrt')).toBe(0);
    });
  });

  describe('image examples', () => {
    test('matches the basic operations shown in the example image', () => {
      expect(calculate(2, '+', 3)).toBe(5);
      expect(calculate(10, '-', 4)).toBe(6);
      expect(calculate(45, '*', 2)).toBe(90);
      expect(calculate(20, '/', 5)).toBe(4);
    });

    test('matches the extended operations shown in the example image', () => {
      expect(calculate(5, '%', 2)).toBe(1);
      expect(calculate(2, '^', 3)).toBe(8);
      expect(calculate(16, '√')).toBe(4);
    });
  });

  describe('input validation', () => {
    test('throws on unsupported operators', () => {
      expect(() => calculate(8, 'log', 2)).toThrow(
        'Unsupported operator. Use one of: +, -, *, /, %, ^, **, sqrt, √, x, X, ×, ÷'
      );
    });

    test('throws when the left operand is not a valid number', () => {
      expect(() => calculate(Number.NaN, '+', 2)).toThrow(
        'Both operands must be valid numbers.'
      );
    });

    test('throws when the right operand is not a valid number', () => {
      expect(() => calculate(2, '+', Number.POSITIVE_INFINITY)).toThrow(
        'Both operands must be valid numbers.'
      );
    });

    test('throws when the square root operand is not a valid number', () => {
      expect(() => squareRoot(Number.NaN)).toThrow(
        'The operand must be a valid number.'
      );
    });
  });
});
