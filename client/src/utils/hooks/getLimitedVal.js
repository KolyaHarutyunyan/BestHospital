export const getLimitedVal = (val = "", limit = 10) => {
   if (typeof val !== "string") return;
   return val.trim().length > limit ? `${val.slice(0, limit)}...` : val;
};
