export type Paginated<T> = {
  items: T[];
  /**
   * The amount of pages
   */
  total: number;
  currentPage: number;
};

type Args<T> = {
  array: T[];
  /**
   * The intended page, starting from 1
   */
  pageNumber: number;
  pageSize: number;
};

export function paginate<T>({
  array,
  pageNumber,
  pageSize,
}: Args<T>): Paginated<T> {
  // Calculate the start index and end index based on the page number and page size
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Slice the array based on the calculated start and end indices
  const paginatedArray = array.slice(startIndex, endIndex);

  // Return the paginated array along with the total number of pages
  return {
    items: paginatedArray,
    total: Math.ceil(array.length / pageSize),
    currentPage: pageNumber,
  };
}
