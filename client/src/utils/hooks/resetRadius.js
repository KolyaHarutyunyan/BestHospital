export const resetRadius = (corner = "") => {
   if (typeof corner !== "string") return corner;

   switch (corner) {
      case "left":
         return {
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
         };
      case "right":
         return {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
         };

      default:
         return { borderRadius: 0 };
   }
};
