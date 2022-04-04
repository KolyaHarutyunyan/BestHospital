import { getLimitedVal } from ".";

export const getTextDependsOnWidth = (
   innerWidth,
   givenSize,
   text = "",
   limit = 5
) => {
   const forbid =
      typeof innerWidth !== "number" ||
      typeof givenSize !== "number" ||
      typeof text !== "string" ||
      typeof limit !== "number";

   if (forbid) return text;

   return innerWidth < givenSize ? getLimitedVal(text, limit) : text;
};
