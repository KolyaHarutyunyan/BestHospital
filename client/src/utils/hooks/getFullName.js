export const getFullName = (first = "", last = "", callback) => {
   if (typeof first !== "string" || typeof last !== "string") return;

   const fullName =
      !!first && !!last
         ? callback(`${first} ${last}`)
         : !!first
         ? callback(first)
         : !!last
         ? callback(last)
         : "--- ---";

   return fullName;
};
