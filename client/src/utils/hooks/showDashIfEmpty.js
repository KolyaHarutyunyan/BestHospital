export const showDashIfEmpty = (value = "") =>
   value.trim().length === 0 ? "-" : value;
