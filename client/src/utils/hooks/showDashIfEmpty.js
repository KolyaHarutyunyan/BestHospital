export const showDashIfEmpty = (value = "") =>
   value.toString().trim().length === 0 ? "---" : value;
