// This is a basic search function primarily used for name searching.
// For more advanced search functionality, we can implement debouncing to optimize performance.
export const search = (arr: { name: string }[], query: string) => {
  return arr.filter((el) => {
    return el.name.toLowerCase().includes(query.toLowerCase());
  });
};
