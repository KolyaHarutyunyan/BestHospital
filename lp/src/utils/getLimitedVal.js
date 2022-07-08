export const getLimitedVal = (value = "", limit = 10) => {
   if (typeof value !== "string") return value;
   return value.trim().length > limit ? `${value.slice(0, limit)}...` : value;
};
