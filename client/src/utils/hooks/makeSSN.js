export const makeSSN = (value) => {
   if (typeof value !== "string" || value.trim().length !== 9) return;
   return `${value.substring(0, 3)}-${value.substring(3, 5)}-${value.substring(5)}`;
};
