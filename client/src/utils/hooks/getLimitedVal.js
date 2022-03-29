export const getLimitedVal = (value = "", limit = 10) => {
   if (typeof value !== "string") return "";
   return value.trim().length > limit ? `${value.slice(0, limit)}...` : value;
};
