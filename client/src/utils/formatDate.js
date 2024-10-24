// Function to format and update the date in the object

function convertDateFormat(dateString) {
  // Split the date string into an array [YYYY, MM, DD]
  var parts = dateString.split('-');

  // Rearrange the parts to [MM, DD, YYYY]
  var formattedDate = parts[1] + '-' + parts[2] + '-' + parts[0];

  return formattedDate;
}
export default convertDateFormat;
