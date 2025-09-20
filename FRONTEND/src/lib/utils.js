/**
 * Utility functions for the MediConnect application
 */

/**
 * Combines multiple class names into a single string, filtering out falsy values
 * @param {...string} classes - Class names to combine
 * @returns {string} - Combined class names
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Format a date string into a more readable format
 * @param {string} dateString - ISO date string
 * @returns {string} - Formatted date
 */
export function formatDate(dateString) {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

/**
 * Format a time string into a more readable format
 * @param {string} timeString - Time string (e.g., "14:30")
 * @returns {string} - Formatted time (e.g., "2:30 PM")
 */
export function formatTime(timeString) {
  if (!timeString) return '';
  
  // Handle ISO date strings or time-only strings
  let hours, minutes;
  
  if (timeString.includes('T')) {
    // ISO date string
    const date = new Date(timeString);
    hours = date.getHours();
    minutes = date.getMinutes();
  } else {
    // Time string (HH:MM)
    [hours, minutes] = timeString.split(':').map(Number);
  }
  
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // Convert 0 to 12
  minutes = minutes < 10 ? '0' + minutes : minutes;
  
  return `${hours}:${minutes} ${ampm}`;
}

/**
 * Truncate text to a specified length
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length
 * @returns {string} - Truncated text
 */
export function truncateText(text, length = 100) {
  if (!text) return '';
  return text.length > length ? `${text.substring(0, length)}...` : text;
}