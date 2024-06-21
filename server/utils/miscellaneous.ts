export function getTodaysDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    let month = String(today.getMonth() + 1).padStart(2, '0');  // Pad single-digit months with leading zero
    const day = String(today.getDate()).padStart(2, '0');  // Pad single-digit days with leading zero
    const hours = today.getHours() % 12 || 12;  // Convert to 12-hour clock format
    const minutes = String(today.getMinutes()).padStart(2, '0');
    const meridian = today.getHours() >= 12 ? 'PM' : 'AM';
  
    return `${month}-${day}-${year} ${hours}:${minutes} ${meridian}`;
  }
  