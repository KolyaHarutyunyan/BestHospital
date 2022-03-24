export const isNotEmpty = (value = "") =>
   typeof value === "string" ? value.trim() !== "" : true;
