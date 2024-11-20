import { SortOrder } from "../types";

/**
 * Sorts a collection by a specific value returned by the iteratee function
 * @param iteratee the iteratee which returns the value to sort by
 * @param sortOrder the order to sort the collection by (1 = ascending, -1 = descending)
 * @param collection collection to iterate over
 * @returns the sorted collection
 */
export const sortBy = <T extends readonly unknown[]>(
  iteratee: (arg: T[number]) => number,
  sortOrder: SortOrder,
  collection: T,
) => {
  // create a copy of the collection to prevent mutating the original collection
  return [...collection].sort((a, b) => {
    const valueA = iteratee(a);
    const valueB = iteratee(b);
    return sortOrder * (valueB - valueA);
  });
};
