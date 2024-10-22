// Function to format and update the date in the object
function formatDate(dateString) {
  // Create a Date object from the provided date string
  const date = new Date(dateString);

  // Get month, day, and year
  // Note: JavaScript's Date object month is 0-indexed (0 = January, 11 = December)
  const month = date.getMonth() + 1; // +1 to convert from 0-indexed to 1-indexed
  const day = date.getDate();
  const year = date.getFullYear();

  // Format the date as month-day-year
  const formattedDate = `${month}-${day}-${year}`;
  return formattedDate;
}
export default formatDate;
