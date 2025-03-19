export const formatDate = (dateString) => {
    const date = new Date(dateString);
  
    // Format the date as "DD MMM HH:MM"
    const day = date.getDate().toString().padStart(2, '0'); // Ensure 2 digits for day
    const month = date.toLocaleString('default', { month: 'short' }); // Get short month name (e.g., "Oct")
    const hours = date.getHours().toString().padStart(2, '0'); // Ensure 2 digits for hours
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Ensure 2 digits for minutes
  
    return `${day} ${month} ${hours}:${minutes}`;
  };