import fc from 'fast-check';
import {
  removeDuplicates, sortNumbers, sumPositiveNumbers, groupByParity, findCommonElements,
} from '../arrayUtils.js';

describe('array utils test', () => {
  test('removeDuplicates removes duplicates', () => {
    fc.assert(
      fc.property(fc.array(fc.integer()), (array) => {
        const uniqueArray = [...new Set(array)];
        expect(removeDuplicates(array)).toEqual(uniqueArray);
      })
    )
  });

  test('sortNumbers should sort numbers from smallest to biggest', () => {
    fc.assert(
      fc.property(fc.array(fc.integer()), (array) => {
        const sortedArray = [...array].sort((a, b) => a - b);
        expect(sortNumbers(array)).toEqual(sortedArray);
      }),
    );
  });

  test('sumPositiveNumbers sums only positive numbers', () => {
    fc.assert(
      fc.property(fc.array(fc.integer()), (array) => {
        const positiveNumbers = array.filter((num) => num >= 0);
        const sum = positiveNumbers.reduce((acc, num) => acc + num, 0);
        expect(sumPositiveNumbers(array)).toBe(sum);
      }),
    );
  });

  test('groupByParity separates even and odd numbers', () => {
    fc.assert(
      fc.property(fc.array(fc.integer()), (array) => {
        const evenNumbers = array.filter((num) => num % 2 === 0);
        const oddNumbers = array.filter((num) => num % 2 !== 0);
        const { even, odd } = groupByParity(array);
        expect(even).toEqual(evenNumbers);
        expect(odd).toEqual(oddNumbers);
      }),
    );
  });

  test('findCommonElements finds common elements', () => {
    fc.assert(
      fc.property(fc.array(fc.integer()), fc.array(fc.integer()), (array1, array2) => {
        const commonElements = array1.filter((num) => array2.includes(num));
        expect(findCommonElements(array1, array2)).toEqual(commonElements);
      }),
    );
  });
});
