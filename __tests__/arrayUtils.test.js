import fc from 'fast-check';
import {
  removeDuplicates, sortNumbers, sumPositiveNumbers, groupByParity, findCommonElements,
} from '../arrayUtils.js';

describe('array utils test', () => {
  test('removes duplicates', () => {
    fc.assert(
      fc.property(fc.array(fc.integer()), (array) => {
        const uniqueArray = [];
        array.forEach((num) => {
          if (!uniqueArray.includes(num)) {
            uniqueArray.push(num);
          }
        });
        expect(removeDuplicates(array)).toEqual(uniqueArray);
      })
    )
  });

  test('should sort numbers from smallest to biggest', () => {
    fc.assert(
      fc.property(fc.array(fc.integer()), (array) => {
        const sortedArray = array.sort((a, b) => a - b);
        expect(sortNumbers(array)).toEqual(sortedArray);
      }),
    );
  });

  test('sums only positive numbers', () => {
    fc.assert(
      fc.property(fc.array(fc.integer()), (array) => {
        const positiveNumbers = array.filter((num) => num >= 0);
        const sum = positiveNumbers.reduce((acc, num) => acc + num, 0);
        expect(sumPositiveNumbers(array)).toBe(sum);
      }),
    );
  });

  test('separates even and odd numbers', () => {
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

  test('finds intersection', () => {
    fc.assert(
      fc.property(fc.array(fc.integer()), fc.array(fc.integer()), (array1, array2) => {
        const array = array1.concat(array2);
        expect(findCommonElements(array, array2)).toEqual(array2);
      }),
    );
  });
});
