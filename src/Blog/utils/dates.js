// src/utils/dates.js
export function formatDate(value) {
  if (!value) return '';
  // value is typically an ISO string like "2024-04-16T10:56:01.071+00:00"
  // Fallback for numeric seconds if encountered
  if (typeof value === 'number') return new Date(value * 1000).toLocaleString();
  return new Date(value).toLocaleString();
}
